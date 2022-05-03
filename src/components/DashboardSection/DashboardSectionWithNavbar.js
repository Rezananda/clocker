import React from 'react'
import Navbar from '../Navbar/Navbar'

const DashboardSectionWithNavbar = ({children}) => {
  return (
    <div className='md:flex md:justify-center min-h-screen bg-gray-100 md:items-center'>
        <div className='md:w-2/4 md:px-4 md:py-2 overflow-y-auto'>
            {children}
            <Navbar/>
        </div>
    </div>
  )
}

export default DashboardSectionWithNavbar