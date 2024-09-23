import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import axios from 'axios';
import CheckoutForm from '../../components/checkout_form/CheckoutForm';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Helmet, HelmetProvider } from 'react-helmet-async';







const Payment = () => {
  
  
  const location = useLocation();
  const Navigate = useNavigate();
  const {cartItems} = useSelector((state)=>state.cartReducer);
  const clientSecret = location?.state;
  const stripePublishableKey = useLoaderData();

  const stripePromise = loadStripe(stripePublishableKey);
  
  
  useEffect(()=>{
    if (!clientSecret) {
     Navigate("/checkout/address/order-summery", {replace:true})
    }
  },[cartItems, clientSecret])

  return (
    <>
    <HelmetProvider>
    <Helmet>
          <html lang="en" />
          <title>Payment- Mern-Ecommerce-App</title>
          <meta
            name="description"
            content="Payment-Gateway- Mern Ecommerce Project For Online Shopping "
            />
        </Helmet>
    <Elements stripe={stripePromise} options={{
      clientSecret,
    }}>
      <CheckoutForm />
    </Elements>
      </HelmetProvider>
    </>
  );
};

export default Payment