import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';




const initialState = {
    isLoading: false,
    cartItems: [],
    shippingInfo: localStorage.getItem('address')?JSON.parse(localStorage.getItem('address')) : {},
    shippingCharge: 0,
    subtotal: 0,
    discount: 0,
    tax: 0,
    total: 0,
};




export const cartSlice = createSlice({
    name: "cartReducer",
    initialState,
    reducers: {

        addToCart: (state, action) => {

            state.cartItems.push(action.payload);

        },


        fetchCartItems: (state, action) => {

            if(action.payload.length){

                state.isLoading = true,
                state.cartItems = action.payload;
                state.isLoading = false
            }else{
                state.isLoading = true,
                state.cartItems = [],
                state.isLoading = false
            }
            
        },





        removeCartItem: (state, action) => {
            state.cartItems = state.cartItems.filter((val) => !(val._id === action.payload._id && val.selectSize === action.payload.selectSize))
        },

        calculatePrice: (state, action) => {
           
          const subtotal = state.cartItems.reduce(
                (total, item) => total + (Math.ceil((item.product.price - (item.product.price * 15) / 100)) * item.quantity),
                0
            );

            state.subtotal = subtotal
            state.shippingCharge = state.cartItems.length? (state.subtotal >= 1000 ? 0 : 40) : 0;
            state.tax = Math.ceil(subtotal * 0.18)

            
            if (action.payload) {
               
                state.discount = action.payload
                state.total = (state.subtotal - state.discount) + state.shippingCharge + state.tax

            } else {
               
                state.discount = 0
                state.total = state.subtotal + state.shippingCharge + state.tax
            }
           
        },

        shippingInfo: (state, action) => {
            state.shippingInfo = action.payload
        },

        resetCart : () => {
           return initialState;
        }

    }
})


export const fetchItems = async() => {
    const option = {
        url : 'http://localhost:5000/api/v1/cart/myCart',
        method : 'GET',
        withCredentials : true
    }

   const {data} = await axios(option);
   return data.cartItem;
   
}

export const getStripeKey = async () => {
    const option = {
        url : 'http://localhost:5000/api/v1/payment/get_stripe_api_key',
        method : 'GET',
        withCredentials : true
    }

    const {data} = await axios(option);
    return data?.stripeApiKey || ''
}


export const { addToCart, fetchCartItems, calculatePrice, removeCartItem, shippingInfo, resetCart } = cartSlice.actions;
