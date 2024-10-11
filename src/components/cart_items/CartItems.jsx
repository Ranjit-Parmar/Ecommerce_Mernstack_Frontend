import React from 'react'
import { Link } from 'react-router-dom'
import { RxCross1 } from 'react-icons/rx'


const CartItems = ({cartItems,incrementHandler,decrementHandler,removeHandler}) => {
  const {product} = cartItems;
  
 
  return (
    <>


      <div className='hidden lg:block lg:px-4'>
          <div className="grid grid-cols-[0.5fr,2fr,1fr,1fr,1fr,1fr] items-center gap-[75px] py-5 px-0 text-lg text-[17px] font-normal">
            <Link to={`/productdetail/${product._id}`}>
              <img src={product?.photo[0]?.url} alt="" className="h-[70px]" />
            </Link>
            <p className=''>{product.name}</p>
            <p>{Math.ceil(product.price-(product.price*15)/100)}</p>
            <p>{cartItems.selectedSize}</p>
            <div className="w-24 h-[50px] text-center flex justify-center items-center">
              <button className='text-2xl bg-orange-500 w-8 hover:bg-orange-700' onClick={()=>{decrementHandler(cartItems)}}>-</button>
              <span className='border-gray-400 border-2 w-8'>{cartItems.quantity}</span> 
              <button className='text-2xl bg-orange-500 w-8 hover:bg-orange-700' onClick={()=>{incrementHandler(cartItems)}}>+</button>
            </div>
            <div className='w-[15px] my-0 mx-10 cursor-pointer' onClick={removeHandler(cartItems)}><RxCross1/></div>
          </div>
          <hr />
        </div>

      {/* mobile devices */}

      <div className="block lg:hidden">
          <div className=' bg-white'>

            <div className=' relative'>            
            <div className='absolute right-1 top-1 z-10' onClick={removeHandler(cartItems)}><RxCross1/></div>
            <div className="flex gap-2 items-stretch justify-start flex-nowrap ">
            <Link to={`/productdetail/${product._id}`}>
                <img src={product?.photo[0]?.url} alt="" className='w-full' />
            </Link>  
                <div className="w-full flex flex-col justify-center items-stretch pt-2 pr-2 gap-2">
                  <h2 className=' text-base'>{product.name}</h2>
                  <div className='flex gap-3 font-medium'>
                    Qty:
                    <button className='bg-orange-500 w-6 text-md' onClick={()=>{decrementHandler(cartItems)}}>-</button>
                    <span>{cartItems.quantity}</span>
                    <button className='bg-orange-500 w-6 text-md' onClick={()=>{incrementHandler(cartItems)}}>+</button>
                  </div>
                    <div className='flex flex-col'>
                      <h3 className=''>price: <span className='text-sm font-normal'>{Math.ceil(product.price-(product.price*15)/100)}</span></h3>
                      <span className='text-sm font-normal line-through text-gray-400'>{product.price}</span>
                  </div>
                  <div className='flex gap-3'>
                    Size: <p className='text-center'>{cartItems.selectedSize}</p>
                  </div>
                </div>        
              </div> 
              </div>
          </div>
          <hr className='mt-3'/>
      </div>
    </>
  )
}

export default CartItems