import { useDispatch } from "react-redux";
import { Navigate, useLoaderData } from "react-router-dom"
import { logInUser } from "../../../redux/reducers/userReducer";
import { useEffect } from "react";
import toast from "react-hot-toast";


  
const ProtectedAdminRoute = ({children}) => {

    const dispatch = useDispatch();
    const data = useLoaderData();
    
    useEffect(()=>{

        if(data){
            dispatch(logInUser(data));
        }else{
            toast.error('Token Has Expired! Please Login Again.');
            <Navigate to={'/login-signup'} replace={true}/>
            dispatch(logInUser(null))
        }

    },[data,dispatch,children])
    
    
    if(data?.response?.status === 500 || data?.response?.status === 401){
        
        return <Navigate to={'/login-signup'} replace={true}/>
    }
    if(data?.role === 'user'){
        return <Navigate to={'/'} replace={true}/>
    }
    return children;

}

export default ProtectedAdminRoute