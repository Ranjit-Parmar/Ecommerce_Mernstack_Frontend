import React from 'react'
import { FadeLoader } from 'react-spinners'

const Loader = () => {
  return (
    <div className='flex justify-center items-center m-auto'>
      <FadeLoader style={{ 'height': '100vh', 'lineHeight': '100vh' }} size={23} color={'#fa7e0a'} />
    </div>  
  )
}

export default Loader


