import React, { useRef, useState } from 'react'
import { MdEdit } from 'react-icons/md'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useDeleteCouponMutation, useGetAllCouponQuery } from '../../redux/Api/couponApi'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async'
import Loader from '../../components/Loader/Loader'

const Coupon = () => {

    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');
    const inputRef = useRef();
    const Navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        setSearch(inputRef.current.value);
    }

    
    const { data, isLoading, isError } = useGetAllCouponQuery({ filter, search });
    const [deleteCoupon] = useDeleteCouponMutation()


    const deleteCouponHandler = async(couponId) => {
           const {data} = await deleteCoupon(couponId);
           if(data.success){
            toast.success(data.message);
           }else{
            toast.error('something went wrong');
           }
    }


    return (
        isLoading ? <Loader/> :  <>
        <Helmet title="Coupon- Mern-Ecommerce-App"/>
            <h1 className="my-6 text-lg font-medium">Coupons</h1>

            <div className="min-w-0 rounded-lg overflow-hidden bg-white  shadow-sm rounded-t-lg rounded-0 mb-4">
                <div className="p-4 ">
                    <div className="py-3 grid gap-4 lg:gap-6 xl:gap-2 md:flex xl:flex">


                        <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                            <select name="" id="" className="w-full h-12 border bg-gray-100 px-2 py-1 text-sm focus:outline-none rounded-md focus:bg-white focus:border-gray-200 border-gray-200 focus:shadow-none leading-5" onChange={(e) => {
                                setFilter(e.target.value);
                            }} >
                                <option value="" hidden="">Status</option>
                                <option value="active">Active</option>
                                <option value="expire">Expired</option>
                            </select>
                        </div>

                        <form className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow  grid gap-4 lg:gap-0 xl:gap-0 md:gap-0 md:flex xl:flex" onSubmit={submitHandler}>
                            
                                <input className="w-full h-12  px-3 py-1 text-sm focus:outline-none flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow rounded-md md:rounded-r-none lg:rounded-r-none xl:lg:rounded-r-none md:rounded-l-md lg:rounded-l-md xl:rounded-l-md bg-gray-100 focus:bg-white" type="search" ref={inputRef} name="search" placeholder="Search Coupon" />
                           
                            <div className="flex items-center flex-grow-0 md:flex-grow-1 lg:flex-grow-1 xl:flex-grow-1">
                                
                                    <button className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 font-medium focus:outline-none px-4 py-2 md:rounded-r-md lg:rounded-r-md xl:rounded-r-md text-sm text-white bg-orange-600 border border-transparent hover:bg-orange-700 h-12 w-full" >Search</button>
                                
                            </div>

                        </form>
                                                    
                            <div className="items-center gap-2 flex-grow-0 md:flex-grow-1 lg:flex-grow-1 xl:flex-grow-1">
                                    <button className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 font-medium focus:outline-none px-6 py-2 md:rounded-md lg:rounded-md xl:rounded-md text-sm text-white bg-orange-600 border border-transparent hover:bg-orange-700 h-12 w-full" onClick={()=>{Navigate('../create-coupon', {state:'create'})}}>Add</button>
                            </div>

                    </div>

                </div>
            </div>
            
                <div className="w-full overflow-x-auto">
                    <table className="w-full whitespace-nowrap">
                        <thead className="text-xs font-semibold tracking-wide text-left uppercase bg-black text-white">
                            <tr>
                                <td className="px-4 py-2">Name</td>
                                <td className="px-4 py-2">Discount</td>
                                <td className="px-4 py-2">Status</td>
                                <td className="px-4 py-2">Expire</td>
                                <td className="px-12 py-2 text-right">actions</td>
                            </tr>
                        </thead>
                        {<tbody className="bg-white divide-y divide-gray-100">

                            {data?.getAllCoupons?.map((val,i)=>{
                                return (
                                    <tr key={i} className="">
                                <td className="px-4 py-2">
                                    <span className="text-sm">{val.code}</span>
                                </td>
                                <td className="px-4 py-2">
                                    <span className="text-sm">Rs. {val.discount}</span>
                                </td>
                                <td className="">
                                    <span className={`text-sm p-1 rounded-md ${Date.parse(val.expire) > Date.now()?"bg-green-400":"bg-red-400"}`}>{Date.parse(val.expire) > Date.now()?"Active":"Expired"}</span>
                                </td>
                                <td className="px-4 py-2">
                                    <span className="text-sm">{val.expire}</span>
                                </td>
                                <td className="px-4 py-2">
                                    <div className="flex justify-end text-right">
                                        <button className="p-2 cursor-pointer text-gray-400 hover:text-orange-600 focus:outline-none" onClick={()=>{deleteCouponHandler(val._id)}}><p className="text-xl"><RiDeleteBin6Line /></p></button>
                                        <button className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none" onClick={()=>{Navigate(`../update-coupon/${val._id}`, {state:'update'})}}><p className="text-xl"><MdEdit /></p></button>
                                    </div>
                                </td>

                            </tr>
                                )
                            })}

                        </tbody>}

                    </table>
                </div>
           
        </>
    )
}

export default Coupon