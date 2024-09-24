import React, {  useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdHome, IoMdExit } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../../../context/ShopContext';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '../../../redux/reducers/userReducer';
import { fetchCartItems, resetCart } from '../../../redux/reducers/cartReducer';
import axios from 'axios';
import toast from 'react-hot-toast';
import profileIcon from '../../../assets/profile-icon.png';

const Header = () => {
    const Navigate = useNavigate()

    const dispatch = useDispatch();

    const menuRef = useRef();
    
    const {open,setOpen} = useContext(ShopContext);

    const [openProfile, setOpenProfile] = useState(false);

    const {user, isLoading} = useSelector((state)=>state.userReducer);

    useEffect(()=>{
        const menuHandler = (e) => {
            if(!menuRef.current.contains(e.target)){
                setOpenProfile(false);
            }
        }
        document.addEventListener('mousedown', menuHandler);

        return () => {
            document.removeEventListener('mousedown', menuHandler)
        }
    },[openProfile])
    
    const logOutHandler = async () => {

        const option = {
            url : 'https://shopping-app-2ow9.onrender.com/api/v1/user/logout',
            method : 'GET',
            withCredentials : true,
        }

        const {data} = await axios(option);
        if(data.success){
            
            dispatch(logOutUser(null))
            dispatch(fetchCartItems([]))
            dispatch(resetCart())
            localStorage.clear();
            Navigate('/login-signup');
            toast.success('logout successfully')
            
        }else{
            toast.error('something went wrong');
        }
       
    }
   
    
    
  return (
   isLoading ? "Loading..." : <>
    <header className='z-30 py-4 bg-white shadow-sm'>
                <div className="container flex items-center justify-between h-full px-6 mx-auto text-orange-600">
                    <button className='block text-2xl w-10 font-semibold lg:block outline-0 focus:outline-none' onClick={()=>{setOpen((prev)=>!prev)}}>
                        &#9776;
                    </button>
                    
                    
                    <ul className='flex justify-end items-center '>
                        <li className='relative inline-block text-left' ref={menuRef}>
                    
                       <button className='rounded-full text-white h-8 w-8 font-normal mx-auto focus:outline-none' onClick={()=>{setOpenProfile((prev)=>!prev)}}>
                            <div className="relative rounded-full inline-block w-full h-full align-middle ">
                               <img src={user?.photo?.map((val)=>val.url) || profileIcon} alt="user profile img" className="object-cover w-full h-full rounded-full" />
                                <div className="absolute rounded-full shadow-inner"></div>
                            </div>
                        </button>
                        <ul className={`${openProfile?"block":"hidden"} origin-top-right absolute -right-5 lg:right-0 mt-4 w-56 rounded-md shadow-lg bg-white focus:outline-none`}>
                            <li className='justify-between py-2 pl-4 transition-colors duration-150 hover:bg-orange-100 text-gray-500 hover:text-orange-600'>
                                <Link to="/">
                                    <span className="flex justify-start items-center">
                                        <IoMdHome className='w-4 h-4 mr-3'/>
                                        <span>Home</span>
                                    </span>
                                </Link>
                            </li>
                            <li className='justify-between py-2 pl-4 transition-colors duration-150 hover:bg-orange-100 text-gray-500 hover:text-orange-600'>
                                <Link to="edit-profile">
                                    <span className="flex justify-start items-center">
                                        <FiEdit className='w-4 h-4 mr-3'/>
                                        <span>Edit Profile</span>
                                    </span>
                                </Link>
                            </li>
                            <li className='justify-between py-2 pl-4 transition-colors duration-150 hover:bg-orange-100 text-gray-500 hover:text-orange-600' onClick={logOutHandler}>
                                    <span className="flex justify-start items-center">
                                        <IoMdExit className='w-4 h-4 mr-3'/>
                                        <span>Log Out</span>
                                    </span>
                            
                            </li>
                        </ul>
                        </li>
                    </ul>

                </div>
            </header>
    </>
  )
}

export default Header