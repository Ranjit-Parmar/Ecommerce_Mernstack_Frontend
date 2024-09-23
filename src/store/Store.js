import { configureStore } from '@reduxjs/toolkit';
import { productApi } from '../redux/Api/productApi.js';
import { userApi } from '../redux/Api/userApi.js';
import { cartApi } from '../redux/Api/cartApi.js';
import { orderApi } from '../redux/Api/orderApi.js';
import { cartSlice } from '../redux/reducers/cartReducer.js';
import { userSlice } from '../redux/reducers/userReducer.js';
import { couponApi } from '../redux/Api/couponApi.js';



export default configureStore({
    reducer : {
        [productApi.reducerPath] : productApi.reducer,
        [userApi.reducerPath] : userApi.reducer,
        [cartApi.reducerPath] : cartApi.reducer,
        [orderApi.reducerPath] : orderApi.reducer,
        [couponApi.reducerPath] : couponApi.reducer,
        [cartSlice.name] : cartSlice.reducer,
        [userSlice.name] : userSlice.reducer,

    },
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware().concat(productApi.middleware,userApi.middleware,cartApi.middleware,orderApi.middleware,couponApi.middleware),
})