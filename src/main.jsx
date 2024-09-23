import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider, Route, } from 'react-router-dom';
import ShopCategory from './pages/shop_category/ShopCategory.jsx';
import LoginSignup from './pages/login_signup/LoginSignup.jsx';
import Cart from './pages/cart/Cart.jsx';
import Product from './components/product/Product.jsx';
import ProductList from './pages/product_list/ProductList.jsx';
import Home from './pages/home/Home.jsx';
import Admin from './pages/admin/Admin.jsx';
import EditProfile from './components/edit_profile/EditProfile.jsx';
import ProductDetails from './pages/admin/ProductDetails.jsx';
import AddProduct from './components/admin/add_product/AddProduct.jsx';
import MyOrder from './pages/my_order/MyOrder.jsx';
import Orders from './pages/admin/Orders.jsx';
import Users from './pages/admin/Users.jsx';
import Coupon from './pages/admin/Coupon.jsx';
import ShopContextProvider from './context/ShopContext.jsx';
import Store from './store/Store.js';
import { Provider } from 'react-redux';
import Address from './pages/address/Address.jsx';
import Payment from './pages/payment/Payment.jsx';
import OrderSuccess from './pages/orderSuccess/OrderSuccess.jsx';
import OrderCancel from './pages/orderCancel/OrderCancel.jsx';
import OrderSummery from './pages/orderSummery/OrderSummery.jsx';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute.jsx';
import ProtectedAdminRoute from './components/admin/protectedAdminRoute/ProtectedAdminRoute.jsx';
import { loadUser } from './redux/reducers/userReducer.js';

import UpdateProduct from './components/admin/update_product/UpdateProduct.jsx';
import Products from './pages/admin/Products.jsx';
import EditAdminProfile from './components/admin/edit_profile/EditAdminProfile.jsx';
import Add_Edit_Coupon from './components/admin/add_edit_coupon/Add_Edit_Coupon.jsx';
import ForgottenPassword from './pages/forgotPassword/ForgottenPassword.jsx';
import ResetPassword from './pages/resetPassword/ResetPassword.jsx';
import { getStripeKey } from './redux/reducers/cartReducer.js';

const router = createBrowserRouter([
  {
    path: "/login-signup",
    element: (
      <>
        <Toaster />
        <LoginSignup  />
      </>
    )
  },
  {
    path: "/",
    loader: async () => {
      try{        
      return  await loadUser()
      }catch(err){ 
        return err;
      }
    },
    element: <>
      <Toaster />
      <ProtectedRoute>
      <App />
      </ProtectedRoute>
    </>,
    errorElement: <h2>Page not found</h2>,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/shopcategory/:gender",
        element: <ShopCategory />
      },
      {
        path: "/productlist",
        element: <ProductList title="MENS CLOTHING" />
      },
      {
        path: "/productdetail/:id",
        element: <Product />
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "checkout/address",
        element: <Address />
      },
      {
        path: "checkout/address/order-summery",
        element: <OrderSummery />
      },
      {
        path: "/edit-profile",
        element: <EditProfile />
      },
      {
        path: "/my-order",
        element:<MyOrder />
      },

    ]
  },
  {
    path: "/admin",
    loader: async () => {
      try{
      return  await loadUser()
      }catch(err){
        return err;
      }
    },
    element: <>
    <Toaster/>
    <ProtectedAdminRoute>
      <Admin />
    </ProtectedAdminRoute>
    </>,
    children: [
      {
        path: "",
        element: <Products/>
      },
      {
        path: "product-details/:id",
        element: <ProductDetails />
      },
      {
        path: "add-products",
        element: <AddProduct />
      },
      {
        path: "create-coupon",
        element: <Add_Edit_Coupon/>
      },
      {
        path: "update-product/:id",
        element: <UpdateProduct />
      },
      {
        path: "update-coupon/:id",
        element: <Add_Edit_Coupon/>
      },
      {
        path: "edit-profile",
        element: <EditProfile />
      },
      {
        path: "edit-admin-profile/:id",
        element: <EditAdminProfile/>
      },
      {
        path: "orders",
        element: <Orders />
      },
      {
        path: "coupons",
        element: <Coupon />
      },
      {
        path: "users",
        element: <Users />
      },
    ]
  },
  {
    path: 'forgotPassword',
    element: <>
    <Toaster/>
    <ForgottenPassword />
    </>
  },
  {
    path: 'forgotPassword/reset/:id',
    element: <>
    <Toaster/>
    <ResetPassword />
    </>
  },
  {
    path: 'payment',
    loader: async () => {
      try{
      return  await getStripeKey()
      }catch(err){
        return err;
      }
    },
    element: <Payment />
  },
  {
    path: 'payment_success',
    element:<OrderSuccess />
  },
  {
    path: 'payment_fail',
    element:<OrderCancel />
  },
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <ShopContextProvider>
      <RouterProvider router={router} />
    </ShopContextProvider>
  </Provider>
)
