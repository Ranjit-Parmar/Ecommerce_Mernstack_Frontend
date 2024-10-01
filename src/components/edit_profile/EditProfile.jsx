import React, { useEffect, useState } from 'react'
import { FiUpload } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useLoadUserQuery, useUpdateUserMutation } from '../../redux/Api/userApi'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { RxCross1 } from 'react-icons/rx'
import { Helmet } from 'react-helmet-async'
import Loader from '../Loader/Loader'

const EditProfile = () => {
    const Navigate = useNavigate()

    const [updateUser] = useUpdateUserMutation();
    const { user, isLoading } = useSelector((state) => state.userReducer);
    // const { data, isLoading, isError } = useLoadUserQuery();


    const { name, email, role, photo } = user || {
        name: '',
        email: '',
        role: '',
        photo: []
    }
    const [userName, setUserName] = useState(name);
    const [userEmail, setUserEmail] = useState(email);
    const [userPassword, setUserPassword] = useState('');
    const [userRole, setUserRole] = useState(role);
    const [userPhoto, setUserPhoto] = useState(photo);

    useEffect(() => {
        if (user) {
            setUserName(user.name);
            setUserEmail(user.email);
            setUserRole(user.role);
            setUserPhoto(user.photo?.map((val) => val.url));
        }
    })

    

    const imageChangeHandler = (e) => {

        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (reader.readyState === 2) {
                setUserPhoto(reader.result);
            }
        }
        
    }

    

    const submitHandler = async (e) => {

        e.preventDefault();

        const formData = new FormData();

        formData.append('name', userName);
        formData.append('email', userEmail);
        formData.append('password', userPassword);
        formData.append('role', userRole);
        formData.append('photo', userPhoto);

        const res = await updateUser({ id: user?._id, updateUserData: formData });
        if (res.data.success) {
            const message = res.data.message;
            toast.success(message);
            Navigate('/')
        } else {
            toast.error('something went wrong')
            console.log(res.error);

        }
    }

    const removePreviewImage = (item) => {
        setUserPhoto(userPhoto.filter((val) => val === item))
        setUserPhoto('')
    }

    



    return (
        isLoading ? <Loader/> : <>
        <Helmet title="Edit Profile- Mern-Ecommerce-App"/>
            <div className='m-2 lg:m-6'>
                <form onSubmit={submitHandler} className="lg:w-1/2 bg-white m-auto py-5 lg:py-10 px-6 lg:px-[30px] shadow-lg">
                    <h1 className='my-5 mx-0 text-lg lg:text-xl font-medium'>Update Profile</h1>
                    <div className="flex flex-col gap-3 lg:gap-[20px] mt-[30px]">
                        <input type="text" name='name' placeholder='Enter Your Name' className='h-14 lg:h-[72px] w-full pl-5 border-[1px] border-gray-400 outline-none lg:text-lg' value={userName} onChange={(e) => { setUserName(e.target.value) }} />
                        <input type="email" name='email' placeholder='Enter Your Email' className='h-14 lg:h-[72px] w-full pl-5 border-[1px] border-gray-400 outline-none lg:text-lg' value={userEmail} onChange={(e) => { setUserEmail(e.target.value) }} />
                        <input type="password" name='password' placeholder='Enter Your password' className='h-14 lg:h-[72px] w-full pl-5 border-[1px] border-gray-400 outline-none lg:text-lg' value={userPassword} onChange={(e) => { setUserPassword(e.target.value) }} />
                        {user && user.role === 'admin' ? <div className='h-14 lg:h-[72px] w-full border-[1px] border-gray-400 outline-none font-normal  text-opacity-1'>
                            <select name="role" id="" className='w-full h-full pl-5 text-lg outline-none' value={userRole} onChange={(e) => { setUserRole(e.target.value) }}>
                                <option value="">Role</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                        </div> : ""}
                        <div className='flex items-center justify-center h-14 lg:h-[72px] w-full border-[1px] border-gray-400 outline-none font-normal text-opacity-1'>
                            <label htmlFor="file-upload" className='w-full h-full flex justify-between items-center px-5 text-lg '>Upload Profile<FiUpload className='text-4xl' /></label>
                            <input type="file" name="photo" id="file-upload" className='hidden' onChange={imageChangeHandler} />
                        </div>
                    </div>
                    {userPhoto?.length > 0 ? <div className='relative h-52 w-44 hover:scale-105 duration-200 mt-6 mx-auto'>
                            <RxCross1 className='absolute right-0 hover:text-white hover:bg-red-500' onClick={() => { removePreviewImage(userPhoto) }} />
                            <img src={userPhoto} alt="" className='h-full w-full' />
                        </div>
                    : ""}
                    <button className='w-full h-14 lg:h-[72px] text-white bg-orange-500 hover:bg-orange-600 mt-5 lg:mt-[30px] border-none tracking-wider text-lg lg:text-2xl font-medium cursor-pointer' >Update</button>

                </form>

            </div>
        </>
    )
}

export default EditProfile