import React from 'react'
import Item from '../item/Item'
import { useGetAllProductsQuery } from '../../redux/Api/productApi';
import Loader from '../Loader/Loader';
const RelatedProducts = () => {
  const { data, isLoading, isError } = useGetAllProductsQuery("");
  
  return (
    <>
    {
      isLoading?<Loader/>:(<><div className='flex flex-col items-center gap-[10px] lg:p-3'>
        <h1 className='text-2xl lg:text-4xl lg:font-semibold'>Related Products</h1>
        <hr className='w-[200px] h-[6px] rounded-[10px] bg-gray-400'/>
        <div className="mt-[50px] flex px-1 lg:px-0 gap-2 lg:gap-[30px] overflow-y-auto w-full lg:w-auto">     
                  
        {
                data.allProducts.map((val, i)=>{
                    return <Item key={i} product={val}/>
                  })
              } 
           
        </div>
        </div></>)
    }
    </>
  )
}

export default RelatedProducts