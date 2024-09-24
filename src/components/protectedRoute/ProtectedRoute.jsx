import { useDispatch} from 'react-redux'
import { useLoaderData, Navigate } from 'react-router-dom';
import { fetchCartItems, fetchItems } from '../../redux/reducers/cartReducer';
import store from '../../store/Store.js';
import { useEffect } from 'react';
import { logInUser } from '../../redux/reducers/userReducer.js';
import toast from 'react-hot-toast';


export const loadCartfunc = async () => {
  const cartData = await fetchItems();
  store.dispatch(fetchCartItems(cartData))
 } 

const ProtectedRoute = ({ children }) => {
  
  const data = useLoaderData();  

  const dispatch = useDispatch();
  
  useEffect(()=>{
    
    if(data){

      dispatch(logInUser(data));

      loadCartfunc().catch((e)=>{
        if(e.response.status === 401){
           <Navigate to={'/login-signup'} replace={true}/>
          };
        });  
        
      }else{
        
        <Navigate to={'/login-signup'} replace={true}/>
        toast.error('Token Has Expired! Please Login Again.');
        dispatch(logInUser(null))

    }
    
    },[dispatch,data])
        
   
    if(data?.response?.status === 500 || data?.response?.status === 401){
      return <Navigate to={'/login-signup'} replace={true}/>
    }else{
      return children;
    }

}

export default ProtectedRoute;