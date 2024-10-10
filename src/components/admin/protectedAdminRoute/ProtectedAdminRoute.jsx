import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLoaderData } from "react-router-dom"
import { logInUser, logOutUser } from "../../../redux/reducers/userReducer";
import { useEffect } from "react";
import toast from "react-hot-toast";


  
const ProtectedAdminRoute = ({children}) => {

    const {user, isLoggedInUser} = useSelector((state)=>state.userReducer);
    const {data, isLoading, isError} = useLoadUserQuery();
    const dispatch = useDispatch();
    
    useEffect(()=>{
    
        if(data?.activeUser){    
            dispatch(logInUser(data?.activeUser))
        }
        dispatch(logOutUser());
        toast.error("please login again")
        return <Navigate to="/login" replace={true}/>
    
      },[data?.activeUser])
    
    if(!data?.activeUser){
        
        return <Navigate to={'/login'} replace={true}/>
    }
    if(data?.activeUser && data?.activeUser?.role === 'user'){
        return <Navigate to={'/'} replace={true}/>
    }
    return children;

}

export default ProtectedAdminRoute