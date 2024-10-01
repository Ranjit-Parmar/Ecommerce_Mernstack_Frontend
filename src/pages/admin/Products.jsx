import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdEdit } from 'react-icons/md'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { FaEye } from 'react-icons/fa'
import { useDeleteProductMutation, useGetAllCategoriesQuery, useGetAllProductsQuery } from '../../redux/Api/productApi'
import toast from 'react-hot-toast'
import Loader from '../../components/Loader/Loader'

const Products = () => {

    const [sort, setSort] = useState('');
    const [search, setSearch] = useState('')
    const [selectCategoryArray, setSelectCategoryArray] = useState([])
    const inputRef = useRef();
    const Navigate = useNavigate();

    const { data: categoryData, isLoading: categoryIsLoading, isError: categoryIsError } = useGetAllCategoriesQuery();
    const { data, isLoading, isError } = useGetAllProductsQuery({ sort, selectCategoryArray, search })
    const [deleteProduct] = useDeleteProductMutation();


    const submitHandler = (e) => {
        e.preventDefault();
        setSearch(inputRef.current.value);
    }


    const deleteProductHandler = async (productId) => {
        const { data } = await deleteProduct(productId);
        if (data.success) {
            toast.success(data.message);
        } else {
            toast.error('something went wrong');
        }
    }


    return (
        isLoading ? <Loader/> : <>
            <h1 className="my-6 text-lg font-medium">Products</h1>
            <div className="min-w-0 rounded-lg overflow-hidden bg-white  shadow-sm rounded-t-lg rounded-0 mb-4">
                <div className="p-4">
                    <div className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">

                        <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                            <select className="w-full h-12 border bg-gray-100 px-2 py-1 text-sm focus:outline-none rounded-md focus:bg-white focus:border-gray-200 border-gray-200 focus:shadow-none leading-5" onChange={(e) => {
                                setSelectCategoryArray(e.target.value)
                            }}>
                                <option value="" hidden="">Category</option>
                                {categoryData?.allCategories?.map((val, i) => {
                                    return (
                                        <option key={i} value={val}>{val}</option>
                                    )
                                })}

                            </select>
                        </div>

                        <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                            <select className=" w-full h-12 border bg-gray-100 px-2 py-1 text-sm focus:outline-none rounded-md leading-5" onChange={(e) => {
                                setSort(e.target.value)
                            }}>
                                <option value="" hidden="">Price</option>
                                <option value="price">Low to High</option>
                                <option value="-price">High to Low</option>
                            </select>
                        </div>

                        <form className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow  grid gap-4 lg:gap-0 xl:gap-0 md:gap-0 md:flex xl:flex" onSubmit={submitHandler}>
                           
                            <input className="w-full h-12  px-3 py-1 text-sm focus:outline-none flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow rounded-md md:rounded-r-none lg:rounded-r-none xl:lg:rounded-r-none md:rounded-l-md lg:rounded-l-md xl:rounded-l-md bg-gray-100 focus:bg-white" type="search" name="search" ref={inputRef} placeholder="Search Product" />

                            <div className="flex items-center flex-grow-0 md:flex-grow-1 lg:flex-grow-1 xl:flex-grow-1">

                                <button className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 font-medium focus:outline-none px-4 py-2 md:rounded-r-md lg:rounded-r-md xl:rounded-r-md text-sm text-white bg-orange-600 border border-transparent hover:bg-orange-700 h-12 w-full" >Search</button>

                            </div>

                        </form>


                    </div>

                </div>
            </div>



            <div className="w-full overflow-x-auto">
                <table className="w-full whitespace-nowrap">
                    <thead className="text-xs font-semibold tracking-wide text-left uppercase bg-black text-white">
                        <tr>
                            <td className="px-4 py-2">product image</td>
                            <td className="px-4 py-2">product name</td>
                            <td className="px-4 py-2">category</td>
                            <td className="px-4 py-2">price</td>
                            <td className="px-4 py-2">stock</td>
                            <td className="px-4 py-2">view</td>
                            <td className="px-4 py-2 text-right">actions</td>
                        </tr>
                    </thead>

                    {data?.Products?.map((val, i) => <tbody key={i} className="bg-white">
                                <tr>
                                    <td className="px-4 py-2">
                                        <div className=" rounded-full  w-10 h-10 mr-2 md:block bg-gray-50" >
                                            <img className="object-cover w-full h-full rounded-full" src={val?.photo[0]?.url} alt="product" />
                                        </div>
                                    </td>
                                    <td className="px-4 py-2"><span className="text-sm">{val.name}</span></td>
                                    <td className="px-4 py-2"><span className="text-sm">{val.category}</span></td>
                                    <td className="px-4 py-2"><span className="text-sm font-semibold">Rs. {val.price}</span></td>
                                    <td className="px-4 py-2"><span className="text-sm">{val.stock}</span></td>
                                    <td className="px-4 py-2 ">
                                        <Link to={`/admin/product-details/${val._id}`}>
                                            <span className=" text-xl text-gray-400 hover:text-orange-600 focus:outline-none"><FaEye /></span>
                                        </Link></td>
                                    <td className="px-4 py-2">
                                        <div className="flex justify-end text-right">
                                            <button className="p-2 cursor-pointer text-gray-400 hover:text-orange-600 focus:outline-none" onClick={() => { deleteProductHandler(val._id) }}><p className="text-xl"><RiDeleteBin6Line /></p></button>
                                            <button className="p-2 cursor-pointer text-gray-400 hover:text-red-600 focus:outline-none" onClick={() => { Navigate(`./update-product/${val._id}`) }}>
                                                <p className="text-xl"><MdEdit /></p>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        )
                    }
                </table>
            </div>
        </>
    )
}

export default Products