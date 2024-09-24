import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shopping-app-2ow9.onrender.com/api/v1/order/',
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        createOrder : builder.mutation({
            query: (orderData) => ({
                url : 'newOrder',
                method : 'POST',
                headers : {
                    'Content-Type':'application/json'
                },
                body : orderData,
            }),
            invalidatesTags: ["orders"]
        }),
        myOrders: builder.query({
            query: (id) => `myOrders/${id}`,
            providesTags: ["orders"]
          }),
        getAllOrders : builder.query({
            query : ({orderStatus,duration,search}) => {
                let base_query = '';
                if(orderStatus) base_query += `orderStatus=${orderStatus}`
                if(duration) base_query += `&duration=${duration}`
                if(search) base_query += `&search=${search}`

                return `allOrders/?${base_query}`
            },
            providesTags: ["orders"]
        }),
        updateOrder : builder.mutation({
            query : ({orderStatus, id}) => ({
                url : id,
                method : 'PUT',
                body : {orderStatus}
            }),
            invalidatesTags: ["orders"]
        }),
        deleteOrder : builder.mutation({
            query : (id) => ({
                url : id,
                method : 'DELETE',
            }),
            invalidatesTags: ["orders"]
        })
        
    })
})




export const {useCreateOrderMutation, useUpdateOrderMutation, useMyOrdersQuery, useGetAllOrdersQuery, useDeleteOrderMutation} = orderApi;