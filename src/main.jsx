import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// USER ROUTES
const LoginSignup = lazy(()=> import('./pages/login_signup/LoginSignup.jsx'))
const Home = lazy (()=> import('./pages/home/Home.jsx'))
const ShopCategory = lazy(()=> import('./pages/shop_category/ShopCategory.jsx'))
const Product = lazy (()=> import('./components/product/Product.jsx'))
const ProductList = lazy (()=> import('./pages/product_list/ProductList.jsx'))
const Cart = lazy (()=> import('./pages/cart/Cart.jsx'))
const MyOrder = lazy (()=> import('./pages/my_order/MyOrder.jsx'))
const EditProfile = lazy (()=> import('./components/edit_profile/EditProfile.jsx'))
const Address = lazy (()=> import('./pages/address/Address.jsx'))
const OrderSummery = lazy (()=> import('./pages/orderSummery/OrderSummery.jsx'))
const Payment = lazy (()=> import('./pages/payment/Payment.jsx'))
const OrderSuccess = lazy (()=> import('./pages/orderSuccess/OrderSuccess.jsx'))
const OrderCancel = lazy (()=> import('./pages/orderCancel/OrderCancel.jsx'))
const ProtectedRoute = lazy (()=> import('./components/protectedRoute/ProtectedRoute.jsx'))
const ForgottenPassword = lazy (()=> import('./pages/forgotPassword/ForgottenPassword.jsx'))
const PageNotFound = lazy (()=> import('./pages/pageNotFound/PageNotFound.jsx'))
const ResetPassword = lazy (()=> import('./pages/resetPassword/ResetPassword.jsx'))

// ADMIN ROUTES
const Admin = lazy (()=> import('./pages/admin/Admin.jsx'))
const Products = lazy (()=> import('./pages/admin/Products.jsx'))
const Users = lazy (()=> import('./pages/admin/Users.jsx'))
const Orders = lazy (()=> import('./pages/admin/Orders.jsx'))
const Coupon = lazy (()=> import('./pages/admin/Coupon.jsx'))
const ProductDetails = lazy (()=> import('./pages/admin/ProductDetails.jsx'))
const AddProduct = lazy (()=> import('./components/admin/add_product/AddProduct.jsx'))
const UpdateProduct = lazy (()=> import('./components/admin/update_product/UpdateProduct.jsx'))
const EditAdminProfile = lazy (()=> import('./components/admin/edit_profile/EditAdminProfile.jsx'))
const Add_Edit_Coupon = lazy (()=> import('./components/admin/add_edit_coupon/Add_Edit_Coupon.jsx'))
const ProtectedAdminRoute = lazy (()=> import('./components/admin/protectedAdminRoute/ProtectedAdminRoute.jsx'))

import Store from './store/Store.js';
import ShopContextProvider from './context/ShopContext.jsx'
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { loadUser } from './redux/reducers/userReducer.js';
import { fetchItems, getStripeKey } from './redux/reducers/cartReducer.js';
import {BeatLoader} from "react-spinners/";


 
const router = createBrowserRouter([
  {
    path: "/",
     loader: async () => {
      try{
      let userData = await loadUser()
      if(userData){
        let cartData = await fetchItems()
        return [userData, cartData] || null
      }
      }catch(err){
        return err;
      }
      
    },
    element: <>
        <Toaster />
        <ProtectedRoute>
          <Suspense fallback={<BeatLoader color={'#fa7e0a'} style={{margin:'auto'}}/>}>
            <App /> 
          </Suspense>
        </ProtectedRoute>
           </>,
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
        element: <ProductList />
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
        element: <MyOrder />
      },
      {
        path: '/payment',
        loader: async () => {
          try {
            return await getStripeKey()
          } catch (err) {
            return err;
          }
        },
        element: <Payment />
      },
      {
        path: '/payment_success',
        element: <OrderSuccess />
      },
      {
        path: '/payment_fail',
        element: <OrderCancel />
      },
      {
        path: '*',
        element: <PageNotFound />
      }
      

    ]
  },
  {
    path : "/login",
    element: (
      <>
        <Suspense fallback={<BeatLoader color={'#fa7e0a'} style={{margin:'auto'}}/>}>
        <LoginSignup />
        </Suspense>
      </>
    )
  },
  {
    path: "/admin",
    loader: async () => {
      try {
        return await loadUser()
      } catch (err) {
        return err;
      }
    },
    element: <>
      <Toaster />
      <ProtectedAdminRoute>
        <Suspense fallback={<BeatLoader color={'#fa7e0a'} style={{margin:'auto'}}/>}>
        <Admin />
        </Suspense>
      </ProtectedAdminRoute>
    </>,
    children: [
      {
        path: "",
        element: <Products />
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
        element: <Add_Edit_Coupon />
      },
      {
        path: "update-product/:id",
        element: <UpdateProduct />
      },
      {
        path: "update-coupon/:id",
        element: <Add_Edit_Coupon />
      },
      {
        path: "edit-profile",
        element: <EditProfile />
      },
      {
        path: "edit-admin-profile/:id",
        element: <EditAdminProfile />
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
      <Toaster />
      <ForgottenPassword />
    </>
  },
  {
    path: 'forgotPassword/reset/:id',
    element: <>
      <Toaster />
      <ResetPassword />
    </>
  },
  
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <ShopContextProvider>
      <RouterProvider router={router} />
    </ShopContextProvider>
  </Provider>
)
