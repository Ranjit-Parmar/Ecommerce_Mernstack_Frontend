import React from 'react'
import ProductDetails from '../product_details/ProductDetails'
import Description from '../description/Description'
import RelatedProducts from '../related_product/RelatedProducts'

const Product = () => {
  return (
    <div className='bg-white w-[95%] min-h-[1000px] m-auto pb-4'>
        <ProductDetails/>
        <Description/>
        <RelatedProducts/>
     </div>
  )
}

export default Product