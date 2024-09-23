import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading : false,
    user :  null,
    isLoggedInUser : false
}

export const userSlice = createSlice({
    name : "userReducer",
    initialState,
    reducers : {
        logInUser : (state, action) => {

            if(action.payload == null){
                    state.isLoading = true;
                    state.user = null;
                    state.isLoggedInUser = false;
                    state.isLoading = false;
            }else{
                state.isLoading = true;
                state.user = action.payload;
                state.isLoggedInUser = true;
                state.isLoading = false;
            }
            
        },

        logOutUser : (state,action) => {
            state.isLoading = true;
            state.user = action?.payload || null;
            state.isLoggedInUser = false;
            state.isLoading = false
        }
        
    }
})


export const loadUser = async() => {
    const option = {
        url : 'http://localhost:5000/api/v1/user/active-user',
        method : 'GET',
        withCredentials : true
    }

   const {data} = await axios(option);
   return data?.activeUser;
}

export const { logInUser, logOutUser } = userSlice.actions;