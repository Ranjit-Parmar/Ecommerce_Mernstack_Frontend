import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useCreateCouponMutation, useUpdateCouponMutation, useGetSingleCouponQuery } from '../../../redux/Api/couponApi';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
import Loader from '../../Loader/Loader';

const Add_Edit_Coupon = () => {

  const [couponName,setCouponName] = useState('');
  const [couponDiscount,setCouponDiscount] = useState('');
  const [couponExpiry,setCouponExpiry] = useState('');

  const {state} = useLocation();
  const Navigate = useNavigate();
  const {id} = useParams();

  const [createCoupon] = useCreateCouponMutation();
  const [updateCoupon] = useUpdateCouponMutation();
  const {data, isLoading, isError} = useGetSingleCouponQuery(id?id:"");

  const {code, discount, expire} = data?.coupon || {
          code : "",
          discount : "",
          expire : ""
  }

  if(state==='update'){
    useEffect(()=>{
      if(data){
        setCouponName(code);
        setCouponDiscount(discount);
        setCouponExpiry(expire.substring(0,10));
      }else{
        console.log(isError);
        
      }
    },[data])
  }
  

  const submitHandler = async (e) => {
    e.preventDefault();
    if(state === 'create'){
      const {data} = await createCoupon({code:couponName,discount:couponDiscount,expire:couponExpiry});

      if(data.success){
        toast.success(data.message);
        Navigate('../coupons');
      }else{
        toast.error('something went wrong');
      }

    }
    if(state === 'update'){
      const {data} = await updateCoupon({id:id,code:couponName,discount:couponDiscount,expire:couponExpiry});
      
      
      if(data.success){
        toast.success(data.message);
        Navigate('../coupons');
      }else{
        toast.error('something went wrong');
      }
    }
    
  }
  
  return (
    isLoading?<Loader/>: <div className='m-2 lg:m-6'>
    <form onSubmit={submitHandler} className="lg:w-1/2 bg-white m-auto py-5 lg:py-10 px-6 lg:px-[30px] shadow-lg">
        <h1 className='my-5 mx-0 text-lg lg:text-xl font-medium'>{state==='update'?"Update Coupon":"Create Coupon"}</h1>
        {state==="create"?<div className="flex flex-col gap-3 lg:gap-[20px] mt-[30px]">
            <input type="text" placeholder='Enter Coupon Name' className='h-14 lg:h-[72px] w-full pl-5 border-[1px] border-gray-400 outline-none lg:text-lg' onChange={(e)=>{setCouponName(e.target.value)}}/>
            <input type="number" placeholder='Enter Coupon Discount' className='h-14 lg:h-[72px] w-full pl-5 border-[1px] border-gray-400 outline-none lg:text-lg' onChange={(e)=>{setCouponDiscount(e.target.value)}}/>
            <div className=''>
               <span>Select Expiry</span> 
                <input type="date" className='h-14 lg:h-[72px] w-full pl-5 border-[1px] border-gray-400 outline-none lg:text-lg' onChange={(e)=>{setCouponExpiry(e.target.value)}}/>
            </div>
        </div>:<div className="flex flex-col gap-3 lg:gap-[20px] mt-[30px]">
            <input type="text" placeholder='Enter Coupon Name' className='h-14 lg:h-[72px] w-full pl-5 border-[1px] border-gray-400 outline-none lg:text-lg' value={couponName} onChange={(e)=>{setCouponName(e.target.value)}}/>
            <input type="number" placeholder='Enter Coupon Discount' className='h-14 lg:h-[72px] w-full pl-5 border-[1px] border-gray-400 outline-none lg:text-lg' value={couponDiscount} onChange={(e)=>{setCouponDiscount(e.target.value)}}/>
            <div className=''>
               <span>Select Expiry</span> 
                <input type="date" className='h-14 lg:h-[72px] w-full pl-5 border-[1px] border-gray-400 outline-none lg:text-lg' value={couponExpiry} onChange={(e)=>{setCouponExpiry(e.target.value)}}/>
            </div>
        </div>}
       
        <button className='w-full h-14 lg:h-[72px] text-white bg-orange-500 hover:bg-orange-600 mt-5 lg:mt-[30px] border-none tracking-wider text-lg lg:text-2xl font-medium cursor-pointer'>{state==='update'?"Update":"Create"}</button>
    
    </form>
</div>
  )
}

export default Add_Edit_Coupon