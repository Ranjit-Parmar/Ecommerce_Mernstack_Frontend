import React, { useContext, useEffect, useState } from 'react'
import Breadcrum from '../../components/breadcrum/Breadcrum'
import Item from '../../components/item/Item'
import Pagination from '../../components/pagination/Pagination'
import { ShopContext } from '../../context/ShopContext'
import { useGetAllProductsQuery } from '../../redux/Api/productApi'
import { RxCross1 } from 'react-icons/rx'
import { useLocation } from 'react-router-dom'
import Loader from '../../components/Loader/Loader'


const ProductList = () => {

    

    let emptyCategoryObj = {}
    let emptyGenderObj = {}

    const { setFilterModel, filterModel } = useContext(ShopContext);
    const [sort, setSort] = useState("");
    const [gender, setGender] = useState(emptyGenderObj);
    const [category, setCategory] = useState(emptyCategoryObj);
    const [price, setPrice] = useState([]);
    const [page, setPage] = useState(1);
    
    
    
    let search;   
    const query = useLocation()
    
   
    if (query) {
        let searchValue = query?.search?.split('=')[1];
        search = searchValue
    }
    
    
    const categoryHandler = (e) => {

        if (e.target.checked) {
            setCategory((pre) => {
                return { ...pre, [e.target.value]: e.target.checked }
            })

        }
        if (!e.target.checked) {
            setCategory((pre) => {
                return { ...pre, [e.target.value]: e.target.checked }
            })
        }
    }

    const genderHandler = (e) => {
       
        
        if (e.target.checked) {
            setGender((pre) => {
                return { ...pre, [e.target.value]: e.target.checked }
            })
        }
        if (!e.target.checked) {
            setGender((pre) => {
                return { ...pre, [e.target.value]: e.target.checked }
            })
        }
    }

    let selectCategoryArray = [];

    for (let key in category) {
        if (category[key] === true) {
            selectCategoryArray.push(key)
        }
    }

    let selectGenderArray = [];

    useEffect(()=>{
        if(query?.state?.gender){
            setGender((pre) => {
                return { ...pre, [query?.state?.gender]: true }
            })
        }else{
            setGender((pre) => {
                return { ...pre, [query?.state?.gender]: false }
            })

        }
    },[query?.state?.gender])
    
    for (let key in gender) {
        if (gender[key] === true) {
            selectGenderArray.push(key)
        }
    }



    const priceHandler = (e) => {
        setPrice(e.target.value)
    }

    
    const setPageNumberHandler = (val) => {
       setPage(val);
    }

    
    
    const { data, isError, isLoading } = useGetAllProductsQuery({ selectCategoryArray, selectGenderArray, price, sort, search, page });
    

    if (isError) {
        console.log(isError);

    }


  
    return (
        isLoading ? <Loader/> : <>
            
            <div className='m-2 lg:m-6'>
                <div className='w-full bg-white'>
                    <div className='h-28  flex justify-start items-start '>
                        <Breadcrum />
                    </div>
                    <hr />
                    <div className=' flex lg:flex-row flex-col-reverse justify-start '>


                        {/* <Filter/>                */}

                        <div className={`${filterModel ? "absolute" : "hidden"} z-20 lg:z-0 w-full top-0 left-0  lg:static lg:w-[25%] lg:flex flex-col justify-start gap-4 mt-5 lg:mt-0 pt-3 lg:bg-white bg-slate-100`}>
                            <RxCross1 className='text-2xl bg-slate-100 float-right mr-2 lg:hidden' onClick={() => { setFilterModel(false) }} />
                            <div className=' pl-3'>
                                <h2 className='font-medium'>Filter By</h2>
                            </div>
                            <hr />
                            <div className=' pl-3'>
                                <h2 className=' font-medium'>Gender</h2>
                                <ul className='font-normal  flex flex-col p-3'>
                                    <li className='p-3 flex justify-start items-center gap-3'><label htmlFor="mens" className='h-full'><input type="checkbox" id='mens' value='male' defaultChecked={query?.state?.gender==='male'?'checked':false}  onChange={(e) => { genderHandler(e) }} className='mr-4' />men</label></li>
                                    <li className='p-3 flex justify-start
                             items-center gap-3'><label htmlFor="womens" className='h-full'><input type="checkbox" id='womens' value='female' defaultChecked={query?.state?.gender==='female'?'checked':false} onChange={(e) => { genderHandler(e) }} className='mr-4' />women</label></li>
                                    <li className='p-3 flex justify-start
                             items-center gap-3'><label htmlFor="kids" className='h-full'><input type="checkbox" id='kids' value='kid' defaultChecked={query?.state?.gender==='kid'?'checked':false} onChange={(e) => { genderHandler(e) }} className='mr-4' />kids</label></li>
                                </ul>
                            </div>
                            <hr />
                            <div className=' pl-3'>
                                <h2 className='font-medium'>Category</h2>
                                <ul className='font-normal flex flex-col p-3'>
                                    <li className='p-3 flex justify-start items-center gap-3'><label htmlFor="jeans" className='h-full'><input type="checkbox" id='jeans' value='jeans' onClick={(e) => { categoryHandler(e) }} className='mr-4' />Jeans</label></li>
                                    <li className='p-3 flex justify-start
                             items-center gap-3'><label htmlFor="shirts" className='h-full'><input type="checkbox" id='shirts' value='shirt' onClick={(e) => { categoryHandler(e) }} className='mr-4' />Shirts</label></li>
                                    <li className='p-3 flex justify-start
                             items-center gap-3'><label htmlFor="tshirt" className='h-full'><input type="checkbox" id='tshirt' value='tshirt' onClick={(e) => { categoryHandler(e) }} className='mr-4' />T-Shirts</label></li>
                                    <li className='p-3 flex justify-start
                             items-center gap-3'><label htmlFor="trousers" className='h-full'><input type="checkbox" id='trousers' value='trouser' onClick={(e) => { categoryHandler(e) }} className='mr-4' />Trousers</label></li>
                                </ul>
                            </div>
                            <hr />
                            <div className=' pl-3'>
                                <h2 className='font-medium'>Price</h2>
                                <ul className='font-normal flex flex-col p-3'>
                                    <li className='p-3 flex justify-start items-center gap-3'><input type="radio" id='price[lt]=500' value='price[lt]=500' name='price' onClick={(e) => { priceHandler(e) }} className='mr-4' /><label htmlFor="price[lt]=500" className='h-full'> Below Rs.500</label></li>
                                    <li className='p-3 flex justify-start items-center gap-3'><input type="radio" id='price[gte]=500&price[lte]=1000' value='price[gte]=500&price[lte]=1000' name='price' onClick={(e) => { priceHandler(e) }} className='mr-4' /><label htmlFor="price[gte]=500&price[lte]=1000" className='h-full'> Rs.500-1000</label></li>
                                    <li className='p-3 flex justify-start items-center gap-3'><input type="radio" id='price[gte]=1500&price[lte]=2000' value='price[gte]=1500&price[lte]=2000' name='price' onClick={(e) => { priceHandler(e) }} className='mr-4' /><label htmlFor="price[gte]=1500&price[lte]=2000" className='h-full'> Rs.1500-2000</label></li>
                                    <li className='p-3 flex justify-start items-center gap-3'><input type="radio" id='price[gte]=2000' value='price[gte]=2000' name='price' onClick={(e) => { priceHandler(e) }} className='mr-4' /><label htmlFor="price[gte]=2000" className='h-full'> above Rs.2000</label></li>
                                </ul>
                            </div>

                        </div>






                        <div className='p-8 w-full lg:w-[75%] flex flex-col justify-start gap-2 lg:border-gray-400 lg:border-l-[1px]'>
                            <div className='h-14 gap-2 md:gap-0 lg:gap-0 xl:gap-0 flex items-center justify-between'>
                                <div className='lg:hidden border-[1px] border-gray-400 hover:bg-gray-100 ml-4 pl-3 rounded-md leading-6 h-6 w-24'>
                                    <button className='tracking-wide' onClick={() => { setFilterModel(true) }}>Filter</button>
                                </div>
                                <select className='border-[1px] bg-gray-100 text-sm focus:outline-none rounded-md focus:bg-white focus:border-gray-200 border-gray-200 focus:shadow-none leading-5 px-2 py-1 lg:mr-32 xl:mr-0 mr-7' onChange={(e) => {
                                    setSort(e.target.value)
                                }}>
                                    <option value="">Sort By</option>
                                    <option value="-price">Price (Highest First)</option>
                                    <option value="price">Price (Lowest First)</option>
                                </select>
                            </div>

                            <hr />

                            <div className='w-full flex flex-wrap justify-center gap-2 lg:grid grid-cols-4 lg:mx-auto lg:gap-2 items-center pb-4'>
                                {
                                    data?.allProducts?.map((val, i) => <Item key={i} product={val} />)
                                }

                            </div>
                            <div className='flex flex-col justify-center items-center mx-3 lg:mx-6'>
                                <hr className='w-full' />
                                <Pagination totalProducts={data && data?.filteredProducts} productPerPage={data && data?.productPerPage} setPageNumberHandler={setPageNumberHandler}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductList