import React from 'react'
import Item from '../../components/item/Item'
import Category_card from '../../components/category_card/Category_card'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetProductCategoryQuery } from '../../redux/Api/productApi'
import { Helmet } from 'react-helmet-async'
import Women_model from '../../assets/model1.jpg';
import men_model from '../../assets/Men-Model.jpg';
import kid_model from '../../assets/Kid-model.jpg';
import men_tshirt from '../../assets/clothing3.jpg';
import women_tshirt from '../../assets/exclusive_image.png';
import kid_tshirt from '../../assets/clothing8.jpg';
import men_shirt from '../../assets/clothing5.jpg';
import women_shirt from '../../assets/women-shirts.jpg';
import kid_shirt from '../../assets/kids-shirts.jpg';
import men_jeans from '../../assets/clothing4.jpg';
import women_jeans from '../../assets/women-jeans.jpg';
import kid_jeans from '../../assets/Kids-Jeans.jpg';
import men_shorts from '../../assets/Shorts.jpg';
import women_shorts from '../../assets/women-shorts.jpg';
import kid_shorts from '../../assets/kids-shorts.jpg';
import men_winter_wear from '../../assets/men-winter-wear.jpg';
import women_winter_wear from '../../assets/women-winter-wear.jpg';
import kid_winter_wear from '../../assets/kids-winter-wear.jpg';
import men_sports_wear from '../../assets/Men-Sports-Wear.jpg';
import women_sports_wear from '../../assets/Women-Sports-Wear.jpg';
import kid_sports_wear from '../../assets/kids-sports-wear.jpg';
import Loader from '../../components/Loader/Loader'

const dummyData = [
  {
    id : 1,
    img1 : men_tshirt,
    img2 : women_tshirt,
    img3 : kid_tshirt,
    name : "T-Shirts",
    discount : "40 to 80% OFF",
    task : "shop now"
  },
  {
    id : 2,
    img1 : men_shirt,
    img2 : women_shirt,
    img3 : kid_shirt,
    name : "Shirts",
    discount : "50 to 90% OFF",
    task : "shop now"
  },
  {
    id : 3,
    img1 : men_jeans,
    img2 : women_jeans,
    img3 : kid_jeans,
    name : "Jeans",
    discount : "20 to 70% OFF",
    task : "shop now"
  },
  {
    id : 4,
    img1 : men_shorts,
    img2 : women_shorts,
    img3 : kid_shorts,
    name : "Shorts",
    discount : "10 to 20% OFF",
    task : "shop now"
  },
  {
    id : 5,
    img1 : men_winter_wear,
    img2 : women_winter_wear,
    img3 : kid_winter_wear,
    name : "Winter wear",
    discount : "10 to 20% OFF",
    task : "shop now"
  },
  {
    id : 6,
    img1 : men_sports_wear,
    img2 : women_sports_wear,
    img3 : kid_sports_wear,
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
    isLoading?<Loader/>:<>
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