import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { shippingInfo } from '../../redux/reducers/cartReducer';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Address = () => {

    const Navigate = useNavigate()
    const dispatch = useDispatch();

   const {cartItems} = useSelector((state)=>state.cartReducer);

   useEffect(()=>{

     if(cartItems.length === 0){
      Navigate('/cart', {replace:true});
     }

   },[cartItems])

    
    const [value, setValue] = useState({
        address : '',
        city  : '',
        pincode : '',
        state : '',
        mobile : '',
    })

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(shippingInfo(value));
        localStorage.setItem('address', JSON.stringify(value));
        Navigate('/checkout/address/order-summery');
    }
    
  return (
    <>
    <Helmet title="Address- Mern-Ecommerce-App"/>
    <div className='w-full  py-[30px]'>
        <form className="lg:w-1/2 h-full bg-white m-auto py-10 px-[30px] shadow-lg" onSubmit={submitHandler}>
            <h1 className='text-lg font-medium'>Contact</h1>
            <div className="flex flex-col gap-2 mt-[30px] ">
                <input type="text" placeholder='Mobile Number' className='flex-1 basis-14 w-full pl-5 border-[1px] border-gray-400 outline-none text-lg hover:bg-orange-100' name='mobile' value={value.mobile} onChange={(e)=> setValue((pre)=>{
                  return  {...pre, [e.target.name]:e.target.value}
                })}/>
            </div>
            <h1 className='text-lg font-medium mt-[30px]    '>Address</h1>
            <div className="flex flex-col gap-2 mt-[30px] ">
                <input type="text" placeholder='Pin Code' className='flex-1 basis-14 w-full pl-5 border-[1px] border-gray-400 outline-none text-lg hover:bg-orange-100' name='pincode' value={value.pincode} onChange={(e)=> setValue((pre)=>{
                  return  {...pre, [e.target.name]:e.target.value}
                })}/>
                <input type="text" placeholder='Address' className='flex-1 basis-14 w-full pl-5 border-[1px] border-gray-400 outline-none text-lg hover:bg-orange-100' name='address' value={value.address} onChange={(e)=> setValue((pre)=>{
                  return  {...pre, [e.target.name]:e.target.value}
                })}/>
                <input type="text" placeholder='City' className='flex-1 basis-14 w-full pl-5 border-[1px] border-gray-400 outline-none text-lg hover:bg-orange-100' name='city' value={value.city} onChange={(e)=> setValue((pre)=>{
                  return  {...pre, [e.target.name]:e.target.value}
                })}/>
                <input type="text" placeholder='State' className='flex-1 basis-14 w-full pl-5 border-[1px] border-gray-400 outline-none text-lg hover:bg-orange-100' name='state' value={value.state} onChange={(e)=> setValue((pre)=>{
                  return  {...pre, [e.target.name]:e.target.value}
                })}/>
            </div>
           
            <button className='w-full h-[62px] text-white bg-orange-600 hover:bg-orange-700 mt-[30px] border-none text-xl font-medium cursor-pointer'>Continue</button>
        
        </form>

    </div>
    </>
  )
}

export default Address