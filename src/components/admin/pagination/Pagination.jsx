import React from 'react'

const Pagination = () => {
  return (
    <>
    <div className="px-4 py-3 border-t border-gray-200  bg-white ">
                        <div className="flex flex-col justify-between text-xs sm:flex-row  ">
                            <span className="flex items-center font-semibold tracking-wide uppercase ml-2">Showing 1-20 of 317</span>
                            <div className="flex mt-2 sm:mt-auto sm:justify-end">
                                <nav>
                                    <ul className="inline-flex items-center">
                                        <li>
                                            <button className="align-bottom inline-flex items-center justify-center leading-5 font-medium p-2 rounded-md disabled:"  type="button">Prev</button>
                                        </li>
                                        <li>
                                            <button className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 font-medium focus:outline-none px-3 py-1 rounded-md text-xs hover:bg-orange-500" type="button">1</button>
                                        </li>
                                        <li>
                                            <button className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 font-medium px-3 py-1 rounded-md text-xs hover:bg-orange-500" type="button">2</button>
                                        </li>
                                        <li>
                                            <button className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 font-medium px-3 py-1 rounded-md text-xs hover:bg-orange-500" type="button">3</button>
                                        </li>
                                        <li>
                                            <button className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 font-medium px-3 py-1 rounded-md text-xs hover:bg-orange-500" type="button">4</button>
                                        </li>
                                        <li>
                                            <button className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 font-medium p-2 rounded-md hover:bg-orange-500" type="button">Next</button>
                                        </li>
                                    </ul>
                                </nav>
                             </div>
                        </div>
                    </div>
    </>
  )
}

export default Pagination