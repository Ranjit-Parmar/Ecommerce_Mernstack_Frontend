import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { FiUpload } from 'react-icons/fi'
import { RxCross1 } from 'react-icons/rx'
import { useNavigate } from 'react-router-dom'
import { useCreateProductMutation } from '../../../redux/Api/productApi'
import { Helmet } from 'react-helmet-async'

const AddProduct = () => {
    const Navigate = useNavigate();
    const [createProduct] = useCreateProductMutation();
    const [button, setButton] = useState(false);
    const [imagePreview, setImagePreview] = useState([]);
    const [size, setSize] = useState({
        S: 0,
        M: 0,
        L: 0,
        XL: 0,
        XXL: 0,

    });
    const [productValue, setProductValue] = useState({
        name,
        description: '',
        category: '',
        gender: '',
        price: 0,
    })

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', productValue.name)
        formData.append('description', productValue.description)
        formData.append('category', productValue.category)
        formData.append('gender', productValue.gender)
        formData.append('size', JSON.stringify(size))
        formData.append('price', productValue.price)

        imagePreview?.forEach((val) => {
            formData.append('photo', val)
        })

        setButton(true)
        const data = await createProduct(formData);


        if (data.error) {
            const { error } = data;
            const errorMsg = error.data.message;
            toast.error(errorMsg);
            setButton(false)
        } else {
            toast.success('product created successfully');
            setButton(false)
            setProductValue({
                name,
                description: '',
                category: '',
                gender: '',
                price: 0
            })
            setSize({})
            setImagePreview([])
            Navigate('/admin')
        }

    }
    const changeSelectImageHandler = (e) => {

        const files = Array.from(e.target.files);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagePreview((prev) => [...prev, reader.result])
                }
            }
            reader.readAsDataURL(file)
        })
    }
    const removePreviewImage = (item) => {
        setImagePreview(imagePreview.filter((val) => {
            return val !== item
        }))
    }

    return (
        <>
        <Helmet title="Add Products- Mern-Ecommerce-App"/>
            <h1 className="my-6 font-medium">Add Product</h1>
            <div className="rounded-lg overflow-hidden mb-4">
                <form className='w-full py-[30px]' onSubmit={submitHandler}>
                    <div className="lg:w-1/2 h-full bg-white m-auto py-10 px-2 lg:px-[30px] shadow-lg ">

                        <div className="flex flex-col gap-2 mt-[30px] ">

                            <input type="text" placeholder='Enter Product Name' name='name' value={productValue.name} className='flex-1 basis-14 w-full pl-5 border-[1px] border-gray-400 outline-none' onChange={(e) => {
                                setProductValue((prev) => {
                                    return { ...prev, [e.target.name]: e.target.value }
                                })
                            }} />
                            <textarea placeholder='Enter Product Description' name='description' value={productValue.description} className='basis-20 w-full pl-5 border-[1px] pt-6 border-gray-400 outline-none' onChange={(e) => {
                                setProductValue((prev) => {
                                    return { ...prev, [e.target.name]: e.target.value }
                                })
                            }} />
                            <div className='flex flex-wrap gap-2 md:basis-14 lg:basis-14 xl:basis-14 items-center'>
                                <select name="category" className='h-full flex-grow pl-5 border-gray-400 border-[1px]' onChange={(e) => {
                                    setProductValue((prev) => {
                                        return { ...prev, [e.target.name]: e.target.value }
                                    })
                                }}>
                                    <option value="" hidden="">Category</option>
                                    <option value="shirt">Shirt</option>
                                    <option value="tshirt">T-Shirt</option>
                                    <option value="jeans">Jeans</option>
                                    <option value="topwear">topwear</option>
                                    <option value="bottomwear">bottomwear</option>
                                </select>
                                <select name="gender" className='h-full flex-grow pl-5 border-gray-400 border-[1px]' onChange={(e) => {
                                    setProductValue((prev) => {
                                        return { ...prev, [e.target.name]: e.target.value }
                                    })
                                }}>
                                    <option value="" hidden="">Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="kid">Kids</option>
                                </select>
                            </div>
                            <div className='flex flex-wrap gap-2 md:basis-14 lg:basis-14 xl:basis-14 items-center'>
                                <div className='h-full flex-grow flex justify-center items-center'>
                                    <span>Size & Stock</span>
                                </div>
                                <select name="S" className='h-full flex-grow pl-5  border-gray-400 border-[1px]' onChange={(e) => {
                                    setSize((prev) => {
                                        return { ...prev, ['S']: Number(e.target.value) }
                                    })
                                }}>
                                    <option value="" hidden="">S</option>
                                    <option value={0}>0</option>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                    <option value={7}>7</option>
                                    <option value={8}>8</option>
                                    <option value={9}>9</option>
                                    <option value={10}>10</option>
                                    <option value={11}>11</option>
                                    <option value={12}>12</option>
                                    <option value={13}>13</option>
                                    <option value={14}>14</option>
                                    <option value={15}>15</option>

                                </select>
                                <select name="size" className='h-full flex-grow pl-5  border-gray-400 border-[1px]' onChange={(e) => {
                                    setSize((prev) => {
                                        return { ...prev, ['M']: Number(e.target.value) }
                                    })
                                }}>
                                    <option value="" hidden="">M</option>
                                    <option value={0}>0</option>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                    <option value={7}>7</option>
                                    <option value={8}>8</option>
                                    <option value={9}>9</option>
                                    <option value={10}>10</option>
                                    <option value={11}>11</option>
                                    <option value={12}>12</option>
                                    <option value={13}>13</option>
                                    <option value={14}>14</option>
                                    <option value={15}>15</option>
                                </select>
                                <select name="size" className='h-full flex-grow pl-5  border-gray-400 border-[1px]' onChange={(e) => {
                                    setSize((prev) => {
                                        return { ...prev, ['L']: Number(e.target.value) }
                                    })
                                }}>
                                    <option value="" hidden="">L</option>
                                    <option value={0}>0</option>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                    <option value={7}>7</option>
                                    <option value={8}>8</option>
                                    <option value={9}>9</option>
                                    <option value={10}>10</option>
                                    <option value={11}>11</option>
                                    <option value={12}>12</option>
                                    <option value={13}>13</option>
                                    <option value={14}>14</option>
                                    <option value={15}>15</option>
                                </select>
                                <select name="size" className='h-full flex-grow pl-5 border-gray-400 border-[1px]' onChange={(e) => {
                                    setSize((prev) => {
                                        return { ...prev, ['XL']: Number(e.target.value) }
                                    })
                                }}>
                                    <option value="" hidden="">XL</option>
                                    <option value={0}>0</option>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                    <option value={7}>7</option>
                                    <option value={8}>8</option>
                                    <option value={9}>9</option>
                                    <option value={10}>10</option>
                                    <option value={11}>11</option>
                                    <option value={12}>12</option>
                                    <option value={13}>13</option>
                                    <option value={14}>14</option>
                                    <option value={15}>15</option>
                                </select>
                                <select name="size" className='h-full flex-grow pl-5  border-gray-400 border-[1px]' onChange={(e) => {
                                    setSize((prev) => {
                                        return { ...prev, ['XXL']: Number(e.target.value) }
                                    })
                                }}>
                                    <option value="" hidden="">2XL</option>
                                    <option value={0}>0</option>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                    <option value={7}>7</option>
                                    <option value={8}>8</option>
                                    <option value={9}>9</option>
                                    <option value={10}>10</option>
                                    <option value={11}>11</option>
                                    <option value={12}>12</option>
                                    <option value={13}>13</option>
                                    <option value={14}>14</option>
                                    <option value={15}>15</option>
                                </select>

                            </div>
                            <input type="number" placeholder='Enter Product Price' name='price' value={productValue.price} className='flex-1 basis-14 w-full pl-5 border-[1px] border-gray-400 outline-none' onChange={(e) => {
                                setProductValue((prev) => {
                                    return { ...prev, [e.target.name]: e.target.value }
                                })
                            }} />
                            <div className='flex items-center justify-center flex-1 basis-14 w-full border-[1px] border-gray-400 outline-none  font-normal'>
                                <label htmlFor="file-upload" className='w-full h-full flex justify-between items-center px-5'>Upload Profile<FiUpload className='text-2xl' /></label>
                                <input type="file" id='file-upload' name="photo" accept='image/*' className='hidden' multiple onChange={changeSelectImageHandler} />
                            </div>
                        </div>
                        <div className='flex flex-wrap justify-center gap-2 w-full mx-auto mt-3'>
                            {imagePreview?.map((val, i) => {
                                return (
                                    <div key={i} className='hover:scale-105 duration-200 relative'>
                                        <RxCross1 className='absolute right-0 hover:text-white hover:bg-red-500' onClick={() => { removePreviewImage(val) }} />
                                        <img src={val} alt="" className='h-44 w-44' />
                                    </div>
                                )
                            })}
                        </div>
                        <button className={`${button ? 'opacity-70 w-full h-[62px] text-white bg-orange-600 mt-[30px] border-none text-xl font-medium' : ' w-full h-[62px] text-white bg-orange-600 hover:bg-orange-700 mt-[30px] border-none text-xl font-medium'}`} disabled={button}  >Add</button>

                    </div>

                </form>
            </div>

        </>
    )
}

export default AddProduct