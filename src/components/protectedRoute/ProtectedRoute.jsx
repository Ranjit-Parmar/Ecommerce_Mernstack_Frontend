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
  const [userData, setUserData] = useState(null);
  const loadUserData = useLoaderData();

  useEffect(()=>{
    loadUserData().then((a)=>{
      
      dispatch(logInUser(userData))
      setUserData(a)
    }).catch((e)=>{
      setUserData(null)
    });
  },[user, dispatch, userData])
  console.log(userData);
  

  if(loadUserData && userData){
    return children;
  }
    return <Navigate to='/login' replace={true}/>
  

}

export default ProtectedRoute;