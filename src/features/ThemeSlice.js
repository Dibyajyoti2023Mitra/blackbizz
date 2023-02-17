import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCat, fetchsubcat, fetchSubCatByCategory,getNewsCategory,getProducts } from "apicalls";
import HttpClient from "utils/HttpClient";

const initialState = {
    mode: "dark",
    userId: "63701cc1f03239b7f700000e",
    userData: null,
    categories:{loading:false,cat:[]},
    subCategories: {loadingsubcat:false,subcat:[]},
    products:{loading:false,data:[]},
    newscategory:{loading:false,data:[]}
}
export const fetchUser = createAsyncThunk(
    "admin/fetchuser",
    async () => {
        const res = await HttpClient.requestData("", "GET", {});
        return res;
    }
);



export const fetchCategories = createAsyncThunk(
    "admin/fetchcategory",
    async () => {
        const res = await fetchCat();
        return res;
    }
)

export const fetchSubCategories = createAsyncThunk(
    "admin/fetchsubcategory",
    async (catid) => {
        const res = await fetchSubCatByCategory(catid);
        return res;
    }
)


export const fetchProducts = createAsyncThunk(
    "admin/fetchproducts",
    async () => {
        const res = await getProducts();
        return res;
    }
)

export const fetchNewsCategories = createAsyncThunk(
    "admin/fetchnewscat",
    async () =>{
        const res = await getNewsCategory();
        return res
    }
)

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "dark" ? "light" : "dark"
        },
        removeUser: (state) => {
            state.userData = null
        }
    },
    extraReducers: {
        [fetchUser.fulfilled]: (state, action) => {
            state.userData = action.payload.data
        },
        [fetchCategories.pending]: (state, action) => {
            state.categories.loading = true
        },
        [fetchCategories.fulfilled]: (state, action) => {
            state.categories.loading = false
            state.categories.cat = action.payload.data
        },
        [fetchSubCategories.pending]: (state, action) => {
            state.subCategories.loading = true
        },
        [fetchSubCategories.fulfilled]: (state, action) => {
            state.subCategories.loading = false
            state.subCategories.subcat = action.payload.data
        },
        [fetchProducts.pending]: (state, action) => {
            state.products.loading = true
        },
        [fetchProducts.fulfilled]: (state, action) => {
            state.products.loading = false
            state.products.data = action.payload.data
        },
        [fetchNewsCategories.pending]: (state, action) => {
            state.newscategory.loading = true
        },
        [fetchNewsCategories.fulfilled]: (state, action) => {
            state.newscategory.loading = false
            state.newscategory.data = action.payload.data
        }
    }

})


export const { setMode, removeUser } = globalSlice.actions;

export default globalSlice.reducer;