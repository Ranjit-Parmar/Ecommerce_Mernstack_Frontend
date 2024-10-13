import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLoaderData } from "react-router-dom"
import { loadUser, logInUser, logOutUser } from "../../../redux/reducers/userReducer";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


const loadUserData = async () => {
    const userData = await loadUser();
    return userData;
  }
  
  
const ProtectedAdminRoute = ({children}) => {

    const {user} = useSelector((state)=>state.userReducer);
    const loadData  = useLoaderData();
    const dispatch = useDispatch();

    useEffect(()=>{

        dispatch(logInUser(loadData));

      },[loadData, dispatch, user])
  

  if(loadData?.status === 401){
        dispatch(logOutUser());
        return <Navigate to="/login" replace={true}/>
    }
  if(loadData && loadData.role === 'user'){
    return <Navigate to='/' replace={true}/>
  }
  if(loadData && loadData.role === 'admin'){
    return children;
}
    return <Navigate to='/login' replace={true}/>
  


   

}

export default ProtectedAdminRoute