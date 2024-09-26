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

          <Navigate to="/login-signup" replace={true}/>

          dispatch(logOutUser());

        }else{
          dispatch(logInUser(data))
        }
    
      },[user,dispatch,data])
    
    if(!isLoggedInUser){
        
        return <Navigate to={'/login-signup'} replace={true}/>
    }
    if(isLoggedInUser && user?.role === 'user'){
        return <Navigate to={'/'} replace={true}/>
    }
    return children;

}

export default ProtectedAdminRoute