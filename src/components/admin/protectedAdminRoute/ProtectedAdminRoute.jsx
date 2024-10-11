import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom"
import { useLoadUserQuery } from "../../../redux/Api/userApi";

  
const ProtectedAdminRoute = ({children}) => {

    const {user} = useSelector((state)=>state.userReducer);
    const {data, isLoading, isError} = useLoadUserQuery();

    useEffect(()=>{

        if(data){
            dispatch(logInUser(data?.activeUser));
        }

    },[data, dispatch])
    
    if(!user){
        
        return <Navigate to={'/login'} replace={true}/>
    }
    if(user && user?.role === 'user'){
        return <Navigate to={'/'} replace={true}/>
    }
    return children;

}

export default ProtectedAdminRoute