import React, { useState } from 'react'
import { useResetPasswordMutation } from '../../redux/Api/userApi';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Helmet, HelmetProvider } from 'react-helmet-async';


const ResetPassword = () => {
    
    const [resetPassword] = useResetPasswordMutation();
    const [password, setPassword] = useState('');
    const [button, setButton] = useState(false)
    const {id} = useParams();
    const Navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        setButton(true);
        const res = await resetPassword({id:id,password:password});
        if(res?.data?.success){
            const message = res?.data?.message;
            toast.success(message);
            setButton(false);
            Navigate('/login-signup')
            
        }else{
            toast.error('something went wrong');
            setButton(false);
            Navigate('/forgotPassword')
        }
        
    }

  return (
    <>
    <HelmetProvider>
     <Helmet>
          <html lang="en" />
          <title>Reset Password- Mern-Ecommerce-App</title>
          <meta
            name="description"
            content="Reset Password- Mern Ecommerce Project For Online Shopping "
            />
        </Helmet>
    <div className='w-full h-3/4 py-10 lg:py-[100px]'>
      <form method='POST' encType="multipart/form-data" onSubmit={submitHandler}>

        <div className="lg:w-1/2 w-[95%] lg:h-[650px] bg-white m-auto py-5 lg:py-10 px-12 lg:px-[60px] shadow-lg">
          <h1 className='my-5 mx-0 text-lg lg:text-xl font-medium'>Reset Your Password</h1>
          <div className="flex flex-col gap-3 lg:gap-[20px] mt-[30px]">
            <input type="password" placeholder='Enter New Password' className='h-14 lg:h-[72px] w-full pl-5 border-[1px] border-gray-400 outline-none lg:text-lg' onChange={(e)=>{setPassword(e.target.value)}}/>
          </div>
          <button className={`${button?'opacity-75 pointer-events-none':''} w-full h-11 lg:h-[72px] text-white bg-orange-500 hover:bg-orange-600 mt-5 lg:mt-[30px] border-none tracking-wider text-lg lg:text-2xl font-medium cursor-pointer`}>Reset Password</button>
        </div>

      </form>
    </div>
    </HelmetProvider>
  </>
  )
}

export default ResetPassword