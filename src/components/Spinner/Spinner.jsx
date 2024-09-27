import React from 'react'
import { BeatLoader } from 'react-spinners'

const Spinner = () => {
  return (
    <div className='flex justify-center items-center border-black border-2'>
      <BeatLoader style={{ 'height': 'calc(100vh - 1.75rem)', 'lineHeight': 'calc(100vh - 1.75rem) ' }} size={23} color={'#fa7e0a'} />
    </div>
  )
}

export default Spinner