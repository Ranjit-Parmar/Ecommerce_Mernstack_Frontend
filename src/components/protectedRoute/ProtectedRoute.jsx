import { Navigate, useLoaderData } from 'react-router-dom';
import { fetchCartItems } from '../../redux/reducers/cartReducer';
import { useDispatch, useSelector } from 'react-redux';
import { logInUser, logOutUser } from '../../redux/reducers/userReducer';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useMyCartItemsQuery } from '../../redux/Api/cartApi';
import Loader from '../Loader/Loader';


const ProtectedRoute = ({ children }) => { 

  const {isLoggedInUser} = useSelector((state)=>state.userReducer);
  const {data, isLoading, isError} = useMyCartItemsQuery();
  const dispatch = useDispatch();
  const userdata = useLoaderData();

  
  useEffect(()=>{
    
    if(userdata[0]?.status === 401){
        dispatch(logOutUser());
        toast.error("please login again")
        return <Navigate to="/login" replace={true}/>
    }

      dispatch(logInUser(userdata[0]))
      if(data?.cartItem){
        dispatch(fetchCartItems(data?.cartItem))
      }

  },[userdata,dispatch,children,isLoggedInUser])

  
  if(userdata[0] || isLoggedInUser){
    return children;
  }

    return <Navigate to={'/login'} replace={true}/>

}

export default ProtectedRoute;