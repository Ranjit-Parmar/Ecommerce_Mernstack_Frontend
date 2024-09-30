import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading : true,
    user :  null,
    isLoggedInUser : false
}

export const userSlice = createSlice({
    name : "userReducer",
    initialState,
    reducers : {
        logInUser : (state, action) => {            

            if(action.payload == null){
                    state.isLoading = false;
                    state.user = null;
                    state.isLoggedInUser = false;
            }else{
                state.isLoading = false;
                state.user = action.payload;
                state.isLoggedInUser = true;
            }
            
        },

        logOutUser : (state,action) => {
            state.isLoading = false
            state.user = action?.payload || null;
            state.isLoggedInUser = false;
        }
        
    }
})


export const loadUser = async() => {
    const option = {
        url : 'https://shopping-app-2ow9.onrender.com/api/v1/user/active-user',
        method : 'GET',
        withCredentials : true
    }

   const {data} = await axios(option);
   return data?.activeUser || null;
}

export const { logInUser, logOutUser } = userSlice.actions;