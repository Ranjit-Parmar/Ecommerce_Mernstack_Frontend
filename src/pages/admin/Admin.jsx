import React, { useContext } from 'react'
import Aside from '../../components/admin/aside/Aside'
import Header from '../../components/admin/header/Header'
import { Outlet } from 'react-router-dom'
import { ShopContext } from '../../context/ShopContext'
import { Helmet, HelmetProvider } from 'react-helmet-async'

const Admin = () => {
    const {open} = useContext(ShopContext);
    return (
        <>
        <HelmetProvider>
        <Helmet>
          <html lang="en" />
          <title>Admin-Dashboard- Mern-Ecommerce-App</title>
          <meta
            name="description"
            content="Admin Dashboard- Mern Ecommerce Project For Online Shopping"
          />
        </Helmet>
            <div className="flex h-screen bg-gray-50">

                <aside className={`${open?"w-10 lg:w-auto":"w-0"} top-14 z-30 flex-shrink-0 shadow-md overflow-y-auto bg-white`}>
                    <Aside />
                </aside>

                <div className="flex flex-col flex-1 w-full">
                    <Header/>
                    <main className="h-full overflow-y-auto">
                    <div className="grid lg:px-6 sm:px-4 px-2 mx-auto">
                        <Outlet/>
                    </div>
                    </main>
                </div>

            </div>
            </HelmetProvider>
        </>
    )
}

export default Admin