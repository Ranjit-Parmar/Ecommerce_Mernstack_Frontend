import React from 'react'
import { FaExclamation } from 'react-icons/fa'

const PageNotFound = () => {
  return (
    <>
    <div className="m-auto text-center p-10 h-1/2 flex flex-col justify-between items-center gap-1 lg:gap-3 ">
      <FaExclamation className="text-red-500 lg:text-4xl"/>

      <h3 className="lg:text-lg">Page not found</h3>
      <Link to="/" className="bg-orange-500 hover:bg-orange-600 text-white border-none text-xs px-1 py-3 cursor-pointer font-medium m-2 lg:w-40">Shop Now</Link>
    </div>
    </>
  )
}

export default PageNotFound