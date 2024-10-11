import { Navigate, useLoaderData } from 'react-router-dom';
import { fetchCartItems } from '../../redux/reducers/cartReducer';
import { useDispatch, useSelector } from 'react-redux';
import { logInUser, logOutUser } from '../../redux/reducers/userReducer';
import { useEffect, useState } from 'react';
import { useMyCartItemsQuery } from '../../redux/Api/cartApi';


const ProtectedRoute = ({ children }) => { 

  const {data, isLoading, isError} = useMyCartItemsQuery();
  const [cartData, setCartData] = useState([]);
  const {isLoggedInUser} = useSelector((state)=>state.userReducer);
  const dispatch = useDispatch();
  const userdata = useLoaderData();

  
  useEffect(()=>{
    
    if(userdata?.status === 401){
        dispatch(logOutUser());
        toast.error("please login again")
        return <Navigate to="/login" replace={true}/>
    }
    
      dispatch(logInUser(userdata))
      dispatch(fetchCartItems(cartData))
    

  },[userdata,dispatch,children,isLoggedInUser])


  useEffect(()=>{
    if(data?.cartItem){
      setCartData(data?.cartItem)
    }
  },[userdata])

  if(userdata || isLoggedInUser){
    return children;
  }

    return <Navigate to={'/login'} replace={true}/>

}

export default ProtectedRoute;