import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/v1/user/',
        credentials: 'include'
    }),
    tagTypes: ["users"],
    endpoints: (builder) => ({
        registerUser : builder.mutation({
            query: ({...userData}) => ({
                url : 'create-user',
                method : 'POST',
                headers : {
                    'Content-Type':'application/json'
                },
                body : JSON.stringify({...userData}),
            }),
            invalidatesTags: ["users"],
        }),
        loginUser : builder.mutation({
            query : ({...logindata}) => ({
                url : 'login',
                method : 'POST',
                headers : {
                    'Content-Type':'application/json'
                },
                body : JSON.stringify({...logindata}),
                
            }),
            invalidatesTags: ["users"],
        }),
        loadUser : builder.query({
            query : () => ({
                url : 'active-user',
                method : 'GET',
                headers : {
                    'Content-Type':'application/json'
                },
            }),
            providesTags: ["users"]
        }),
        getAllUsers : builder.query({
            query : ({search,selectUserRole}) => {
                let base_query = '';
                if(search){
                    base_query += `search=${search}`
                }
                if(selectUserRole){
                    base_query += `&role=${selectUserRole}`
                }

                return `getuser/?${base_query}`;
            },
            providesTags: ["users"]
        }),
        updateUser : builder.mutation({
            query : ({id,updateUserData}) => ({
                url : id,
                method : 'PUT',
                body : updateUserData
            }),
            invalidatesTags: ["users"]
        }),
        deleteUser : builder.mutation({
            query : (id) => ({
                url : id,
                method : 'DELETE'
            }),
            invalidatesTags: ["users"]
        }),
        forgotPassword : builder.mutation({
            query : (email) => ({
                url : 'forgotPassword',
                method : 'POST',
                body : {email:email}
            }),
            invalidatesTags: ["users"]
        }),
        resetPassword : builder.mutation({
            query : ({id,password}) => ({
                url : `forgotPassword/reset/${id}`,
                method : 'POST',
                body : {password:password}
            }),
            invalidatesTags: ["users"]
        })
    })
})




export const {useRegisterUserMutation, useLoginUserMutation, useLoadUserQuery, useGetAllUsersQuery, useUpdateUserMutation, useDeleteUserMutation, useForgotPasswordMutation, useResetPasswordMutation} = userApi;