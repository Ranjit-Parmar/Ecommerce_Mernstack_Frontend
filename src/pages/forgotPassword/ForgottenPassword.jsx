import React, { useState } from 'react'
import { useForgotPasswordMutation } from '../../redux/Api/userApi';
import toast from 'react-hot-toast';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const ForgottenPassword = () => {
    const [email, setEmail] = useState('');
    const [forgotPassword] = useForgotPasswordMutation();
    const [button, setButton] = useState(false)

    const submitHandler = async (e) => {
        e.preventDefault();
        setButton(true);
        const res = await forgotPassword(email);
        if(res?.data?.success){
            toast.success("reset token sent to your email address")
            setButton(false);
        }else if(res?.error){
            const {data} = res.error;
            toast.error(data.message);
            setButton(false)
          }else{
            toast.error('something went wrong');
            setButton(false)
        }
        
    }
  return (
    <>
    <HelmetProvider>
     <Helmet>
          <html lang="en" />
          <title>Forgot Password- Mern-Ecommerce-App</title>
          <meta
            name="description"
            content="Forgot Password- Mern Ecommerce Project For Online Shopping "
            />
        </Helmet>
      <div className='w-full lg:h-3/4 py-10 lg:py-[100px]'>
        <form method='POST' encType="multipart/form-data" onSubmit={submitHandler}>

          <div className="lg:w-1/2 w-[95%] lg:h-[650px] bg-white m-auto py-5 lg:py-10 px-12 lg:px-[60px] shadow-lg">
            <h1 className='my-5 mx-0 text-lg lg:text-xl font-medium'>Find Your Account</h1>
            <div className="flex flex-col gap-3 lg:gap-[20px] mt-[30px]">
              <input type="email" placeholder='Enter Your Email' className='h-11 lg:h-[72px] w-full pl-5 border-[1px] border-gray-400 outline-none lg:text-lg' onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>
            <button className={`${button?'opacity-75 pointer-events-none':''} w-full h-11 lg:h-[72px] text-white bg-orange-500 hover:bg-orange-600 mt-5 lg:mt-[30px] border-none tracking-wider text-lg lg:text-2xl font-medium cursor-pointer`}>Search</button>
          </div>

        </form>
      </div>
    </HelmetProvider>
    </>
  )
}

export default ForgottenPassword