import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaAngleLeft } from 'react-icons/fa'
import { FaAngleRight } from 'react-icons/fa'
import Rating from '@mui/material/Rating';
import { Box } from '@mui/material';
import { useGetProductDetailsQuery } from '../../redux/Api/productApi';
import { addToCart } from '../../redux/reducers/cartReducer.js';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useAddToCartItemsMutation } from '../../redux/Api/cartApi';
import { Helmet } from 'react-helmet-async';
import Loader from '../Loader/Loader.jsx';
import Breadcrum from '../breadcrum/Breadcrum.jsx';


const ProductDetails = () => {
    const [selectSize, setSelectSize] = useState('');
    const [selectSizeMessage, setSelectSizeMessage] = useState(false)
    const [image, setImage] = useState(0);

    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cartReducer);

    const { id } = useParams()
    const { data, isLoading, isError } = useGetProductDetailsQuery(id);
    const [addToCartItems] = useAddToCartItemsMutation();



    if(isError){
        console.log(isError); 
    }

    const [currentImg, setCurrentImg] = useState(0);
    const nextImg = () => {
        if (data.singleProduct.photo.length >= currentImg) {
            setCurrentImg(prev => prev + 1)
        }
    }
    const prevImg = () => {
        if (currentImg != 0) {
            setCurrentImg(prev => prev - 1)
        }
    }

    const addToCartHelper = async (productId, selectedSize, quantity) => {

        if (selectSize) {
            const index = cartItems.findIndex((val) => {
                return (val.product._id === productId && val.selectedSize === selectedSize);
            })

            if (index !== -1) {
                toast.error('product already added to cart');
            }else{
                const { data } = await addToCartItems({ product: productId, selectedSize, quantity });
                if (data.success) {
                    dispatch(addToCart(data.cartProduct))
                    toast.success("item added to cart");
                } else {
                    toast.error("something went wrong");
                }
            }
        } else {
            setSelectSizeMessage(true)
        }
    }

    return (
        isLoading ? <Loader/> : <>
    <Helmet title='Product Details- Mern-Ecommerce-App'/>
        <Breadcrum category={data?.singleProduct?.category} gender={data?.singleProduct?.gender}/>
            <div className="flex lg:flex-row flex-col gap-3 my-0 lg:mx-24 h-full">
                <div className="flex lg:flex-col gap-3 lg:p-3 lg:w-1/2 m-auto">
                    <div className="hidden  lg:flex flex-col gap-2">

                        <img className="h-full w-full" src={data?.singleProduct?.photo[image]?.url} alt="" />

                        <div className={`${data?.singleProduct?.photo?.length > 1 ? "flex" : "hidden"} justify-between gap-1`}>
                            {
                                data?.singleProduct?.photo?.map((val, i) => <div key={i} className="flex basis-1/4 cursor-pointer">
                                    <img onClick={() => { setImage(i) }} className='w-full' src={val?.url} alt="" />
                                </div>)
                            }
                        </div>


                    </div>

                    <div className="lg:hidden relative">
                        <div className='absolute top-1/2 z-10 w-full flex justify-between items-center text-sm'>
                            <button onClick={prevImg} className={`bg-white shadow-md rounded-full p-1 ${currentImg <= 0 ? "invisible" : "visible"}`}><FaAngleLeft /></button>
                            <button onClick={nextImg} className={`bg-white shadow-md rounded-full p-1 ${currentImg >= data?.singleProduct?.photo?.length - 1 ? "invisible" : "visible"}`}><FaAngleRight /></button>
                        </div>

                        <div className="flex w-full  overflow-hidden">
                            <div className="flex  min-w-full min-h-full duration-700" style={{ transform: `translateX(-${currentImg * 100}%)` }}>
                                {
                                    data?.singleProduct?.photo?.map((val, i) => <img key={i} src={val?.url} alt="" className="w-full h-full" />)
                                }
                            </div>
                        </div>
                    </div>

                </div>

                <div className="flex flex-col justify-start lg:w-1/2 p-3 m-auto">
                    <h1 className='text-xl lg:text-4xl font-normal'>{data?.singleProduct?.name}</h1>

                    <div className="flex items-center mt-2 gap-[5px] text-base">
                        <Box
                            sx={{
                                '& > legend': { mt: 2 },
                            }}
                        >
                            <Rating
                                name="simple-controlled"
                                value={data?.singleProduct?.ratings}
                            // onChange={(event, newValue) => {
                            //     setValue(newValue);
                            // }}
                            />

                        </Box>

                    </div>
                    <div className="flex items-center  my-10 mx-0 gap-[30px] text-xl lg:text-2xl font-bold">
                        <div className="">{`Rs. ${Math.ceil(data?.singleProduct?.price - (data?.singleProduct?.price * 0.15))}`}</div>
                        <div className='font-light text-gray-400 lg:text-2xl leading-8'>MRP : <span className="line-through">{data?.singleProduct?.price}</span></div>
                        <span className='text-orange-400 text-sm lg:text-xl'>(15% OFF)</span>
                    </div>

                    <div className="">
                        <h1 className=' text-xl font-semibold'>Select Size</h1>
                        <div className="flex my-[30px] mx-0 flex-shrink flex-wrap gap-2 lg:gap-5">

                            <div className={`${selectSize == 'S' ? "bg-orange-500" : ""} py-4 lg:py-[18px] px-6 border-[1px] border-gray-400 rounded cursor-pointer duration-500 hover:bg-orange-500 hover:text-white ${data?.singleProduct?.size?.S <= 0 ? "opacity-50 pointer-events-none" : ""}`} onClick={() => { setSelectSize("S") }}>S</div>
                            <div className={`${selectSize == 'M' ? "bg-orange-500" : ""} py-4 lg:py-[18px] px-6 border-[1px] border-gray-400 rounded cursor-pointer duration-500 hover:bg-orange-500 hover:text-white ${data?.singleProduct?.size?.M <= 0 ? "opacity-50 pointer-events-none" : ""}`} onClick={() => { setSelectSize("M") }}>M</div>
                            <div className={`${selectSize == 'L' ? "bg-orange-500" : ""} py-4 lg:py-[18px] px-6 border-[1px] border-gray-400 rounded cursor-pointer duration-500 hover:bg-orange-500 hover:text-white ${data?.singleProduct?.size?.L <= 0 ? "opacity-50 pointer-events-none" : ""}`} onClick={() => { setSelectSize("L") }}>L</div>
                            <div className={`${selectSize == 'XL' ? "bg-orange-500" : ""} py-4 lg:py-[18px] px-6 border-[1px] border-gray-400 rounded cursor-pointer duration-500 hover:bg-orange-500 hover:text-white ${data?.singleProduct?.size?.XL <= 0 ? "opacity-50 pointer-events-none" : ""}`} onClick={() => { setSelectSize("XL") }}>XL</div>
                            <div className={`${selectSize == '2XL' ? "bg-orange-500" : ""} py-4 lg:py-[18px] px-6 border-[1px] border-gray-400 rounded cursor-pointer duration-500 hover:bg-orange-500 hover:text-white ${data?.singleProduct?.size?.XXL <= 0 ? "opacity-50 pointer-events-none" : ""}`} onClick={() => { setSelectSize("2XL") }}>2XL</div>
                        </div>
                        <p className={`${selectSizeMessage ? "text-red-600 mb-2" : "hidden"}`}>please select size</p>
                    </div>
                    <Link >
                        <button className='py-3 lg:py-5 px-10 lg:w-[200px] text-base lg:font-semibold text-white bg-orange-500 mb-10 border-none outline-none cursor-pointer hover:bg-orange-700' onClick={() => { addToCartHelper(data?.singleProduct?._id, selectSize, 1) }}>ADD TO CART</button>
                    </Link>

                    <p className="mt-[10px] tracking-wider"><span className='font-semibold'>Category : </span>{data?.singleProduct?.category}</p>
                    <p className="mt-[10px] tracking-wider"><span className='font-semibold'>Tags : </span>Modern, Latest</p>

                </div>
            </div>
        </>
    )
}

export default ProductDetails