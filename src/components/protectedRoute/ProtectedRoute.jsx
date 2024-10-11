import { Navigate } from 'react-router-dom';
import {  useDispatch, useSelector } from 'react-redux';
import { useLoadUserQuery } from '../../redux/Api/userApi';
import { useMyCartItemsQuery } from '../../redux/Api/cartApi';
import { useEffect } from 'react';
import { logInUser } from '../../redux/reducers/userReducer';
import { fetchCartItems } from '../../redux/reducers/cartReducer';
import Loader from '../Loader/Loader';


const ProtectedRoute = ({ children }) => { 

  const dispatch = useDispatch();
  const {isLoggedInUser, user} = useSelector((state)=>state.userReducer);
  const {data, isLoading, isError} = useLoadUserQuery();
  const {data : cartData, isLoading : cartIsLoading, isError : cartIsError} = useMyCartItemsQuery(); 
 

    useEffect(()=>{
      
        if(data){
            dispatch(logInUser(data?.activeUser));
            dispatch(fetchCartItems(cartData?.cartItem));
        }

    },[data, dispatch, children])
    

  if(isLoading) {
    <Loader/>;
  }
 if(data?.activeUser){
    return children;
  }
  return <Navigate to={'/login'} replace={true}/>
  


}

export default ProtectedRoute;