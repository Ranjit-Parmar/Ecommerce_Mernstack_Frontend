import React from 'react'
import { FadeLoader } from 'react-spinners'

const Loader = () => {
  return (
    <div className='border-black border-2'>
      <FadeLoader size={23} color={'#fa7e0a'} />
    </div>  
  )
}

export default Loader


