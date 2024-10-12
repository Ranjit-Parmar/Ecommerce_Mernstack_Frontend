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
loadUserData().then((a)=>{
  console.log(a);
}).catch((e)=>{
  console.log(e);
  
});



const ProtectedRoute = ({ children }) => { 


 
}

export default ProtectedRoute;