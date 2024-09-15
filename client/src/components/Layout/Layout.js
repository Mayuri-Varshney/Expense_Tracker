 import React from 'react'
import Footer from './Footer'
import Header from './Header'
 const Layout = ({children}) =>{
    return (
        <>
    <Header />
    <div className='content h-3/5 border-2'>
            {children}
    </div>
    {/* <Footer /> */}
        </>
    )
 }


 export default Layout