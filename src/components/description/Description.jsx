import React, { useState } from 'react'
import { useGetProductDetailsQuery } from '../../redux/Api/productApi'
import { useParams } from 'react-router-dom'
import Rating from '@mui/material/Rating';
import { Box } from '@mui/material';
import Loader from '../Loader/Loader';

const Description = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetProductDetailsQuery(id);
  const [ content, setContent ] = useState("description")
  return (
    isLoading?<Loader/>:<div className='my-16 lg:my-[120px] lg:mx-24'>
    <div className="flex">
        <div className={`${content==="description"?"bg-gray-100":""} flex flex-1 lg:flex-none items-center justify-center text-base lg:font-medium font-semibold lg:w-[171px] h-[70px] border-[1px] border-gray-400`} onClick={()=>setContent("description")}>Description</div>
        <div className={`${content==="review"?"bg-gray-100":""} flex flex-1 lg:flex-none items-center justify-center text-base lg:font-medium font-semibold lg:w-[171px] h-[70px] border-[1px] border-gray-400`} onClick={()=>setContent("review")}>Review ({data?.singleProduct?.reviews?.length})</div>
    </div>
    <div className="flex flex-col lg:gap-8 border-[1px] border-gray-400 p-2  lg:p-12 pb-[70px]">
        {
          content==="description"?<p>{data?.singleProduct?.description}</p>:data?.singleProduct?.reviews?.map((val,i)=>{
            return <div className='w-full p-5 border-b-2' key={i}>
            <h2 className='font-semibold'>{val?.user?.name}</h2>
            <Box
                                sx={{
                                    '& > legend': { mt: 2 },

                                }}
                            >
                                <Rating
                                    value={val?.rating}
                                    readOnly
                                />
                               
            </Box>
            <p className='text-sm'>{val?.comment}</p>
          </div>})}
        
    </div>
</div>
    
  )
}

export default Description