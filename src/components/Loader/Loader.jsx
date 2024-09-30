import React from 'react'
import { FadeLoader } from 'react-spinners'

const Loader = () => {
  return (
    <div className=' h-[calc(100vh - 1.75rem)] border-black border-2'>
      <FadeLoader size={23} color={'#fa7e0a'} />
    </div>  
  )
}

export default Loader


