import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: fetchBaseQuery({
         baseUrl: 'https://shopping-app-2ow9.onrender.com/api/v1/cart/',
         credentials : 'include'
         }),
    endpoints: (builder) => ({
        myCartItems: builder.query({
            query : () => ({
                url : 'myCart',
                method : 'GET',
                headers : {
                    "content-type" : 'application/json'
                },
            }),
            providesTags: ["carts"]
        }),
        addToCartItems: builder.mutation({
            query : ({...product}) => ({
                url : 'addToCart',
                method : 'POST',
                headers : {
                    'content-type':'application/json'
                },
                body : JSON.stringify({
                    ...product
                })
            }),
            invalidatesTags: ["carts"]
        }),
        updateCartItems: builder.mutation({
            query : ({id,quantity}) => ({
                
                url : `updateCart/${id}`,
                method : 'PATCH',
                headers : {
                    "content-type" : 'application/json'
                },
                body : JSON.stringify({
                    quantity : quantity,
                })
            }),
            invalidatesTags: ["carts"]
        }),
        deleteCartItems: builder.mutation({
            query : (id) => ({
                url : `deleteCartItem/${id}`,
                method : 'DELETE',
                headers : {
                    "content-type" : 'application/json'
                }
            }),
            invalidatesTags: ["carts"]
        })
    }),
    
        
})

export const { useMyCartItemsQuery, useAddToCartItemsMutation, useUpdateCartItemsMutation, useDeleteCartItemsMutation } = cartApi;