import React from 'react'
import { Link } from 'react-router-dom'
import { CiUser } from 'react-icons/ci'
import { IoMdAddCircle } from 'react-icons/io'
import { AiOutlineProduct, AiOutlineBorderlessTable } from 'react-icons/ai'
import { RiCoupon2Line } from 'react-icons/ri'



const Aside = () => {

  return (
    <>
    <div className="py-4 text-gray-500 ">
                <Link to="/admin" className="text-gray-900 ">
                    <img src="../../src/assets/logo.png" alt="" className="xl:w-[90px] lg:pl-6 w-[80px]" />
                </Link>
                <ul className="mt-8 h-96 lg:h-auto  flex flex-col justify-evenly">
                    <li className="">
                        <Link to="" className='lg:px-6 lg:py-4 inline-flex justify-center lg:justify-normal items-center w-full text-md font-semibold duration-150 hover:text-orange-600'>
                            <AiOutlineProduct className='text-2xl '/>
                            <span className='ml-4 hidden lg:block'>Products</span>
                        </Link>
                    </li>
                    <li>
                    <Link to="add-products" className='lg:px-6 lg:py-4 inline-flex justify-center lg:justify-normal items-center w-full text-md font-semibold  duration-150 hover:text-orange-600'>
                            <IoMdAddCircle className='text-2xl '/>
                            <span className='ml-4 hidden lg:block'>Add Products</span>
                        </Link>
                    </li>
                    <li>
                    <Link to="users" className='lg:px-6 lg:py-4 inline-flex justify-center lg:justify-normal items-center w-full text-md font-semibold  duration-150 hover:text-orange-600'>
                            <CiUser className='text-2xl '/>
                            <span className='ml-4 hidden lg:block'>Users</span>
                        </Link>
                    </li>
                    <li>
                    <Link to="coupons" className='lg:px-6 lg:py-4 inline-flex justify-center lg:justify-normal items-center w-full text-md font-semibold  duration-150 hover:text-orange-600'>
                            <RiCoupon2Line className='text-2xl '/>
                            <span className='ml-4 hidden lg:block'>Coupons</span>
                        </Link>
                    </li>
                    <li>
                    <Link to="orders" className='lg:px-6 lg:py-4 inline-flex justify-center lg:justify-normal items-center w-full text-md font-semibold  duration-150 hover:text-orange-600'>
                            <AiOutlineBorderlessTable className='text-2xl '/>
                            <span className='ml-4 hidden lg:block'>Orders</span>
                        </Link>
                    </li>
                </ul>
                
            </div>
    </>
  )
}

export default Aside