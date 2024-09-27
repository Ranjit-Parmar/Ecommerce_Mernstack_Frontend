import { Navigate, useLoaderData } from 'react-router-dom';
import { fetchCartItems, fetchItems } from '../../redux/reducers/cartReducer';
import { useDispatch, useSelector } from 'react-redux';
import { logInUser, logOutUser } from '../../redux/reducers/userReducer';
import { useEffect } from 'react';
import { useMyCartItemsQuery } from '../../redux/Api/cartApi';


// export const fetchCartData = async () => {
//    const cartItemsData = await fetchItems()
//    return  cartItemsData
// }

const ProtectedRoute = ({ children }) => { 

  const {user, isLoggedInUser} = useSelector((state)=>state.userReducer);
  const dispatch = useDispatch();
  const userdata = useLoaderData();


  
  useEffect(()=>{
    
    if(userdata[0]?.status === 401){
        dispatch(logOutUser());
        toast.error("please login again")
        return <Navigate to="/login" replace={true}/>
    }
      dispatch(logInUser(userdata[0]))
      dispatch(fetchCartItems(userdata[1]))
    

    // if(userdata){
    //     fetchCartData().then((data)=>{
    //         dispatch(fetchCartItems(data))
    //     }).catch((err)=>{console.log(err);
    //     })
    //     dispatch(logInUser(userdata))
    // }
  },[userdata,dispatch])

  if(isLoggedInUser){
    return children;

  }else{
    return <Navigate to={'/login'} replace={true}/>
  }
    

}

export default ProtectedRoute;