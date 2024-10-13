import { Navigate, useLoaderData } from 'react-router-dom';
import { fetchCartItems } from '../../redux/reducers/cartReducer';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, logInUser, logOutUser } from '../../redux/reducers/userReducer';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLoadUserQuery } from '../../redux/Api/userApi';



const loadUserData = async () => {
  const userData = await loadUser();
  return userData;
}



const ProtectedRoute = ({ children }) => { 

  
  const {user, isLoading, isLoggedInUser} = useSelector((state)=>state.userReducer);

  const dispatch = useDispatch();
  const loadData = useLoaderData();
  
  
  useEffect(()=>{
    console.log('error is ',loadData);
    dispatch(logInUser(loadData));
  },[loadData, dispatch, user])
  
  if(loadData){
    return children;
  }
    return <Navigate to='/login' replace={true}/>
  

}

export default ProtectedRoute;