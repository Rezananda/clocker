import React from 'react'

export const DashboardSectionWithoutNavbar = ({children}) => {
  return (
    <div className='md:flex md:justify-center md:items-center h-screen bg-gray-100 flex flex-col dark:bg-black transition duration-300 delay-150'>
        {children}
    </div>
  )
}
export default DashboardSectionWithoutNavbar
