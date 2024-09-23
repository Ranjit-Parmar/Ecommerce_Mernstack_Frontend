import './App.css'
import { Outlet } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { Helmet, HelmetProvider } from 'react-helmet-async';



function App() {
  
  
  return (
     <>
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
