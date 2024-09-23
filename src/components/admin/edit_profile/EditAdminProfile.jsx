import React, { useState } from 'react'
import { useUpdateUserMutation } from '../../../redux/Api/userApi'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditAdminProfile = () => {
    const {id} = useParams();
    const {state} = useLocation();
    const [user, setUser] = useState(state || "");
    const Navigate = useNavigate();
    
    const [updateUser] = useUpdateUserMutation();    
    
    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('role',user);

        const {data} = await updateUser({id,updateUserData:formData});

        if(data.success){
            toast.success(data.message);
            Navigate('/admin/users')
        }else{
            toast.error('something went wrong')
        }       

    }
    
    
  return (
    <>
   
    <div className='m-2 lg:m-6'>
         <form onSubmit={submitHandler} className="lg:w-1/2 bg-white m-auto py-5 lg:py-10 px-6 lg:px-[30px] shadow-lg">
             <h1 className='my-5 mx-0 text-lg lg:text-xl font-medium'>Update User Role</h1>
             <div className="flex flex-col gap-3 lg:gap-[20px] mt-[30px]">
                 <div  className='h-14 lg:h-[72px] w-full border-[1px] border-gray-400 outline-none font-normal  text-opacity-1'>
                 <select name="role" id="" className='w-full h-full pl-5 text-lg outline-none' value={user} onChange={(e)=>{
                    setUser(e.target.value);
                 }}>
                     <option value="">Role</option>
                     <option value="admin">Admin</option>
                     <option value="user">User</option>
                 </select>
                 </div>
             </div>
             <button className='w-full h-14 lg:h-[72px] text-white bg-orange-500 hover:bg-orange-600 mt-5 lg:mt-[30px] border-none tracking-wider text-lg lg:text-2xl font-medium cursor-pointer'>Update</button>
         
         </form>
 
     </div>
     </>
  )
}

export default EditAdminProfile