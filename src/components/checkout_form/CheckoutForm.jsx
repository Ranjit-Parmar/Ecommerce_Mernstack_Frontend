import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import { useCreateOrderMutation } from '../../redux/Api/orderApi.js';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useContext, useEffect } from 'react';
import { ShopContext } from '../../context/ShopContext.jsx';
import { useDeleteCartItemsMutation } from '../../redux/Api/cartApi.js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const Navigate = useNavigate();
  const [createOrder] = useCreateOrderMutation();
  const [deleteCartItem] = useDeleteCartItemsMutation();
  const {cartItems, shippingInfo, shippingCharge  } = useSelector((state)=>state.cartReducer)
  const {user} = useSelector((state)=>state.userReducer);

  const {addToCartDiscount} = useContext(ShopContext);
  
  useEffect(()=>{
    if(cartItems.length == 0){
      Navigate('/cart', {replace:true})
    }
  },[cartItems])

  const handleSubmit = async (event) => {
    
    event.preventDefault();

    if (!stripe || !elements) {
      
      return;
    }

    const { paymentIntent, error } = await stripe.confirmPayment({
        elements,
        confirmParams: { return_url: window.location.origin },
        redirect: "if_required",
      });

    

    if (error) {
     if(error.message === 'A processing error occurred.'){
        toast.error('Something went wrong! Please try again.');
        Navigate('/checkout/address/order-summery');
      }

    } else {
      
        if(paymentIntent.status === 'succeeded'){
            cartItems.forEach(async(val)=>{
              const order = {
                                      shippingInfo:{
                                          address: shippingInfo.address,
                                          city: shippingInfo.city,
                                          pincode: Number(shippingInfo.pincode),
                                          state: shippingInfo.state,
                                          mobile: Number(shippingInfo.mobile)
                                      },
                                      orderItems:{
                                        quantity : Number(val.quantity),
                                        size : val.selectedSize,
                                        product : val.product._id
                                      },
                                      paymentInfo : {
                                        id : paymentIntent.id,
                                        status : paymentIntent.status
                                      },
                                      user:user._id,
                                      itemPrice: Math.ceil((val.product.price - (val.product.price * 0.15)) * val.quantity),
                                      discount: Number(addToCartDiscount),
                                      taxPrice: Math.ceil((((val.product.price - (val.product.price * 0.15))) * val.quantity) * 0.18),
                                      shippingPrice: shippingCharge,
                                      totalPrice: Math.ceil((((val.product.price - (val.product.price * 0.15)) * val.quantity) + ((((val.product.price - (val.product.price * 0.15))) * val.quantity) * 0.18) + shippingCharge) - addToCartDiscount )
                                  }

                                  
                                try {
                                  const orderRes = await createOrder(order);
                                  if(orderRes?.data?.success){
                                     await deleteCartItem(val?._id);
                                    Navigate('/payment_success', {state : {'paymentSuccess':true}})
                                    toast.success("Order placed successfully")
                                                         
                                  }else{
                                    Navigate('/payment_fail', {state : {'paymentFail':true}});
                                    
                                  }
                                } catch (error) {
                                  console.log("create order error occured", error);
                                }
                              
            })
             
        }else{
            console.log('something went wrong');
        }
    }
  };

  return (
    <div className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">
    <form onSubmit={handleSubmit} className=' lg:w-1/3 m-auto mt-28 h-1/2'>
      <PaymentElement />
      <button disabled={!stripe} className='w-full mt-3 bg-green-500 hover:bg-green-600 h-10 font-medium text-base text-white '>Submit</button>
    </form>
    </div>
  )
};

export default CheckoutForm;