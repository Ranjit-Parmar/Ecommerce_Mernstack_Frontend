import { Navigate } from 'react-router-dom';
import {  useSelector } from 'react-redux';


const ProtectedRoute = ({ children }) => { 

  const {isLoggedInUser, user} = useSelector((state)=>state.userReducer);

  if(user || isLoggedInUser){
    return children;
  }

    return <Navigate to={'/login'} replace={true}/>

}

export default ProtectedRoute;