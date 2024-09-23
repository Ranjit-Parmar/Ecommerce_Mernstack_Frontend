import React, { useState } from 'react'

const Pagination = ({totalProducts, productPerPage, setPageNumberHandler}) => {
   
    const [currentPage, setCurrentPage] = useState(1);
    
    const totalPages = (Math.ceil(totalProducts / productPerPage));
    
    const previousRemainingPage = Array.from({length:2},(_,index)=>currentPage - 1 - index).filter((val)=>val > 0).reverse();

    const nextRemainingPage = Array.from({length:3},(_,index)=>currentPage + index).filter((val)=>val <= totalPages)

    const allPagesNumber = [...previousRemainingPage, ...nextRemainingPage];
    
    
    const setPageHandler = (val) => {
        setCurrentPage(val) 
        setPageNumberHandler(val)
    }
    
    const previousPageHandler = (val) => {
        setCurrentPage(val)
        setPageNumberHandler(val)
    }
    
    const nextPageHandler = (val) => {
        setCurrentPage(val)
        setPageNumberHandler(val)
    }
    

    
    return (
        <>

            <div className='w-[80%] lg:w-2/4 text-sm lg:text-base xl:text-base bg-transparent rounded-md '>
                <ul className=' w-full p-2 flex flex-wrap justify-between items-center hover:font-normal'>
                    <li className={`${currentPage > 1 ? 'block' : 'opacity-70 pointer-events-none'} lg:w-16 xl:w-16`}>< button className='cursor-pointer w-full hover:bg-orange-400 duration-[.2s] rounded-l-md' onClick={()=>{previousPageHandler(currentPage-1)}}>Prev</button></li>

                    {allPagesNumber.map((val,i)=>{
                       
                        
                        return (
                            <li key={i} className='lg:w-14 xl:w-14'><button className={`hover:bg-orange-400 ${ currentPage === val ? 'bg-orange-500 text-white' : '' } cursor-pointer w-full duration-[.2s]`} value={currentPage} onClick={() => { setPageHandler(val)}}>{val}</button></li>
                        )
                    })}

                    <li className={`${currentPage === totalPages? 'opacity-70  pointer-events-none' : 'block'} lg:w-16 xl:w-16`}><button className='cursor-pointer w-full hover:bg-orange-400 duration-[.4s] rounded-r-md' onClick={()=>{nextPageHandler(currentPage+1)}}>Next</button></li>
                </ul>
            </div>

        </>
    )
}

export default Pagination