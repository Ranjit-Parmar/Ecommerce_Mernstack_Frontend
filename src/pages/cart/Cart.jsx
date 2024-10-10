import React, { useState, useEffect, useContext } from 'react'
import CartItems from '../../components/cart_items/CartItems'
import {LiaExchangeAltSolid} from 'react-icons/lia'
import {FaExclamation, FaHandHoldingHeart} from 'react-icons/fa'
import {FcApproval} from 'react-icons/fc'
import { useDispatch, useSelector } from 'react-redux'
import { calculatePrice, fetchItems } from '../../redux/reducers/cartReducer'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useUpdateCartItemsMutation } from '../../redux/Api/cartApi.js'
import toast from 'react-hot-toast'
import { ShopContext } from '../../context/ShopContext.jsx'
import { Helmet } from 'react-helmet-async'






const Cart = () => {


  
  const dispatch = useDispatch();
  
 
 const {cartItems, isLoading, subtotal, discount, shippingCharge, tax, total} = useSelector((state)=>state.cartReducer)

 
 const [updateCartItems] = useUpdateCartItemsMutation();
 
  const Navigate = useNavigate(); 
  
  const {setAddToCartDiscount} = useContext(ShopContext);


  const [validCoupon, setValidCoupon] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [coupon, setCoupon] = useState(false);
 


  const couponHandler = (e) => {
     setCoupon(e.target.value);
  }

  const submitHandler = (e) => {

    e.preventDefault();

    axios.get(`https://shopping-app-2ow9.onrender.com/api/v1/coupon/getCoupons?code=${coupon}`).then((res)=>{
      const couponRes = res.data;
      
       if(couponRes?.getAllCoupons?.code === coupon.toUpperCase()){
        setValidCoupon(true);
        setShowMessage(true);
        dispatch(calculatePrice(couponRes?.getAllCoupons?.discount));
        setAddToCartDiscount(couponRes?.getAllCoupons?.discount);
      }
       
          
    }).catch((err)=>{
      const {response} = err;
      if(response.data.error.statusCode === 404) {
        setValidCoupon(false);
        setShowMessage(true);
        dispatch(calculatePrice(0));
        setAddToCartDiscount(0);
      }      
    })  
  }


  const incrementHandler = async(cartItems) => {


      if(cartItems.quantity >= cartItems.product.size[cartItems.selectedSize]) return;
       await updateCartItems({id:cartItems._id,quantity:cartItems.quantity + 1})
  
      await fetchItems();
    
  }
  
  
  const decrementHandler = async(cartItems) => {
    if(cartItems.quantity <= 1) return 1;
     await updateCartItems({id:cartItems._id,quantity:cartItems.quantity - 1})
    
    await fetchItems();
  }
  
  
  const removeHandler = async(cartItem) => {
    const option = {
      url :   `https://shopping-app-2ow9.onrender.com/api/v1/cart/deleteCartItem/${cartItem._id}`,
      method : 'DELETE',
      withCredentials : true,
      headers : {
        'Content-Type':'application/json'
      }
    }

    const {data} = await axios(option);
    if(data.success){
      toast.success(data.message)
    }else{
      toast.error('something went wrong')
    }

    await fetchItems();
    
  }
  
  


  useEffect(()=>{
    dispatch(calculatePrice())
  },[cartItems])
  
  return (
    isLoading?"Loading...":<>
    <Helmet title='Cart- Mern-Ecommerce-App'/>
    {cartItems.length == 0? <div className="m-auto text-center p-10 h-1/2 flex flex-col justify-between items-center gap-1 lg:gap-3 ">
      <FaExclamation className="text-red-500 lg:text-4xl"/>

      <h3 className="lg:text-lg">Cart Is Empty</h3>
      <Link to="/productlist" className="bg-orange-500 hover:bg-orange-600 text-white border-none text-xs px-1 py-3 cursor-pointer font-medium m-2 lg:w-40">Shop Now</Link>
    </div>:<div className='m-2 lg:m-6 bg-white'>
   
        
    <div className="hidden lg:block  px-4 w-full bg-white">
        <div className="grid grid-cols-[0.5fr,2fr,1fr,1fr,1fr,1fr] items-center gap-[75px] py-5 px-0 text-gray-400 text-lg font-normal">
          <p>Products</p>
          <p>Title</p>
          <p>Price</p>
          <p>Size</p>
          <p>Quantity</p> 
          <p>Remove</p>
        </div>
        <hr className='h-[1px] border-0 bg-gray-400' />
      </div>
      {
      
      cartItems.map((val, i)=>{
          return <CartItems key={i} cartItems={val} incrementHandler={incrementHandler} decrementHandler={decrementHandler} removeHandler={removeHandler}/>
        })
      }
        
        
  
    
    
    
    <div className="flex flex-col-reverse lg:flex-row justify-between my-14 lg:my-[100px] lg:px-4 w-full pb-5 bg-white">
            <div className="flex-1 flex-col gap-10 mt-5">
                <h1 className='pl-5 lg:text-lg font-medium'>Cart Total</h1>
                <div className=''>
                    <div className="flex justify-between py-2 lg:py-[15px] px-5">
                        <p>Subtotal</p>
                        <p >{subtotal}</p>
                    </div>
                    <hr />
                    <div className="flex justify-between py-2 lg:py-[15px] px-5">
                        <p>Coupon</p>
                        <p >{validCoupon?-(discount):'0'}</p>
                    </div>
                    <hr />
                    <div className="flex justify-between py-2 lg:py-[15px] px-5">
                        <p>Shipping Fee</p>
                        <p>{shippingCharge}</p>
                    </div>
                    <hr />
                    <div className="flex justify-between py-2 lg:py-[15px] px-5">
                        <p>Tax</p>
                        <p>{tax}</p>
                    </div>
                    <hr />
                    <div className="flex justify-between py-2 lg:py-[15px] px-5 font-medium">
                        <h3>Total</h3>
                        <h3>{total}</h3>
                    </div>
                </div>
                <button className='hover:bg-orange-700 ml-5 mt-5 lg:w-[255px] h-9 lg:h-[50px] outline-none  bg-orange-600 text-white p-2 text-sm lg:text-base font-normal cursor-pointer' onClick={()=> Navigate('/checkout/address')}>PROCEED TO CHECKOUT</button>
            </div>
            <div className=" flex flex-1 flex-col items-center text-base font-semibold gap-2 ">
               <form className='mt-5 lg:w-3/4 flex h-10 w-4/5 lg:h-14' onSubmit={submitHandler}>
                <input type="text" name="" placeholder='Enter Promo Code' className='w-3/4 pl-3 text-base lg:text-lg font-normal outline-none bg-gray-200' onChange={couponHandler}/>
                <button className='bg-orange-600 w-1/4 text-white font-normal text-base lg:text-lg hover:bg-orange-700'>Submit</button>
               </form>
                <p className='text-gray-400 font-normal text-sm lg:text-base'>If you have a promo code, Enter it here</p>
                <p className={`${showMessage?"block":"hidden"} ${validCoupon?'text-green-600':'text-red-600'} font-normal text-sm lg:text-base`}>{validCoupon?'coupon applied successfully':'invalid coupon code'}</p>
            </div>
    </div>
    
    <div className="w-full  bg-bg_footer_top mt-7">
      <ul className='mx-auto my-0 py-[10px] pb-[10px]'>
        <li className='inline-block w-[33%] text-center'><span className='mb-5 font-bold flex flex-col  items-center justify-center gap-3'><LiaExchangeAltSolid className='lg:h-9 lg:w-10'/><strong className='text-sm lg:text-base'>EASY EXCHANGE</strong></span></li>
        <li className='inline-block w-[33%] text-center'><span className='mb-5 font-bold flex flex-col  items-center justify-center gap-3'><FaHandHoldingHeart className='lg:h-9 lg:w-10'/><strong className='text-sm lg:text-base'>100% HANDPICKED</strong>
        </span></li>
        <li className='inline-block w-[33%] text-center'><span className='mb-5 font-bold flex flex-col  items-center justify-center gap-3'><FcApproval className='lg:h-9 lg:w-10'/><strong className='text-sm lg:text-base'>ASSURED QUALITY</strong>
        </span></li>
      </ul>
    </div>
    </div>}
    </>
  )
}

export default Cart