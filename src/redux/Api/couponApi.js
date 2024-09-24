import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export const couponApi = createApi({
    reducerPath : 'couponApi',
    baseQuery : fetchBaseQuery({
        baseUrl : 'https://shopping-app-2ow9.onrender.com/api/v1/coupon/',
        credentials : 'include'
    }),
    endpoints : (builder) => ({
       createCoupon : builder.mutation({
        query : ({code,discount,expire}) => ({
            url : 'createCoupon',
            method : 'POST',
            body : {code,discount,expire}
        }),
        invalidatesTags: ["coupons"]
       }),
       getAllCoupon : builder.query({
        query : ({filter, search}) => {
            let base_query = ''
            if(filter) base_query += `isActive=${filter}`
            if(search) base_query += `&search=${search}`

            return `getCoupons/?${base_query}`;
        },
        providesTags: ["coupons"]
       }),
       getSingleCoupon : builder.query({
        query: (id) => id,
        providesTags: ["coupons"]
       }),
       updateCoupon : builder.mutation({
        query : ({id,code,discount,expire}) => ({
            url : `updateCoupon/${id}`,
            method : 'PUT',
            body : {code,discount,expire}
        }),
        invalidatesTags: ["coupons"]
       }), 
       deleteCoupon : builder.mutation({
        query : (id) => ({
            url : `deleteCoupon/${id}`,
            method : 'DELETE',
        }),
        invalidatesTags: ["coupons"]
       }), 
    })
})


export const {useCreateCouponMutation, useGetAllCouponQuery, useGetSingleCouponQuery, useUpdateCouponMutation, useDeleteCouponMutation} = couponApi;