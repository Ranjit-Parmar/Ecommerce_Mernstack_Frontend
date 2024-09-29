import React, { useRef, useState } from 'react'
import { useDeleteOrderMutation, useGetAllOrdersQuery, useUpdateOrderMutation } from '../../redux/Api/orderApi'
import toast from 'react-hot-toast';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Helmet } from 'react-helmet-async';
import Loader from '../../components/Loader/Loader';

const Orders = () => {

    const [orderStatus, setOrderStatus] = useState('');
    const [duration, setDuration] = useState('');
    const [search, setSearch] = useState('');
    const inputRef = useRef();
    
    const submitHandler = (e) => {
        e.preventDefault();
        setSearch(inputRef.current.value);
    }
    
    
    const {data, isLoading, isError} = useGetAllOrdersQuery({orderStatus,duration,search});
    const [updateOrder] = useUpdateOrderMutation();
    const [deleteOrder] = useDeleteOrderMutation();

    const changleHandler = async(e,id) => {
       
        const res = await updateOrder({orderStatus:e.target.value, id:id})
        if(res.data.success){
            toast.success('orderStatus updated successfully')
        }
        if(res.error){
            console.log(error);  
        }   
    }

    const deleteHandler = async (id) => {
        const res = await deleteOrder(id);
        if(res.data.success){
            toast.success(res.data.message);
        }else{
            toast.message('something went wrong');
        };
        
    }
    
    
    return (
        <>
            <Helmet title="Orders- Mern-Ecommerce-App"/>
            <h1 className="my-6 text-lg font-medium">Orders</h1>
            <div className="min-w-0 rounded-lg overflow-hidden bg-white  shadow-sm rounded-t-lg rounded-0 mb-4">
                    <div className="p-4 ">
                        <div className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">

                        <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                            <select className="w-full h-12 border bg-gray-100 px-2 py-1 text-sm focus:outline-none rounded-md focus:bg-white focus:border-gray-200 border-gray-200 focus:shadow-none leading-5" onChange={(e)=>{
                                setOrderStatus(e.target.value);
                            }}>
                                <option value="" hidden="">Status</option>
                                <option value="delivered">Delivered</option>
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="cancel">Cancel</option>
                            </select>
                        </div>
                            
                        <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                            <select className="w-full h-12 border bg-gray-100 px-2 py-1 text-sm focus:outline-none rounded-md focus:bg-white focus:border-gray-200 border-gray-200 focus:shadow-none leading-5" onChange={(e)=>{
                                setDuration(e.target.value);
                            }} >
                                <option value="" hidden="">Filter</option>
                                <option value="lastFiveDaysOrder">Last 5 days orders</option>
                                <option value="lastSevenDaysOrder">Last 7 days orders</option>
                                <option value="lastFifteenDaysOrder">Last 15 days orders</option>
                            </select>
                        </div>

                            <form className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow  grid gap-4 lg:gap-0 xl:gap-0 md:gap-0 md:flex xl:flex"  onSubmit={submitHandler}>
                                
                            <input className="w-full h-12  px-3 py-1 text-sm focus:outline-none flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow rounded-md md:rounded-r-none lg:rounded-r-none xl:lg:rounded-r-none md:rounded-l-md lg:rounded-l-md xl:rounded-l-md bg-gray-100 focus:bg-white" type="search" ref={inputRef} name="search" placeholder="Enter Order Id" />
                               
                            <div className="flex items-center flex-grow-0 md:flex-grow-1 lg:flex-grow-1 xl:flex-grow-1">
                            
                                <button className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 font-medium focus:outline-none px-4 py-2 md:rounded-r-md lg:rounded-r-md xl:rounded-r-md text-sm text-white bg-orange-600 border border-transparent hover:bg-orange-700 h-12 w-full" >Search</button>
                           
                            </div>

                            </form>


                        </div>
                            
                    </div>
                </div>
    {isLoading?<Loader/>:<div className="w-full overflow-x-auto">
                    <table className="w-full whitespace-nowrap">
                        <thead className="text-xs font-semibold tracking-wide text-left uppercase bg-black text-white">
                            <tr>
                                <td className="px-4 py-2">id</td>
                                <td className="px-4 py-2">time</td>
                                <td className="px-4 py-2">customer</td>
                                <td className="px-4 py-2">price</td>
                                <td className="px-4 py-2">status</td>

                                <td className="px-4 py-2 text-right pr-14">actions</td>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                        {data?.getAllOrders?.map((val,i)=>{
                            return (
                            <tr key={i} className="">

                                <td className="px-4 py-2">
                                    <div className="text-sm">
                                        <span>#{val?._id}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-2">
                                    <span className="text-sm">{val?.createdAt}</span>
                                </td>
                                <td className="px-4 py-2">
                                    <span className="text-sm">{val?.user?.email}</span>
                                </td>
                                <td className="px-4 py-2">
                                    <span className="text-sm font-semibold">Rs. {val?.totalPrice}</span>
                                </td>
                                <td className="px-4 py-2">
                                    <span className={`text-sm ${val?.orderStatus === 'processing'?"text-blue-600":val?.orderStatus === 'delivered'?"text-green-600":val?.orderStatus === 'pending'?"text-yellow-500":val?.orderStatus === 'cancel'?"text-red-600":""} `}>{val?.orderStatus}</span>
                                </td>

                                <td className="px-4 py-2">

                                <div className="flex justify-end text-right">
                                    <button className="p-2 cursor-pointer text-gray-400 hover:text-orange-600 focus:outline-none" onClick={()=>{deleteHandler(val?._id)}}><p className="text-xl"><RiDeleteBin6Line /></p></button>
                                        
                                    <select className='rounded-md text-sm float-right' value={val?.orderStatus} onChange={(e)=>{changleHandler(e,val._id)}}>
                                        <option value="delivered">Delivered</option>
                                        <option value="pending">Pending</option>
                                        <option value="processing">Processing</option>
                                        <option value="cancel">Cancel</option>
                                    </select>
                                    </div>

                                </td>

                            </tr>
                            )
                        })}

                        </tbody>

                    </table>
                </div>


               }
            
        </>
    )
}

export default Orders