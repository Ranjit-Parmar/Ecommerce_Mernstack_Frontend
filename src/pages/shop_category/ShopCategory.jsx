import React from 'react'
import Item from '../../components/item/Item'
import Category_card from '../../components/category_card/Category_card'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetProductCategoryQuery } from '../../redux/Api/productApi'
import { Helmet } from 'react-helmet-async'
import Women_model from '../../assets/model1.jpg';
import men_model from '../../assets/Men-Model.jpg';
import kid_model from '../../assets/Kid-model.jpg';

const dummyData = [
  {
    id : 1,
    img1 : "../../src/assets/clothing3.jpg",
    img2 : "../../src/assets/exclusive_image.png",
    img3 : "../../src/assets/clothing8.jpg",
    name : "T-Shirts",
    discount : "40 to 80% OFF",
    task : "shop now"
  },
  {
    id : 2,
    img1 : "../../src/assets/clothing5.jpg",
    img2 : "../../src/assets/women-shirts.jpg",
    img3 : "../../src/assets/kids-shirts.jpg",
    name : "Shirts",
    discount : "50 to 90% OFF",
    task : "shop now"
  },
  {
    id : 3,
    img1 : "../../src/assets/clothing4.jpg",
    img2 : "../../src/assets/women-jeans.jpg",
    img3 : "../../src/assets/Kids-Jeans.jpg",
    name : "Jeans",
    discount : "20 to 70% OFF",
    task : "shop now"
  },
  {
    id : 4,
    img1 : "../../src/assets/shorts.jpg",
    img2 : "../../src/assets/women-shorts.jpg",
    img3 : "../../src/assets/kids-shorts.jpg",
    name : "Shorts",
    discount : "10 to 20% OFF",
    task : "shop now"
  },
  {
    id : 5,
    img1 : "../../src/assets/men-winter-wear.jpg",
    img2 : "../../src/assets/women-winter-wear.jpg",
    img3 : "../../src/assets/kids-winter-wear.jpg",
    name : "Winter wear",
    discount : "10 to 20% OFF",
    task : "shop now"
  },
  {
    id : 6,
    img1 : "../../src/assets/Men-Sports-Wear.jpg",
    img2 : "../../src/assets/Women-Sports-Wear.jpg",
    img3 : "../../src/assets/kids-sports-wear.jpg",
    name : "Sports wear",
    discount : "30 to 40% OFF",
    task : "shop now"
  },
  
]


const ShopCategory = () => {
  const {gender} = useParams();
  
  const {data, isError, isLoading} = useGetProductCategoryQuery(gender);
  const Navigate = useNavigate();
  

  return (
    isLoading?"Loading...":<>
    <Helmet title={gender=='male'?'Men- Mern-Ecommerce-App':gender=='female'?'Women- Mern-Ecommerce-App':'Kids- Mern-Ecommerce-App'}/>
    <div className='m-2 lg:m-6'>
        {gender == 'male'?<img src={men_model} alt="" className=' h-[250px] lg:h-[500px] w-full'/>:gender=='female'?<img src={Women_model} alt="" className=' h-[250px] lg:h-[500px] w-full'/>:<img src={kid_model} alt="" className=' h-[250px] lg:h-[500px] w-full'/>}
        

        <div className='mt-4 w-full pt-3 m-auto bg-white'>    
        <h2 className='text-center text-lg lg:text-xl mt-2 font-semibold uppercase'>shop by category</h2>
        <hr className="w-full mt-4" />

        
        <div className=" w-full flex flex-wrap justify-center items-center gap-5 p-7">
          {dummyData.map((val, i)=>{
            return <Category_card key={i} val={val} gender={gender}/>
          })}
            
        </div>
        </div>

        <hr className="w-full my-4 bg-grey" />

        <div className='flex flex-col gap-4 justify-center items-center w-full pb-4'>
            <h1 className="text-center text-lg lg:text-xl mt-2 font-semibold uppercase">top trending</h1>
            <hr className="w-full"/>
            <div className='w-full flex justify-center py-4 bg-white items-center  gap-1 lg:gap-4 flex-wrap'>
            {data?.getProducts?.map((val,i)=>i<5 && <Item key={i} product={val}/>)}
            </div>
        </div>

        <hr className="w-full my-4 bg-grey" />

        <div className='flex flex-col gap-4 justify-center items-center w-full pb-4'>
            <h1 className="text-center text-lg lg:text-xl mt-2 font-semibold uppercase">new arrivals</h1>
            <hr className="w-full"/>
            <div className='w-full flex justify-center py-4 bg-white items-center gap-1 lg:gap-4 flex-wrap'>
            {data?.getProducts?.map((val,i)=>i<5 && <Item key={i} product={val}/>)}
            </div>
            <button className='m-3 h-10 px-2 bg-orange-500 hover:bg-orange-600 text-white' onClick={()=>Navigate(`../productlist`,{state:{gender:gender}})}>Shop Now</button>
        </div>
        
    </div>
    </>
  )
}

export default ShopCategory