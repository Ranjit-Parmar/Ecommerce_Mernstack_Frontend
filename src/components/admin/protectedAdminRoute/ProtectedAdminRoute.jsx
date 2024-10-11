import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom"
import { useLoadUserQuery } from "../../../redux/Api/userApi";
import { useEffect } from "react";
import { logInUser } from "../../../redux/reducers/userReducer";
import Loader from "../../Loader/Loader";

  
const ProtectedAdminRoute = ({children}) => {

    const dispatch = useDispatch();
    const {user, isLoading} = useSelector((state)=>state.userReducer);

    
    
    if(isLoading) {
       <Loader/>;
    }
    if(user && user.role === 'user'){
        return <Navigate to={'/'} replace={true}/>
    }
    if(!user){
        return <Navigate to={'/login'} replace={true}/>
    }
        return children;


}

export default ProtectedAdminRoute