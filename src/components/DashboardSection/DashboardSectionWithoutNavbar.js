import React from 'react'

export const DashboardSectionWithoutNavbar = ({children}) => {
  return (
    <div className='md:flex md:justify-center min-h-screen bg-gray-100 md:items-center'>
        <div className='md:w-2/4 md:px-4 md:py-2 overflow-y-auto'>
            {children}
        </div>
    </div>
  )
}
export default DashboardSectionWithoutNavbar
