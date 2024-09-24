import React, { useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate} from 'react-router-dom'
import { calculatePrice } from '../../redux/reducers/cartReducer';
import axios from 'axios';
import { ShopContext } from '../../context/ShopContext';
import { Helmet } from 'react-helmet-async';


const OrderSummery = () => {
    const {cartItems, shippingInfo, shippingCharge, subtotal, total, tax, discount} = useSelector((state)=>state.cartReducer);
    const {user} = useSelector((state)=>state.userReducer);
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const {addToCartDiscount} = useContext(ShopContext);
    useEffect(()=>{
        if(cartItems.length === 0){
            Navigate('/cart', {replace:true});
           }
        dispatch(calculatePrice(addToCartDiscount));
    },[cartItems])

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                `https://shopping-app-jh29.onrender.com/api/v1/payment/make_payment`,
                {
                  amount: 1400,
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
      
            Navigate("/payment", {
              state: data.clientSecret,
            });
          } catch (error) {
            console.log(error);
            
          }
    }

    return (
        <>
        <Helmet title="Order-Summery- Mern-Ecommerce-App"/>
         <div className='m-2 lg:m-6'>
            <form className=' bg-white py-[30px] lg:flex xl:flex-row md:flex-row lg:gap-2 flex-col' onSubmit={submitHandler}>
                <div className=' lg:w-3/4 lg:border-r-2'>
                    <div className='leading-7 text-xs lg:text-base'>
                        <h1 className='font-bold my-4 ml-4'>Shipping Info</h1><hr className='' />
                        <div className='my-4 ml-4'>
                            <div className='flex gap-3'>
                                <p className='font-bold'>Name :</p>
                                <span>{user?.name}</span>
                            </div>
                            <div className='flex gap-3'>
                                <p className='font-bold'>Address :</p>
                                <span>{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.pincode}, {shippingInfo.state}</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full overflow-x-auto">
                    <table className="w-full whitespace-nowrap">
                        <thead className="text-xs font-semibold tracking-wide text-left uppercase bg-orange-400 text-white">
                            <tr>
                                <td className="px-4 py-2">Product</td>
                                <td className="px-4 py-2">Name</td>
                                <td className="px-4 py-2">Quantity</td>
                                <td className="px-4 py-2">Price</td>
                                <td className="px-4 py-2">Total</td>
                            </tr>
                        </thead>
                        {cartItems?.map((val,i)=>{
                return (
                        <tbody key={i}  className="bg-white">
                            
                            <tr>

                                <td className="px-4 py-2">
                                    <div className=" rounded-full  w-10 h-10 mr-2 md:block bg-gray-50">
                                        <img className="object-cover w-full h-full rounded-full" src={val?.product?.photo[0]?.url} alt="product" />
                                    </div>
                                </td>
                                <td className="px-4 py-2">
                                    <span className="text-sm">{val.product.name}</span>
                                </td>
                                <td className="px-4 py-2">
                                    <span className="text-sm">{val.quantity}</span>
                                </td>
                                <td className="px-4 py-2">
                                    <span className="text-sm">{Math.ceil(val.product.price - (val.product.price * 15)/100)}</span>
                                </td>
                                <td className="px-4 py-2">
                                    <span className="text-sm">{val.quantity * Math.ceil(val.product.price - (val.product.price * 15)/100)}</span>
                                </td>
                            </tr>
                        </tbody>
                            )
                        })}


                    </table>
                </div>
                </div>
                
                <div className='text-xs lg:text-base lg:w-1/4 lg:border-l-2'>
                    <div>
                        <h1 className='font-bold my-4 ml-3'>Order Summery</h1><hr className='' />
                    </div>
                    <div className='my-4 leading-7'>
                    <div className='flex justify-between mx-3'>
                        <p className='font-semibold'>Total MRP :</p>
                        <span>Rs. {subtotal}</span>
                    </div>
                    <div className='flex justify-between mx-3'>
                        <p className='font-semibold'>Discount MRP :</p>
                        <span>Rs. {discount}</span>
                    </div>
                    <div className='flex justify-between mx-3'>
                        <p className='font-semibold'>Shipping Fee :</p>
                        <span>Rs. {shippingCharge}</span>
                    </div>
                    <div className='flex justify-between mx-3'>
                        <p className='font-semibold'>Tax :</p>
                        <span>Rs. {tax}</span>
                    </div><hr className='my-4'/>
                    <div className='flex justify-between mx-3'>
                        <p>
                            <b>Total :</b>
                        </p>
                        <span>Rs. {total}</span>
                    </div>
                    <div className='flex justify-between mx-3 mt-8'>
                    <button className='bg-orange-600  text-white font-normal hover:bg-orange-700 h-11 w-full'>
                        Process to Payment
                    </button>
                    </div>
                    </div>
                </div>
            </form>
            </div>
        </>
    )
}

export default OrderSummery