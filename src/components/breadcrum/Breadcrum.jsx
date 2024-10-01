import React from 'react'
import arrow from '../../assets/breadcrum_arrow.png';


const Breadcrum = ({category, gender}) => {
  return (
    <div className='flex text-xs lg:text-base items-center gap-2 font-normal my-[30px] capitalize pl-4'>
        HOME <img src={arrow} alt="" /> SHOP <img src={arrow} alt="" /> {gender==='male'?'MEN':gender==='female'?'WOMEN':gender==='kids'?'KIDS':'MEN'} <img src={arrow} alt="" /> {category?.toUpperCase()}
    </div>
  )
}

export default Breadcrum