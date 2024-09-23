import React, { useEffect, useState, useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import {CiSearch} from 'react-icons/ci'
import { MdDashboard } from "react-icons/md";
import {IoBagAddOutline} from 'react-icons/io5'
import {Link} from 'react-router-dom'
import { RxCross1 } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import toast from 'react-hot-toast';
import { logOutUser } from '../../redux/reducers/userReducer'
import { fetchCartItems, resetCart } from '../../redux/reducers/cartReducer'
import profileIcon from '../../assets/profile-icon.png';
import logo from '../../assets/logo.png';
import { FiEdit } from 'react-icons/fi';
import { IoMdExit } from 'react-icons/io';
import { AiOutlineBorderlessTable } from 'react-icons/ai';


const Header = () => {

    const dispatch = useDispatch();
    const menuRef = useRef();
    const navRef = useRef();

    const {cartItems} = useSelector((state)=>state.cartReducer)
    const {user, isLoading} = useSelector((state)=>state.userReducer)
    
    const [open, setOpen] = useState(false)
    const [openProfile, setOpenProfile] = useState(false)
    const [search, setSearch] = useState('');
    const [value, setValue] = useState('');


    const Navigate = useNavigate()
   
    useEffect(()=>{

        const menuHandler = (e) => {
            if(!menuRef?.current?.contains(e.target)){
                setOpen(false)
            }
            if(!navRef?.current?.contains(e.target)){
                setOpenProfile(false)
            }
        }
        
        document.addEventListener('mousedown', menuHandler);
        
        return () => {
            document.removeEventListener('mousedown', menuHandler)
        }
    },[open, openProfile])
    
    
    

    const logOutHandler = async() => {

        const option = {
            url : 'http://localhost:5000/api/v1/user/logout',
            method : 'GET',
            withCredentials : true,
            headers : {
                'Content-Type':'application/json'
            }
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

    
    const searchHandler = (e) => {   
          setSearch(e.target.value);   
    }

    const submitHandler = (e) => {
        e.preventDefault();
        setValue(search);
        if(value){
            Navigate(`../productlist/?search=${value}`);
        }
    }
    
  return (
    isLoading?"Loading...":<>
    <div className="h-[80px] lg:h-[100px] w-full bg-white shadow-lg">
        <nav className="flex justify-between items-center h-full lg:w-[95%] m-auto flex-shrink">
            <div className=" gap-4 lg:gap-0  flex justify-between items-center h-full w-[25%] lg:w-[50%]" >
            <button className='text-2xl pl-2 lg:hidden block w-10 font-semibold outline-0 focus:outline-none' onClick={()=>{setOpen((prev)=>!prev)}} >
                        &#9776;
            </button>
            <div className="w-[200px] h-full flex justify-center items-center ">
                <Link to='/' className='flex justify-start items-center h-full w-full'><img src={logo} alt="Logo" className='w-11 lg:w-[50%]'/></Link>
            </div>
           
                <ul className='hidden w-[80%] h-full lg:flex justify-center items-center flex-grow-1'>
                    <li className=' pr-6 text-xl  hover:text-orange-500 duration-[.2s]'><Link to='/shopcategory/male' className='w-full h-full block content-center'>men</Link></li>
                    <li className='pr-6 text-xl  hover:text-orange-500 duration-[.2s]'><Link to='/shopcategory/female' className='w-full h-full block content-center'>women</Link></li>
                    <li className='pr-6 text-xl  hover:text-orange-500 duration-[.2s]'><Link to='/shopcategory/kid' className='w-full h-full block content-center'>kids</Link></li>
                </ul>
               
            </div>
            <div className=' lg:w-[50%] h-full flex justify-between items-center' >
                <form onSubmit={submitHandler} className='flex justify-center items-center lg:w-[50%] h-full gap-1'>
                    <CiSearch className='w-auto h-6'/>
                    <input type="text" className='w-[80%] h-7 rounded-lg  pl-3 outline-4' onChange={searchHandler} placeholder='Search for products'/>
                </form>
                <ul className="h-full w-[30%] flex justify-center lg:justify-end items-center gap-5" >
                    <li className='relative lg:pr-6  font-normal flex flex-col items-center duration-[.2s]' ref={navRef}>
                        <button className='hidden lg:flex rounded-full w-8 h-8 text-white focus:outline-none font-normal mx-auto ' onClick={()=>{setOpenProfile((prev)=> !prev)}}>                     
                        <div className="relative rounded-full inline-block w-full h-full align-middle " >
                               <img src={user?.photo?.map((val)=>val?.url) || profileIcon}  alt="user profile img" className="object-cover w-full h-full rounded-full" />
                        </div>
                        </button>                       
                             <ul className={`${openProfile?"hidden lg:block":"hidden"} origin-top-right top-12 lg:top-[58px] absolute mt-2 w-36 lg:w-56 shadow-lg bg-white focus:outline-none z-30`} >
                                <li className='py-2 pl-4 transition-colors duration-150 text-gray-500'>
                                    
                                        <div className="flex justify-start items-center gap-2 lg:text-sm ">
                                        <span className=''>hello, </span>  <h2 className=''>{user?.name} </h2>
                                        </div>
                                   
                                </li>
                                <li className={`${user?.role=='user'?'hidden':'block'} justify-between font-normal py-2 pl-4 transition-colors duration-150 hover:bg-orange-100 text-gray-500 hover:text-orange-600`}>
                                    <Link to="/admin">
                                        <span className="flex justify-start items-center">                       
                                            <MdDashboard className='w-4 h-4 mr-3'/>
                                            <span>Admin Panel</span>
                                        </span>
                                    </Link>
                                </li>
                                <li className='justify-between font-normal py-2 pl-4 transition-colors duration-150 hover:bg-orange-100 text-gray-500 hover:text-orange-600'>
                                    <Link to="/my-order" className=''>
                                        <span className="flex justify-start items-center">                                            
                                            <AiOutlineBorderlessTable className='w-4 h-4 mr-3'/>
                                            <span>My Orders</span>
                                        </span>
                                    </Link>
                                </li>
                                <li className='justify-between font-normal py-2 pl-4 transition-colors duration-150 hover:bg-orange-100 text-gray-500 hover:text-orange-600'>
                                    <Link to="edit-profile">
                                        <span className="flex justify-start items-center">                                           
                                            <FiEdit className='w-4 h-4 mr-3'/>
                                            <span>Edit Profile</span>
                                        </span>
                                    </Link>
                                </li>
                                <li className='justify-between font-normal py-2 pl-4 transition-colors duration-150 hover:bg-orange-100 text-gray-500 hover:text-orange-600' onClick={logOutHandler}>
                                    <Link >
                                        <span className="flex justify-start items-center">
                                            <IoMdExit className='w-4 h-4 mr-3'/>
                                            <span>Log Out</span>
                                        </span>
                                    </Link>
                                </li>
                            </ul>                                                     
                        
                    </li>
                   
                    <li className='pr-2 lg:pr-6  font-normal flex flex-col items-center hover:text-orange-500 duration-[.2s] relative'>
                        <Link to='/cart'><IoBagAddOutline className='w-auto h-8'/></Link>
                        <span className={`${cartItems?.length > 0? "block absolute rounded-full right-2 w-5 h-5 text-center leading-5 bg-red-600 text-xs text-white":"hidden"}`}>{cartItems?.length}</span>
                    </li>
                </ul>
            </div>
        </nav>
    </div>



    {/* for mobile device */}

    <div className={`${open?"left-0":"-left-[100%]"} lg:hidden z-30 fixed duration-100 ease-out block w-[50%] top-0  h-screen py-4 gap-0 text-gray-500 bg-slate-100 shadow-md`}>
    
        <button className="bg-gray-300  absolute top-4 right-2" onClick={()=>{setOpen(false)}}><RxCross1 className='text-2xl bg-slate-100'/></button>
            <div className='mt-16 h-16 w-16 ml-9 rounded-full'>
                <img src={user?.photo?.map((val)=>val?.url) || profileIcon} alt="" className='h-full w-full rounded-full'/>
            </div>
        
                <ul ref={menuRef} className=''>
                    <li className={user?.role=='user'?'hidden':'block'} >
                        <Link  to="/admin" className='h-full px-6 py-4 inline-flex items-center w-full text-xs font-semibold  duration-150 hover:bg-orange-400 hover:text-white'>                           
                            <span className='ml-4'>Admin Panel</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="shopcategory/male" className='h-full px-6 py-4 inline-flex items-center w-full text-xs font-semibold  duration-150 hover:bg-orange-400 hover:text-white'>
                            
                            <span className='ml-4'>Men</span>
                        </Link>
                    </li>
                    <li>
                    <Link to="shopcategory/female" className='px-6 py-4 inline-flex items-center w-full text-xs font-semibold  duration-150 hover:bg-orange-400 hover:text-white'>
                            
                            <span className='ml-4'>Women</span>
                        </Link>
                    </li>
                    <li>
                    <Link to="shopcategory/kid" className='px-6 py-4 inline-flex items-center w-full text-xs font-semibold  duration-150 hover:bg-orange-400 hover:text-white'>
                            
                            <span className='ml-4'>Kids</span>
                    </Link>
                    </li>
                    <li>
                    <Link to="/my-order" className='px-6 py-4 inline-flex items-center w-full text-xs font-semibold  duration-150 hover:bg-orange-400 hover:text-white'>
                            
                            <span className='ml-4'>My Orders</span>
                    </Link>
                    </li>
                    <li>
                    <Link to="edit-profile" className='px-6 py-4 inline-flex items-center w-full text-xs font-semibold  duration-150 hover:bg-orange-400 hover:text-white'>
                            
                            <span className='ml-4'>Edit Profile</span>
                    </Link>
                    </li>
                    <li className='mt-10 p-2'>
                        <button className='bg-orange-500 text-white px-6 py-4 inline-flex items-center rounded-lg w-full text-xs font-semibold  duration-150 hover:bg-orange-600' onClick={logOutHandler}>
                    <IoMdExit className='w-4 h-4 mr-3'/>
                            Log Out
                        </button>
                    </li>
                </ul>
                
            </div>
</>
  )
}

export default Header