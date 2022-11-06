import React from 'react'
import Navbar from '../Navbar/Navbar'

const DashboardSectionWithNavbar = ({children}) => {
  return (
        <div className='flex flex-col h-screen bg-gray-100 dark:bg-black md:flex md:justify-center md:items-center'>
          {/* <div className='md:w-1/4 transition duration-300 delay-150'> */}
            {children}
          {/* </div> */}
          <Navbar/>
        </div>
  )
}

export default DashboardSectionWithNavbar