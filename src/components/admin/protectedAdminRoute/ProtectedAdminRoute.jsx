import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLoaderData } from "react-router-dom"
import { loadUser, logInUser, logOutUser } from "../../../redux/reducers/userReducer";
import { useEffect } from "react";
import toast from "react-hot-toast";


const loadUserData = async () => {
    const userData = await loadUser();
    return userData;
  }
  
  
const ProtectedAdminRoute = ({children}) => {

    const [userData, setUserData] = useState(null);

  useEffect(()=>{
    loadUserData().then((a)=>{
      setUserData(a)
    }).catch((e)=>{
      setUserData(null)
    });
  },[])

  if(userData.role === 'user'){
    return <Navigate to='/' replace={true}/>
  }else{
    return children
  }


   

}

export default ProtectedAdminRoute