import { Navigate, useLoaderData } from 'react-router-dom';
import { fetchCartItems } from '../../redux/reducers/cartReducer';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, logInUser, logOutUser } from '../../redux/reducers/userReducer';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useLoadUserQuery } from '../../redux/Api/userApi';

const loadUserData = async () => {
  const userData = await loadUser();
  return userData;
}

const ProtectedRoute = ({ children }) => { 


  useEffect(()=>{
    console.log(loadUserData);
    
  },[children,loadUserData])
}

export default ProtectedRoute;