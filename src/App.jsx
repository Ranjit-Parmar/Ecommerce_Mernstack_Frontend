import './App.css'
import { Outlet } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useMyCartItemsQuery } from './redux/Api/cartApi';
import Loader from './components/Loader/Loader';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCartItems } from './redux/reducers/cartReducer';



function App() {
  
  const {data, isLoading, isError} = useMyCartItemsQuery();
  const dispatch = useDispatch();

  if(isError){
    console.log(isError);
    
  }

  useEffect(()=>{

    dispatch((fetchCartItems(data?.cartItem || [])))

  },[data, isLoading])

  
  return (
     isLoading? <Loader/> : <>
     <HelmetProvider>
     <Helmet>
          <html lang="en" />
          <title>Shopping App</title>
          <meta
            name="description"
            content="Mern Ecommerce Project For Online Shopping "
          />
        </Helmet>
      <Header />
      <Outlet />
      <Footer />

     </HelmetProvider>
    </>
  )
}




export default App
