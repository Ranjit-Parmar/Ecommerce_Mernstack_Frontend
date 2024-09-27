import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLoaderData } from "react-router-dom"
import { logInUser, logOutUser } from "../../../redux/reducers/userReducer";
import { useEffect } from "react";
import toast from "react-hot-toast";


  
const ProtectedAdminRoute = ({children}) => {

    const {user, isLoggedInUser} = useSelector((state)=>state.userReducer);
    const dispatch = useDispatch();
    const data = useLoaderData();
    
    useEffect(()=>{
    
        if(data.status === 401){

            dispatch(logOutUser());
            toast.error("please login again")
            return <Navigate to="/login" replace={true}/>

        }
          dispatch(logInUser(data))
    
      },[data])
    
    if(!isLoggedInUser){
        
        return <Navigate to={'/login-signup'} replace={true}/>
    }
    if(user && user?.role === 'user'){
        return <Navigate to={'/'} replace={true}/>
    }
    return children;

}

export default ProtectedAdminRoute