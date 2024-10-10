import { Navigate, useLoaderData } from 'react-router-dom';
import { fetchCartItems } from '../../redux/reducers/cartReducer';
import { useDispatch, useSelector } from 'react-redux';
import { logInUser, logOutUser } from '../../redux/reducers/userReducer';
import { useEffect } from 'react';
import { useMyCartItemsQuery } from '../../redux/Api/cartApi';
import toast from "react-hot-toast";
import { useLoadUserQuery } from '../../redux/Api/userApi';


const ProtectedRoute = ({ children }) => { 

  const {isLoggedInUser} = useSelector((state)=>state.userReducer);
  const {data, isLoading, isError} = useMyCartItemsQuery();
  const {data : loadUserData, isLoading : loadUserIsLoading, isError : loadUserIsError} = useLoadUserQuery();
  const dispatch = useDispatch();
  // const userdata = useLoaderData();

  
  useEffect(()=>{
    
    if(loadUserData?.activeUser){
      dispatch(logInUser(loadUserData?.activeUser))
      dispatch(fetchCartItems(data?.cartItem))
    }
    dispatch(logOutUser());
    toast.error("please login again")
    return <Navigate to="/login" replace={true}/>
    

  },[loadUserData, data, loadUserIsLoading, dispatch, children])

  if(loadUserData?.activeUser || isLoggedInUser){
    return children;
  }else{
     <Navigate to={'/login'} replace={true}/>
  }


}

export default ProtectedRoute;