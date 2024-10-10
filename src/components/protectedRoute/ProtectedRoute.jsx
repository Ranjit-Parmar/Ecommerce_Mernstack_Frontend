import { Navigate, useLoaderData } from 'react-router-dom';
import { fetchCartItems } from '../../redux/reducers/cartReducer';
import { useDispatch, useSelector } from 'react-redux';
import { logInUser, logOutUser } from '../../redux/reducers/userReducer';
import { useEffect } from 'react';
import { useMyCartItemsQuery } from '../../redux/Api/cartApi';


const ProtectedRoute = ({ children }) => { 

  const {isLoggedInUser} = useSelector((state)=>state.userReducer);
  const {data, isLoading, isError} = useMyCartItemsQuery();
  const dispatch = useDispatch();
  const userdata = useLoaderData();

  
  useEffect(()=>{
    
    if(userdata){
      dispatch(logInUser(userdata))
      dispatch(fetchCartItems(data?.cartItem))
    }
    dispatch(logOutUser());
    toast.error("please login again")
    return <Navigate to="/login" replace={true}/>
    

  },[userdata,dispatch,children,isLoggedInUser,data])

  if(userdata || isLoggedInUser){
    return children;
  }

    return <Navigate to={'/login'} replace={true}/>

}

export default ProtectedRoute;