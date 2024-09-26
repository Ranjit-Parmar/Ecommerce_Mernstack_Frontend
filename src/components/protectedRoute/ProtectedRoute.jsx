import { Navigate, useLoaderData } from 'react-router-dom';
import { fetchCartItems } from '../../redux/reducers/cartReducer';
import { useSelector } from 'react-redux';
import { logOutUser } from '../../redux/reducers/userReducer';
import { useEffect } from 'react';



const ProtectedRoute = ({ children }) => { 

  const {user, isLoggedInUser} = useSelector((state)=>state.userReducer);
  const dispatch = useDispatch();
  const data = useLoaderData();
  
  useEffect(()=>{
    
    if(data.status === 401){
      <Navigate to="/login-signup" replace={true}/>
      dispatch(logOutUser());
      toast.error("please login again")
    }else{
      dispatch(logInUser(data[0]))
      dispatch(fetchCartItems(data[1]))
    }

  },[user,dispatch,data])

  if(isLoggedInUser){
    return children;

  }else{
    return <Navigate to={'/login-signup'} replace={true}/>
  }
    

}

export default ProtectedRoute;