import { Box, Rating } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'



const Item = ({product }) => {
  
    return (
        <>
            <Link to={`/productdetail/${product._id}`} className='text-xs lg:text-sm xl:text-sm hover:scale-95 hover:shadow-md duration-[.4s]'>
                <div className='w-32 lg:w-52 xl:w-56 flex-shrink flex flex-col justify-start'>
                    <img src={product?.photo[0]?.url} alt={`${product.name}`} className='w-full h-auto' />
                    <div className='flex flex-col mt-3 pb-2'>
                        <h3 className='uppercase  font-normal pl-2'>{product.name}</h3>
                        <p className='truncate pl-2'>{product.description}</p>
                        <div className="flex gap-1">
                        <h2 className='uppercase font-medium pl-2 pt-1'>{`Price : ${product.price} Rs.`}</h2>
                    <Box 
                                sx={{
                                    '& > legend': { mt: 2 },
                                    
                                }}
                            >
                                <Rating
                                    name="simple-controlled"
                                    value={product.ratings}
                                    size='small'
                                />
                               
                            </Box>

                    </div>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default Item




