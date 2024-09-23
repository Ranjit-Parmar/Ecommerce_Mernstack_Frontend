import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useMyOrdersQuery } from '../../redux/Api/orderApi'
import { useSelector } from 'react-redux'
import { MdOutlineSmsFailed } from "react-icons/md";
import { Helmet } from 'react-helmet-async';

const MyOrder = () => {

  const { user } = useSelector((state) => state.userReducer);
  const { data, isLoading, isError } = useMyOrdersQuery(user?._id);
  const [userOrders, setUserOrders] = useState(null);

  
  useEffect(()=>{
    if(data?.getMyOrder?.length > 0){
      setUserOrders(true)
    }else{
      setUserOrders(false)
    }
  },[user,data])

  return (

    <div>
      <Helmet title='My Orders- Mern-Ecommerce-App'/>
      <div >
        <div className=''>
          <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">



            {isLoading?"Loading...": data?.getMyOrder?.map((val,i)=>{
              return (
                <div key={i} className={`${userOrders? "block":"hidden"}`}>
                <div  className="px-4 py-6 sm:px-6 ">

              <div className=" flex justify-between items-center flex-shrink flex-wrap">

                <div className=''>
                  <h1 className="text-2xl my-5 font-bold tracking-tight text-gray-900">
                    OrderId #  {val?._id}
                  </h1>
                  <div className="flex ">
                    <div className=" h-56 w-40 flex-shrink-0 overflow-hidden rounded-md ">
                      <Link to={`/productdetail/${val?.orderItems?.product?._id}`}>
                        <img
                          src={val?.orderItems?.product?.photo[0]?.url}
                          alt='product photo'
                          className="h-full w-full object-cover object-center"  
                        />
                      </Link>
                    </div>
                  </div>
                </div>

                <div className='w-full mt-3 lg:mt-0 xl:mt-0 lg:w-1/4 border-2 border-gray-200'>

                  <div className='my-4 leading-7 '>

                    <div className='flex justify-between mx-3'>
                      <p className='font-semibold'>Order Stauts :</p>
                      <span className={`${val?.orderStatus === 'processing'?"text-blue-600":val?.orderStatus === 'delivered'?"text-green-600":val?.orderStatus === 'pending'?"text-yellow-500":val?.orderStatus === 'cancel'?"text-red-600":""}`}>{val?.orderStatus}</span>
                    </div>
                    <div className='flex justify-between mx-3'>
                      <p className='font-semibold'>Name :</p>
                      <span>{val?.orderItems.product.name}</span>
                    </div>
                    <div className='flex justify-between mx-3'>
                      <p className='font-semibold'>Quantity :</p>
                      <span>{val?.orderItems.quantity}</span>
                    </div>
                    <div className='flex justify-between mx-3'>
                      <p className='font-semibold'>Size :</p>
                      <span>{val?.orderItems.size}</span>
                    </div>
                    <div className='flex justify-between mx-3'>
                      <p className='font-semibold'>Item Price :</p>
                      <span>Rs. {val?.itemPrice}</span>
                    </div>
                    <div className='flex justify-between mx-3'>
                      <p className='font-semibold'>Discount MRP :</p>
                      <span>Rs. {val?.discount}</span>
                    </div>
                    <div className='flex justify-between mx-3'>
                      <p className='font-semibold'>Shipping Fee :</p>
                      <span>Rs. {val?.shippingPrice}</span>
                    </div>
                    <div className='flex justify-between mx-3'>
                      <p className='font-semibold'>Tax :</p>
                      <span>Rs. {val?.taxPrice}</span>
                    </div><hr className='my-4' />
                    <div className='flex justify-between mx-3'>
                      <p>
                        <b>Total :</b>
                      </p>
                      <span>Rs. {val?.totalPrice}</span>
                    </div>

                  </div>
                </div>


              </div>

            </div>
              







 <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
              <p className="mt-0.5 px-4 text-sm ">
                Shipping Address :
              </p>

              <div className="flex justify-between gap-x-6 px-5 py-5 border-soli">
                <div className="flex gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      address :{val?.shippingInfo?.address}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      city :{val?.shippingInfo?.city}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      pincode :{val?.shippingInfo?.pincode}
                    </p>
                  </div>
                </div>
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">
                    Phone: {val?.shippingInfo?.mobile}
                  </p>
                  <p className="text-sm leading-6 text-gray-500">
                    state : {val?.shippingInfo?.state}
                  </p>
                </div>
              </div>
            </div> 
            </div>
            )
          })}


             <div className={`${!userOrders? "block":"hidden"} m-auto text-center p-10 h-1/2 flex flex-col justify-between items-center gap-3 `}>
              <MdOutlineSmsFailed className="text-4xl" />

              <h3 className="text-lg">You have no orders</h3>
              <Link to="/productlist" className="bg-orange-500 hover:bg-orange-600 text-white border-none px-1 py-3 cursor-pointer font-medium m-2 w-40">Shop Now</Link>
            </div>


          </div>
        </div>  
      </div>
    </div>
  )
}

export default MyOrder