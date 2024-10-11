import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom"

  
const ProtectedAdminRoute = ({children}) => {

    const {user} = useSelector((state)=>state.userReducer);
    
    if(!user){
        
        return <Navigate to={'/login'} replace={true}/>
    }
    if(user && user?.role === 'user'){
        return <Navigate to={'/'} replace={true}/>
    }
    return children;

}

export default ProtectedAdminRoute