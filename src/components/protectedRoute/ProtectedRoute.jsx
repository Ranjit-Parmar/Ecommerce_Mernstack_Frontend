import { Navigate } from 'react-router-dom';
import { fetchCartItems, fetchItems } from '../../redux/reducers/cartReducer';
import store from '../../store/Store.js';
import { useSelector } from 'react-redux';


export const loadCartfunc = async () => {
  const cartData = await fetchItems();
  store.dispatch(fetchCartItems(cartData))
 } 

const ProtectedRoute = ({ children }) => { 

  const {user} = useSelector((state)=>state.userReducer);

  if (!user) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }
  return children;
  
  
}

export default ProtectedRoute;