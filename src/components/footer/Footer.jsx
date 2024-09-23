import React from 'react'

const Footer = () => {
  return (
    <>
   <div className='w-full mt-8 lg:h-[350px]'>
    <div className='p-5 lg:p-8 border-2 bg-bg_footer  w-full m-auto h-full flex flex-row-reverse lg:flex-col lg:gap-5 justify-center lg:items-center '>
        <div className="text-gray-400 relative lg:w-1/2 lg:h-36 flex flex-col justify-center items-center lg:gap-3 lg:pr-2 lg:pl-0">
          <h1 className="font-medium  text-center">Get Exclusive Offers On Your Email</h1>
          <p className="text-sm">subscribe to our newsletter and stay updated</p>
          <div className="mt-4 lg:mt-0">
            <input type="email" className='outline-none lg:rounded-l-full lg:rounded-none rounded-full h-8 lg:h-full pl-2 bg-white text-black'/>
            <button className='absolute  bottom-[24%] left-[30%] lg:static rounded-full lg:rounded-none lg:rounded-r-full lg:h-full bg-orange-500 hover:bg-orange-600 p-1 text-white'>Subscribe</button>
          </div>
        </div>
      <div className='grid grid-cols-1 lg:grid-cols-5 lg:text-base text-sm w-[95%] py-4'>
          <img src="../../src/assets/logo.png" alt="" className='w-10 lg:w-16 pt-2 lg:pt-0 pl-2 lg:pb-0 lg:pl-0'/>
        <div className='h-full pb-2 pl-2 lg:pb-0 lg:pl-0'>

          <ul className='flex flex-col gap-2 lg:gap-4 mt-4 text-gray-400 leading-4'>
          <li><a href="#" className='hover:font-semibold'>Terms & Conditions</a></li>
        <li><a href="#" className='hover:font-semibold'>Return & Refund Policy</a></li>
            <li><a href="#" className='hover:font-semibold'>Join Our Team</a></li>
          </ul>
          
        </div>
        <div className='h-full pb-2 pl-2 lg:pb-0 lg:pl-0 text-gray-400'>
          <h3 className='flex flex-col lg:gap-4 mt-4'>Help</h3>
          <ul className='flex flex-col gap-2 lg:gap-4 mt-4 text-gray-400 leading-4'>
            <li><a href="#" className='hover:font-semibold'>Track Your Order</a></li>
            <li><a href="#" className='hover:font-semibold'>Returns</a></li>
            <li><a href="#" className='hover:font-semibold'>Cancellations</a></li>
            <li><a href="#" className='hover:font-semibold'>Customer Care</a></li>
          </ul>
        </div>
        <div className='h-full pb-2 pl-2 lg:pb-0 lg:pl-0 text-gray-400'>
          <h3 className='flex flex-col lg:gap-4 mt-4'>Shop by</h3>
          <ul className='flex flex-col gap-2 lg:gap-4 mt-4 text-gray-400 leading-4'>
            <li><a href="#" className='hover:font-semibold'>Men</a></li>
            <li><a href="#" className='hover:font-semibold'>Women</a></li>
            <li><a href="#" className='hover:font-semibold'>Kids</a></li>
            <li><a href="#" className='hover:font-semibold'>Stores</a></li>
          </ul>
        </div>
        <div className='h-full pb-2 pl-2 lg:pb-0 lg:pl-0 text-gray-400'>
          <h3 className='flex flex-col lg:gap-4 mt-4'>Keep In Touch</h3>
          <ul className='flex gap-2 lg:gap-4 mt-4 text-gray-400 leading-4'>
            <li><img src="../../src/assets/facebook.png" alt="" className='h-5 lg:h-full'/></li>
            <li><img src="../../src/assets/twitter.png" alt="" className='h-5 lg:h-full'/></li>
            <li><img src="../../src/assets/youtube.png" alt="" className='h-5 lg:h-full'/></li>
            <li><img src="../../src/assets/instagram.png" alt="" className='h-5 lg:h-full'/></li>
          </ul>
        </div>        
      </div>
    </div>
  
   </div>
    </>
  )
}

export default Footer