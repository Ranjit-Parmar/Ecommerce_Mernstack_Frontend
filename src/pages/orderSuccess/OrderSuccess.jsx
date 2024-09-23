import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CiCircleCheck } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../../redux/reducers/cartReducer";
import { Helmet, HelmetProvider } from "react-helmet-async";


const OrderSuccess = () => {

  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const location = useLocation();
  const {cartItems} = useSelector((state)=>state.cartReducer);

  useEffect(()=>{
    if(location?.state === null){
      Navigate('/cart', {replace:true});
    }
    dispatch(resetCart());
    },[cartItems])

  return (
    <>
    <HelmetProvider>
     <Helmet>
          <html lang="en" />
          <title>Order Placed Success- Mern-Ecommerce-App</title>
          <meta
            name="description"
            content="Order Placed  Success- Mern Ecommerce Project For Online Shopping "
            />
        </Helmet>
    
    <div className="m-auto text-center p-10 h-1/2 flex flex-col justify-between items-center gap-3 ">
      <CiCircleCheck  className="text-green-500 text-4xl"/>

      <h3 className="text-lg">Your Order has been Placed successfully </h3>
      <Link to="/my-order" className="bg-orange-500 hover:bg-orange-600 text-white border-none px-1 py-3 cursor-pointer font-medium m-2 w-40">View Orders</Link>
    </div>
  </HelmetProvider>
    </>
  );
};

export default OrderSuccess;