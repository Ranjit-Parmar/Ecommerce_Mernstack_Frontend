import React from 'react'

const Category_card = ({val,gender}) => {
    
    return (
        <>
            <div className='w-[135px] lg:w-40 hover:scale-95 duration-[.4s] shadow-lg'>
            <img src={gender=='male'?val.img1:gender=='female'?val.img2:gender==='kid'?val.img3:val.img} alt="" className='w-full h-[150px] lg:h-[200px]' />
                <div className='flex flex-col justify-center items-center bg-gradient-to-t from-orange-400 via-red-300 to-yellow-100'>
                    <h3 className=' text-gray-500 hover:text-black'>{val.name}</h3>
                    <span className=' text-gray-500 hover:text-black'>{val.discount}</span>
                    <p className=' text-gray-500 hover:text-black'>{val.task}</p>
                </div>
            </div>
        </>
    )
}

export default Category_card