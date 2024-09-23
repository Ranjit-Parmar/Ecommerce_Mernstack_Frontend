import React, { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { FaExclamation } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

const OrderCancel = () => {

  const Navigate = useNavigate();
  const location = useLocation();

 
  const {cartItems} = useSelector((state)=>state.cartReducer);
  useEffect(()=>{

if(location?.state === null){
  Navigate('/cart', {replace:true});
}
  },[cartItems])
  return (
    <>
    <HelmetProvider>
     <Helmet>
          <html lang="en" />
          <title>Order Failed- Mern-Ecommerce-App</title>
          <meta
            name="description"
            content="Order Failed- Mern Ecommerce Project For Online Shopping "
            />
        </Helmet>
    <div className="m-auto text-center p-10 h-1/2 flex flex-col justify-between items-center gap-3 ">
      <FaExclamation className="text-red-500 text-4xl"/>

      <h3 className="text-lg">Order has not been placed. Please try again</h3>
      <Link to="/checkout/address/order-summery" className="bg-orange-500 hover:bg-orange-600 text-white border-none px-1 py-3 cursor-pointer font-medium m-2 w-40">Order Summery</Link>
    </div>
  </HelmetProvider>
    </>
  );
};

export default OrderCancel;