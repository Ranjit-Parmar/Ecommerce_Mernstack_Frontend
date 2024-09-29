import React, { useRef, useState } from 'react'
import { MdEdit } from 'react-icons/md'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useDeleteUserMutation, useGetAllUsersQuery } from '../../redux/Api/userApi'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Helmet } from 'react-helmet-async'
import profileIcon from '../../assets/profile-icon.png';
import Loader from '../../components/Loader/Loader'


const Users = () => {

    const [search, setSearch] = useState('');
    const [selectUserRole, setSelectUserRole] = useState('');
    

    const inputRef = useRef()
    const Navigate = useNavigate();

    const {user} = useSelector((state)=>state.userReducer);
    const {data, isLoading, isError} = useGetAllUsersQuery({search,selectUserRole});
    const [deleteUser] = useDeleteUserMutation();
   

    const submitHandler = async (e) => {
        e.preventDefault();
        setSearch(inputRef.current.value);
    }

    const deleteHandler = async (userId) => {
        const {data} = await deleteUser(userId);
        if(data.success){
            toast.success(data.message);
        }else{
            toast.error('something went wrong');
        }
        
        
    }



    return (
        isLoading?<Loader/>:<>
        <Helmet title="Users- Mern-Ecommerce-App"/>
            <h1 className="my-6 text-lg font-medium">Users</h1>

            <div className="min-w-0 rounded-lg overflow-hidden bg-white  shadow-sm rounded-t-lg rounded-0 mb-4">
                <div className="p-4 ">
                    <div className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex" >


                        <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                            <select className="w-full h-12 border bg-gray-100 px-2 py-1 text-sm focus:outline-none rounded-md focus:bg-white focus:border-gray-200 border-gray-200 focus:shadow-none leading-5" onChange={(e)=>{setSelectUserRole(e.target.value)}}>
                                <option  value="" hidden="">Role</option>
                                <option  value="admin">Admin</option>
                                <option  value="user">User</option>
                            </select>
                        </div>

                        <form className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow  grid gap-4 lg:gap-0 xl:gap-0 md:gap-0 md:flex xl:flex"  onSubmit={submitHandler}>

                            <input className="w-full h-12  px-3 py-1 text-sm focus:outline-none flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow rounded-md md:rounded-r-none lg:rounded-r-none xl:lg:rounded-r-none md:rounded-l-md lg:rounded-l-md xl:rounded-l-md bg-gray-100 focus:bg-white" type="search" name="search" ref={inputRef} placeholder="Search Users" />
                                
                            <div className="flex items-center flex-grow-0 md:flex-grow-1 lg:flex-grow-1 xl:flex-grow-1">
                            
                                <button className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 font-medium focus:outline-none px-4 py-2 md:rounded-r-md lg:rounded-r-md xl:rounded-r-md text-sm text-white bg-orange-600 border border-transparent hover:bg-orange-700 h-12 w-full" >Search</button>
                         
                            </div>

                            </form>

                    </div>
                </div>
            </div>

           
                <div className="w-full overflow-x-auto">
                    <table className="w-full whitespace-nowrap">
                        <thead className="text-xs font-semibold tracking-wide text-left uppercase bg-black text-white">
                            <tr>
                                <td className="px-4 py-2">Profile</td>
                                <td className="px-4 py-2">Name</td>
                                <td className="px-4 py-2">Email</td>
                                <td className="px-4 py-2">Role</td>
                                <td className="px-4 py-2">status</td>

                                <td className="px-4 py-2 text-right">actions</td>
                            </tr>
                        </thead>
                        {data?.allUsers?.map((val,i)=>{
                return (
                        <tbody key={i}  className="bg-white">
                            
                            <tr>

                                <td className="px-4 py-2">
                                    <div className=" rounded-full  w-10 h-10 mr-2 md:block bg-gray-50">
                                        <img className="object-cover w-full h-full rounded-full" src={val?.photo?.map((pro)=>pro.url) || profileIcon} alt="product" />
                                    </div>
                                </td>
                                <td className="px-4 py-2">
                                    <span className="text-sm">{val.name}</span>
                                </td>
                                <td className="px-4 py-2">
                                    <span className="text-sm">{val.email}</span>
                                </td>
                                <td className="px-4 py-2">
                                    <span className="text-sm">{val.role}</span>
                                </td>
                                <td className="px-4 py-2">
                                    <span className={`text-sm ${val._id === user?._id?"text-green-500":"text-red-500"} `}>{val._id === user?._id ?'Active' : 'InActive'}</span>
                                </td>

                                <td className="px-4 py-2">
                                    <div className="flex justify-end text-right">
                                        <button className="p-2 cursor-pointer text-gray-400 hover:text-orange-600 focus:outline-none" onClick={()=>{deleteHandler(val._id)}}><p className="text-xl"><RiDeleteBin6Line /></p></button>
                                        <button className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none" onClick={()=>{ Navigate(`../edit-admin-profile/${val._id}`,{state:val.role})}}>
                                            <p className="text-xl"><MdEdit /></p>
                                        </button>
                                    </div>
                                </td>

                            </tr>
                        </tbody>
                            )
                        })}


                    </table>
                </div>


               
            
            
        </>
    )
}

export default Users