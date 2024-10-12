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

  const [userData, setUserData] = useState(null);

  useEffect(()=>{
    loadUserData().then((a)=>{
      setUserData(a)
    }).catch((e)=>{
      console.log(e); 
    });
  },[])

  if(userData){
    return children;
  }else{
    return <Navigate to='/login' replace={true}/>
  }

}

export default ProtectedRoute;