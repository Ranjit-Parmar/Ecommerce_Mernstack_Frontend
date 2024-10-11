import { Navigate } from 'react-router-dom';
import {  useDispatch, useSelector } from 'react-redux';
import { useLoadUserQuery } from '../../redux/Api/userApi';
import { useMyCartItemsQuery } from '../../redux/Api/cartApi';
import { useEffect } from 'react';
import { logInUser } from '../../redux/reducers/userReducer';
import { fetchCartItems } from '../../redux/reducers/cartReducer';
import Loader from '../Loader/Loader';


const ProtectedRoute = ({ children }) => { 

  const {user, isLoggedInUser, isLoading} = useSelector((state)=>state.userReducer);
  const {data} = useLoadUserQuery();
  const dispatch = useDispatch();

  useEffect(()=>{
    if(data){
      dispatch(logInUser(data?.activeUser));
    }
  },[data,user,isLoading, isLoggedInUser, children])

  if(isLoading){
    return <Loader/>
  }
  if(user && isLoggedInUser){
    return children
  }
  return <Navigate to='/login' replace={true}/>

}

export default ProtectedRoute;