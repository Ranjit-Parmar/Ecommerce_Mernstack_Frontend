import { Navigate, useLoaderData } from 'react-router-dom';
import { fetchCartItems } from '../../redux/reducers/cartReducer';
import { useDispatch, useSelector } from 'react-redux';
import { logInUser, logOutUser } from '../../redux/reducers/userReducer';
import { useEffect, useState } from 'react';
import { useMyCartItemsQuery } from '../../redux/Api/cartApi';
import toast from "react-hot-toast";


const ProtectedRoute = ({ children }) => { 

  const {data, isLoading, isError} = useMyCartItemsQuery();
  const [cartData, setCartData] = useState(data?.cartItem?data.cartItem:[]);
  const {isLoggedInUser} = useSelector((state)=>state.userReducer);
  const dispatch = useDispatch();
  const userdata = useLoaderData();

  
  useEffect(()=>{
    
    if(userdata){
      dispatch(logInUser(userdata))
      dispatch(fetchCartItems(cartData))
    }
    dispatch(logOutUser());
    toast.error("please login again")
    return <Navigate to="/login" replace={true}/>
    
    

  },[userdata,dispatch,children,isLoggedInUser])



  if(userdata || isLoggedInUser){
    return children;
  }

    return <Navigate to={'/login'} replace={true}/>

}

export default ProtectedRoute;