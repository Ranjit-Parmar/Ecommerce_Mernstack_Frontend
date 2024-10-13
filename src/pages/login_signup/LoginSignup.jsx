import React, { useRef, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginUserMutation, useRegisterUserMutation } from '../../redux/Api/userApi'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { logInUser, logOutUser } from '../../redux/reducers/userReducer';
import { fetchCartItems, fetchItems, resetCart } from '../../redux/reducers/cartReducer';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Loader from '../../components/Loader/Loader';




const LoginSignup = () => {

  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const {isLoading, user} = useSelector((state)=>state.userReducer);

  const [accountState, setAccountState] = useState("Login")
  const [button, setButton] = useState(false)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [registerUser] = useRegisterUserMutation();
  const [loginUser] = useLoginUserMutation();

  const emailRef = useRef(null);
  const nameRef = useRef(null);
  const passwordRef = useRef(null);


  useEffect(() => {

    if (isLoading) Navigate('/', { replace: true });

      dispatch(logOutUser(null))
    
      dispatch(resetCart());

      dispatch(fetchCartItems([]))

      localStorage.clear()

  }, [isLoading, user])


  const submitHandler = async (e) => {

    e.preventDefault();

    setButton(true);

    if (accountState === 'signup') {

      if (!name || !email || !password) toast.error('please provide all the fields');

      const res = await registerUser({
        name, email, password
      })

      if (res.data && res?.data?.success) {

        const cartData = await fetchItems();
        dispatch(logInUser(res?.data?.userData));
        setButton(false);
        Navigate('/', { replace: true })
        dispatch(fetchCartItems(cartData))

      } else {

        const { data } = res?.error
        toast.error(data?.message);
        setButton(false);
      }

    } else {

      const res = await loginUser({
        email, password
      });

      if (res?.data) {

        const cartData = await fetchItems();
        dispatch(logInUser(res?.data?.userData));
        setButton(true);
        Navigate('/', { replace: true })
        dispatch(fetchCartItems(cartData))

      } else {

        const { data } = res?.error
        toast.error(data?.message);
        setButton(false);

      }

    }
  }

  return (
    isLoading ? <Loader/> :
    <>
      <HelmetProvider>
        <Helmet>
          <html lang="en" />
          <title>{`${accountState}- Mern-Ecommerce-App`}</title>
          <meta
            name="description"
            content="Login-Signup- Mern-Ecommerce-App "
          />
        </Helmet>

        <div className='w-full lg:h-3/4 lg:mt-0 ;g:py-10 lg:py-[100px] mt-24'>
          <form method='POST' encType="multipart/form-data" className=' ' onSubmit={submitHandler}>

            <div className=" lg:w-1/2 w-[95%] lg:h-[650px] bg-white m-auto py-5 lg:py-10 px-12 lg:px-[60px] shadow-lg">
              <h1 className='my-5 mx-0 text-lg lg:text-xl font-medium'>{accountState}</h1>
              <div className="flex flex-col gap-3 lg:gap-[20px] mt-[30px]">
                {accountState == "signup" ? <input type="text" placeholder='Enter Your Name' className='h-11 lg:h-[72px] w-full pl-5 border-[1px] border-gray-400 outline-none lg:text-lg' ref={nameRef} onChange={(e) => setName(e.target.value)} /> : ""}
                <input type="email" placeholder='Enter Your Email' className='h-11 lg:h-[72px] w-full pl-5 border-[1px] border-gray-400 outline-none lg:text-lg' ref={emailRef} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder='Enter Your Password' className='h-11 lg:h-[72px] w-full pl-5 border-[1px] border-gray-400 outline-none lg:text-lg' ref={passwordRef} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button className={`${button?'opacity-75 pointer-events-none':''} w-full h-11 lg:h-[72px] text-white bg-orange-500 hover:bg-orange-600 mt-5 lg:mt-[30px] border-none tracking-wider text-lg lg:text-2xl font-medium cursor-pointer`}>Continue</button>
              <p className="mt-5 text-xs lg:text-lg font-medium inline-block">{accountState == "signup" ? "Already have an account? " : "Create an account? "}<span className='text-red-500 font-semibold' onClick={() => { setAccountState((prev) => prev == "signup" ? "Login" : "signup") }}>{setAccountState == "signup" ? "Login here" : "Click here"}</span></p>
              <Link to={'/forgotPassword'} className='text-sm text-blue-700 hover:underline float-right mt-5'>forgotten password?</Link>
              <div className="flex items-center mt-[25px] gap-2 text-xs lg:gap-5 lg:text-lg">
                <input type="checkbox" name="" id="" />
                <p>By continuing, i agree to the terms of use & privacy policy.</p>
              </div>
            </div>

          </form>
        </div>
      </HelmetProvider>
    </>
  )
}

export default LoginSignup