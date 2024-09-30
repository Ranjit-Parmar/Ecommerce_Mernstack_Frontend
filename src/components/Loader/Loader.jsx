import React from 'react'
import { FadeLoader } from 'react-spinners'

const Loader = () => {
  return (
    <div className=' min-h-screen flex justify-center items-center border-black border-2'>
      <FadeLoader size={23} color={'#fa7e0a'} />
    </div>  
  )
}

export default Loader


