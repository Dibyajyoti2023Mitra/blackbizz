import logo from './logo.svg';
import './App.css';
import { CssBaseline, ThemeProvider } from "@mui/material"
import { createTheme } from '@mui/material/styles';
import { themeSettings } from 'theme';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from 'scenes/dashboard';
import Layout from 'scenes/layout';
import CategoryComp from 'scenes/category/CategoryComp';
import Login from 'scenes/auth/Login';
import PublicRoutes from 'components/PublicRoutes';
import PrivateRoutes from 'components/PrivateRoutes';
import { Toaster } from 'react-hot-toast';
import AddCategory from 'components/category/AddCategory';
import SubCategoryComp from 'scenes/subcategory/SubCategoryComp';
import AddSubCategory from 'components/subcategory/AddSubCategory';
import ProductComp from 'scenes/product/ProductComp';
import AddProduct from 'components/product/AddProduct';
import DeletedProductTable from 'components/product/DeletedProductTable';
import CouponComp from 'scenes/coupons/CouponComp';
import AddCoupon from 'components/coupon/AddCoupon';
import AddCashback from 'components/cashback/AddCashback';
import CashbackComp from 'scenes/cashback/CashBackComp';
import NewsComp from 'scenes/news/NewsComp';
import AddNews from 'components/news/AddNews';
import DeletedNews from 'components/news/DeletedNews';
import AllEventComp from 'scenes/event/AllEventComp';
import AddEvent from 'components/event/AddEvent';
import DeletedEvent from 'components/event/DeletedEvent';

function App() {
  const mode = useSelector((state) => state.global.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  return (
    <div className="app">
      <BrowserRouter>
         <Toaster />
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<PublicRoutes />}>
              <Route path="/login" element={<Login />} />
            </Route>
            <Route element={<PrivateRoutes />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/category" element={<CategoryComp />} />
              <Route path="/subcategory" element={<SubCategoryComp />} />
              <Route path="/categoryEdit/:id" element={<AddCategory />} />
              <Route path="/subcategoryEdit/:id" element={<AddSubCategory />} />
              <Route path="/product" element={<ProductComp />} />
              <Route path="/productedit/:id" element={<AddProduct />} />
              <Route path="/deletedproducts" element={<DeletedProductTable />} />
              <Route path="/coupons" element={<CouponComp />} />
              <Route path="/couponedit/:id" element={<AddCoupon />} />
              <Route path="/cashback" element={<CashbackComp />} />
              <Route path="/cashback/:id" element={<AddCashback />} />
              <Route path="/news" element={<NewsComp />} />
              <Route path="/newsEdit/:id" element={<AddNews />} />
              <Route path="/deletednews" element={<DeletedNews />} />
              <Route path="/allEvents" element={<AllEventComp />} />
              <Route path="/eventEdit/" element={<AddEvent />} />
              <Route path="/deletedevents" element={<DeletedEvent />} />
            </Route>
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
