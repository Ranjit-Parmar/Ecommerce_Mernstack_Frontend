import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom"
import { useLoadUserQuery } from "../../../redux/Api/userApi";
import { useEffect } from "react";
import { logInUser } from "../../../redux/reducers/userReducer";
import Loader from "../../Loader/Loader";

  
const ProtectedAdminRoute = ({children}) => {

    const dispatch = useDispatch();
    const {user} = useSelector((state)=>state.userReducer);
    const {data, isLoading, isError} = useLoadUserQuery();

    useEffect(()=>{

        
        if(data){
            dispatch(logInUser(data?.activeUser));
        }

    },[data, dispatch, children])
    
    if(isLoading) {
       <Loader/>;
    }else if(!user){
        return <Navigate to={'/login'} replace={true}/>
    }else if(user && user?.role === 'user'){
        return <Navigate to={'/'} replace={true}/>
    }else{
        return children;
    }

}

export default ProtectedAdminRoute