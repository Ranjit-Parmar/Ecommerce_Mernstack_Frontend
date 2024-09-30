import React from 'react'
import { FadeLoader } from 'react-spinners'

const Loader = () => {
  return (
    <div className=' min-h-screen flex justify-center items-center'>
      <FadeLoader size={17} color={'#fa7e0a'} />
    </div>  
  )
}

export default Loader


