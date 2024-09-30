import React from 'react'


const Breadcrum = ({category, gender}) => {
  return (
    <div className='flex text-xs lg:text-base items-center gap-2 font-normal my-[30px] capitalize pl-4'>
        HOME <img src="../../src/assets/breadcrum_arrow.png" alt="" /> SHOP <img src="../../src/assets/breadcrum_arrow.png" alt="" /> {gender.toUpperCase()} <img src="../../src/assets/breadcrum_arrow.png" alt="" /> {category.toUpperCase()}
    </div>
  )
}

export default Breadcrum