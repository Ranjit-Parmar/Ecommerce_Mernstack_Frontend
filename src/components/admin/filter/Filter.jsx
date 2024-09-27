import React, { useRef, useState } from 'react'
import { useGetAllCategoriesQuery } from '../../../redux/Api/productApi';
import Loader from '../../Loader/Loader';

const Filter = ({sortFunc,categorySort,searchHandler}) => {

    const {data, isLoading, isError} = useGetAllCategoriesQuery();
    const inputRef = useRef();
    
    const submitHandler = (e) => {
        e.preventDefault();
        searchHandler(inputRef.current.value);
    }
    
  return (
    isLoading?<Loader/>: <> <div className="min-w-0 rounded-lg overflow-hidden bg-white  shadow-sm rounded-t-lg rounded-0 mb-4">
                    <div className="p-4 ">
                        <div className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">

                            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                                <select name="" id="" className="w-full h-12 border bg-gray-100 px-2 py-1 text-sm focus:outline-none rounded-md focus:bg-white focus:border-gray-200 border-gray-200 focus:shadow-none leading-5" onChange={(e)=>{
                                    categorySort(e.target.value)
                                }}>
                                <option value="" hidden="">Category</option>
                                {data.allCategories.map((val,i)=>{
                                    return(
                                        <option key={i} value={val}>{val}</option>
                                    )
                                })}
                                    
                                </select>
                            </div>
                            
                            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                            <select name="" id="" className=" w-full h-12 border bg-gray-100 px-2 py-1 text-sm focus:outline-none rounded-md leading-5" onChange={(e)=>{
                            sortFunc(e.target.value)
                        }}>
                                <option value="" hidden="">Price</option>
                                <option value="price">Low to High</option>
                                <option value="-price">High to Low</option>
                                <option value="664c3f235f54d00008b255fe">Published</option>
                                <option value="664c3f235f54d00008b255fe">Status - Selling</option>
                                <option value="664c3f235f54d00008b255fe"> Status - Out of Stock</option>
                                </select>
                            </div>

                            <form className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow  grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"  onSubmit={submitHandler}>
                                <div className="flex items-center gap-2 flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                            <input className="block w-full h-12 border px-3 py-1 text-sm focus:outline-none   rounded-md bg-gray-100 focus:bg-white  border-gray-200" type="search" name="search" ref={inputRef} placeholder="Search Product" />
                                </div>
                            <div className="flex items-center gap-2 flex-grow-0 md:flex-grow-1 lg:flex-grow-1 xl:flex-grow-1">
                            <div className="w-full mx-1">
                                <button className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-orange-600 border border-transparent hover:bg-orange-700 h-12 w-full" >Search</button>
                            </div>
                            </div>

                            </form>


                        </div>
                            
                    </div>
                </div>
    </>
  )
}

export default Filter