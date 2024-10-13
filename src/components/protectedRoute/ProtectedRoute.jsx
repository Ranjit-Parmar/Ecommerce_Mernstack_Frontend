import { Navigate, useLoaderData } from 'react-router-dom';
import { fetchCartItems, fetchItems } from '../../redux/reducers/cartReducer';
import { useDispatch, useSelector } from 'react-redux';
import { logInUser, logOutUser } from '../../redux/reducers/userReducer';
import { useEffect } from 'react';


const loadCartItems = async () => {
  const loadCart = await fetchItems();
  return loadCart;
}

const ProtectedRoute = ({ children }) => { 

  const {isLoggedInUser} = useSelector((state)=>state.userReducer);
  const dispatch = useDispatch();
  const userdata = useLoaderData();

  
  useEffect(()=>{
    console.log('protected route called');
    
    
    if(userdata[0]?.status === 401){
        dispatch(logOutUser());
        toast.error("please login again")
        return <Navigate to="/login" replace={true}/>
    }
      dispatch(logInUser(userdata[0]))
      dispatch(fetchCartItems(userdata[1]))

  },[userdata,dispatch,children,isLoggedInUser])

  if(userdata[0] || isLoggedInUser){
    return children;
  }

    return <Navigate to={'/login'} replace={true}/>

}

export default ProtectedRoute;