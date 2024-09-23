import React, { useEffect, useState } from 'react'
import { FaAngleLeft } from 'react-icons/fa'
import { FaAngleRight } from 'react-icons/fa'
import Item from '../../components/item/Item'
import Category_card from '../../components/category_card/Category_card'
import model2 from '../../assets/model2.jpg'
import clothing9 from '../../assets/clothing9.jpg'
import gadget14 from '../../assets/gadget14.jpg'
import spectacle3 from '../../assets/spectacle3.jpg'
import shoes2 from '../../assets/shoes2.jpg'
import { useNavigate } from 'react-router-dom'
import { useGetAllProductsQuery } from '../../redux/Api/productApi'
import { Helmet } from 'react-helmet-async'

const dummyData = [
  {
    id: 1,
    img: "../../src/assets/Tshirt.jpg",
    name: "T-Shirts",
    discount: "40 to 80% OFF",
    task: "shop now"
  },
  {
    id: 2,
    img: "../../src/assets/Shirt.jpg",
    name: "Shirt",
    discount: "50 to 90% OFF",
    task: "shop now"
  },
  {
    id: 3,
    img: "../../src/assets/Jeans.jpg",
    name: "Jeans",
    discount: "20 to 70% OFF",
    task: "shop now"
  },
  {
    id: 4,
    img: "../../src/assets/Shorts.jpg",
    name: "Shorts",
    discount: "10 to 20% OFF",
    task: "shop now"
  },
  {
    id: 5,
    img: "../../src/assets/jogger.webp",
    name: "Jogger",
    discount: "10 to 20% OFF",
    task: "shop now"
  },
  {
    id: 6,
    img: "../../src/assets/Topwear.jpg",
    name: "Topwear",
    discount: "30 to 40% OFF",
    task: "shop now"
  },
  {
    id: 7,
    img: "../../src/assets/Kidswear.webp",
    name: "Kidswear",
    discount: "10 to 20% OFF",
    task: "shop now"
  },
  
]

const desktopImages = [
  model2,
  clothing9,
  gadget14,
  spectacle3,
  shoes2
]
const Home = () => {  

  const Navigate = useNavigate();

  const [currentImg, setCurrentImg] = useState(0);
  const nextImg = () => {
    if (desktopImages.length > currentImg) {
      setCurrentImg(prev => prev + 1)
    }
  }
  const prevImg = () => {
    if (currentImg != 0) {
      setCurrentImg(prev => prev - 1)
    }
  }

  useEffect(() => {

    const setTimer = setInterval(() => {
      if (desktopImages.length - 1 > currentImg) {
        nextImg()
      } else {
        setCurrentImg(0)
      }
    }, 3000)

    return () => clearInterval(setTimer);

  }, [currentImg])
  

  let filter = {}
  
  const { data, isLoading, isError } = useGetAllProductsQuery({filter})
  
  if(isError){
    console.log(isError);
    
  }
  return (
    <>
    {
      isLoading? "Loading..." : (
        <>
        <Helmet title="Home- Mern-Ecommerce-App"/>
        
    
      <div className='m-2 lg:m-6'>

        {/* hero section */}

        <div className='w-full h-[250px] lg:h-[300px] shadow-sm bg-gradient-to-r from-cyan-50 to bg-blue-500'>

          <div className='h-full w-full flex flex-col lg:flex-row justify-evenly items-center gap-2'>
            <div className='w-full lg:h-full flex-1 flex flex-col justify-center items-center '>
              <h3 className=' font-medium'>Trade-in-offer</h3>
              <h1 className=' lg:text-7xl text-purple-900'><strong>Super value deals</strong></h1>
              <h1 className=''><strong>On all products</strong></h1>
            </div>
            <div className='flex flex-col items-center lg:gap-4 flex-1'>
              <p className=''>Save more with coupens & up to <span className=' lg: font-semibold text-red-800'>70% OFF</span></p>
              <button className='w-24  lg:w-36 lg: bg-orange-600 text-white hover:bg-orange-700 font-semibold p-1 cursor-pointer rounded-md' onClick={()=>{Navigate('productlist')}}>Shop Now</button>
            </div>
          </div>

        </div>

        <hr className='mt-3 mb-3 w-full' />

        {/* carousel */}

        <div className="h-[175px] lg:h-[550px] relative">

          <div className='absolute top-[72px] lg:top-[270px] z-10 w-full flex justify-between items-center'>
            <button onClick={prevImg} className='bg-white shadow-md rounded-full p-1'><FaAngleLeft /></button>
            <button onClick={nextImg} className='bg-white shadow-md rounded-full p-1'><FaAngleRight /></button>

          </div>

          <div className="flex h-full w-full overflow-hidden">
            {
              desktopImages.map((imgUrl, index) => {
                return (
                  <div className="w-full h-full min-w-full min-h-full duration-[.8s]" key={index} style={{ transform: `translateX(-${currentImg * 100}%)` }}>
                    <img src={imgUrl} alt="" className="w-full h-full " />
                  </div>
                )
              })
            }
          </div>


        </div>



        {/* category section */}
        <div className='mt-4 w-full m-auto pt-3 bg-white flex flex-col justify-center items-center'>
          <div className='flex flex-col gap-4 justify-center items-center w-full'>
            <h3 className='text-center mt-2 font-semibold uppercase'>top deals</h3>
            <hr className='w-full' />
            <div className='w-full flex-shrink flex flex-wrap justify-center items-center gap-4 p-7 '>
              {dummyData.map((val, i) => {
                return <Category_card key={i} val={val} />
              })}
            </div>
          </div>
          <button className='m-3 h-10 px-2 bg-orange-500 hover:bg-orange-600 text-white' onClick={()=>{Navigate('productlist')}}>Shop Now</button>
        </div>

        <hr className="w-full my-4 bg-grey" />
        <div className='flex flex-col gap-4 justify-center items-center w-full pb-4'>
          <h3 className='text-center  lg: mt-2 font-semibold uppercase'>new arrivals</h3>
          <hr className='w-full' />

          <div className='w-full flex-shrink flex justify-center gap-2 lg:gap-5 py-4 bg-white items-center flex-wrap'>

          
          {
            data && data.allProducts.map((val, i)=>i < 4 && <Item key={i} product={val}/>)
          } 
          

          </div>

        </div>
      </div>
      </>
      )
    }
    </>
  )
}

export default Home