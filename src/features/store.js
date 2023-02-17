import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./ThemeSlice"
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./api";
const store = configureStore({
    reducer: {
        global: globalReducer,
        [api.reducerPath]: api.reducer
    },
    middleware: (getDefault) => getDefault().concat(api.middleware)
})

setupListeners(store.dispatch)

export default store