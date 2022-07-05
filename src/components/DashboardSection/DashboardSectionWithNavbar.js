import React from 'react'
import Navbar from '../Navbar/Navbar'

const DashboardSectionWithNavbar = ({children}) => {
  return (
        <div className='min-h-screen flex flex-col h-screen bg-white md:flex md:justify-center md:items-center'>
          <div className='flex-grow md:w-1/4 bg-gray-100 drop-shadow-xl dark:bg-black transition duration-300 delay-150'>
            {children}
          </div>
          <Navbar/>
        </div>
  )
}

export default DashboardSectionWithNavbar