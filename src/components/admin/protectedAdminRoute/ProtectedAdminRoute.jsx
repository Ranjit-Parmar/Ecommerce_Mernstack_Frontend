import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLoaderData } from "react-router-dom"
import { loadUser, logInUser, logOutUser } from "../../../redux/reducers/userReducer";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


const loadUserData = async () => {
    const userData = await loadUser();
    return userData;
  }
  
  
const ProtectedAdminRoute = ({children}) => {

    const [userData, setUserData] = useState(null);
    const loadData  = useLoaderData();

  
  if(loadData && loadData.role === 'user'){
    return <Navigate to='/' replace={true}/>
  }else{
    return children
  }


   

}

export default ProtectedAdminRoute