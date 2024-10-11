import { Navigate } from 'react-router-dom';
import {  useDispatch, useSelector } from 'react-redux';
import { useLoadUserQuery } from '../../redux/Api/userApi';
import { useMyCartItemsQuery } from '../../redux/Api/cartApi';
import { useEffect } from 'react';
import { logInUser } from '../../redux/reducers/userReducer';
import { fetchCartItems } from '../../redux/reducers/cartReducer';


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
   return 'Loading...';
  }else if(user || isLoggedInUser){
    return children;
  }else{
    return <Navigate to={'/login'} replace={true}/>
  }


}

export default ProtectedRoute;