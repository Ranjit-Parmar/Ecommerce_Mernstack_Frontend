import React from 'react'
import { FadeLoader } from 'react-spinners'

const Loader = () => {
  return (
    <div className='flex justify-center items-center'>
      <FadeLoader style={{ 'height': 'calc(100vh - 1.75rem)', 'lineHeight': 'calc(100vh - 1.75rem) ' }} size={23} color={'#fa7e0a'} />
    </div>  
  )
}

export default Loader


