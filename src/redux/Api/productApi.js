import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/v1/product/',
        credentials: 'include'
    }),
    tagTypes: ["product"],
    endpoints: (builder) => ({
        createProduct: builder.mutation({
            query: (productData) => ({
                url: 'create-product',
                method: 'POST',
                body: productData
            }),
            invalidatesTags: ["product"]
        }),
        getAllProducts: builder.query({
            query: ({ selectCategoryArray, selectGenderArray, price, search, sort, page, limit }) => {

                let base_query = '';

                if (selectCategoryArray && selectCategoryArray.length > 0) base_query += `category=${selectCategoryArray},`

                if (selectGenderArray && selectGenderArray.length > 0) base_query += `&gender=${selectGenderArray}`

                if (price) base_query += `&${price}`

                if (search) base_query += `&search=${search}`;

                if (sort) base_query += `&sort=${sort}`;

                if (page) base_query += `&page=${page}`;
                
                if (page) base_query += `&limit=${limit}`;

                return `get-all-products/?${base_query}`

            },
            providesTags: ["product"],
        }),
        getProductDetails: builder.query({
            query: (id) => id,
            providesTags: ["product"],
        }),
        getProductCategory: builder.query({
            query: (gender) => `get-category-products/${gender}`,
            providesTags: ["product"],
        }),
        getAllCategories: builder.query({
            query: () => 'get-all-categories',
            providesTags: ["product"],
        }),
        updateProduct: builder.mutation({
            query: ({id,updatedProductData}) => ({
                url : id,
                method : 'PUT',
                body : updatedProductData
            }),
            invalidatesTags: ["product"]
        }),
        deleteProduct : builder.mutation({
            query : (id) => ({
                url : id,
                method : 'DELETE',
            }),
            invalidatesTags : ["product"]
        })

    }),


})

export const { useGetAllProductsQuery, useGetProductDetailsQuery, useGetProductCategoryQuery, useGetAllCategoriesQuery, useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation } = productApi;