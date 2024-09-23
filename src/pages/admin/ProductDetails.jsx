import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetProductDetailsQuery } from '../../redux/Api/productApi'
import { ShopContext } from '../../context/ShopContext'
import { Helmet } from 'react-helmet-async'

const ProductDetails = () => {
    const Navigate = useNavigate()
    const { id } = useParams();
    const { data, isLoading, isError } = useGetProductDetailsQuery(id)




    return (
        isLoading ? "Loading" : <>
        <Helmet title="Product Details- Mern-Ecommerce-App"/>
            <h1 className="my-6 font-medium">Product Detail</h1>
            <div className="rounded-lg overflow-hidden bg-white shadow-sm rounded-t-lg rounded-0 mb-4">
                <div className="p-4"> 

                                <div className="inline-block overflow-y-auto h-full align-middle">
                                    <div className=" flex flex-col lg:flex-row md:flex-row w-full overflow-hidden">
                                        <div className="flex-shrink-0 flex items-center justify-center h-auto">
                                            <img src={data?.singleProduct?.photo[0]?.url} alt="product" className="h-full w-full" />
                                        </div>
                                        <div className="w-full flex flex-col p-5 md:p-8 text-left">
                                            <div className="mb-5 block ">
                                                <div className="font-semibold py-1 ">
                                                    <p className="pr-4">Name: <span className="">{data?.singleProduct?.name}</span>
                                                    </p>
                                                </div>
                                                <h2 className="text-heading font-semibold  dark:text-gray-400">Description</h2>
                                                <p className="uppercase font-medium text-gray-500">{data?.singleProduct?.description}</p>
                                            </div>
                                            <div className="font-bold dark:text-gray-400">
                                                <span className="inline-block">Rs. {Math.ceil(data?.singleProduct?.price - (0.15 * data?.singleProduct?.price))}<del className="text-gray-400 pl-2">Rs. {data?.singleProduct?.price}</del>
                                                </span>
                                            </div>
                                            <div className="mb-3">
                                                
                                                <span className={`${data?.singleProduct?.stock > 0 ?'text-emerald-600' : 'text-red-600'} inline-flex px-2 font-medium leading-5 rounded-full `}>
                                                    <span className="font-bold">{data?.singleProduct?.stock > 0 ? 'In Stock':'Out Of Stock'}</span>
                                                </span>
                                                <span className="text-gray-500 font-medium pl-4">QUANTITY: {data?.singleProduct?.stock}</span>
                                            </div>
                                            <div className="flex flex-col mt-4">
                                                <p className=" font-semibold py-1 text-gray-500 ">
                                                    <span className="text-gray-700">Category: </span> {data?.singleProduct?.category}</p>
                                                <div className="flex flex-row"></div>
                                            </div>
                                            <div className="mt-6">
                                                <button className="cursor-pointer leading-5  font-medium px-5 py-2 rounded-md text-white bg-orange-500  hover:bg-orange-600" onClick={() => {
                                                    Navigate(`../update-product/${data?.singleProduct?._id}`)
                                                }}>Edit Product</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                </div>
        </>
    )
}

export default ProductDetails