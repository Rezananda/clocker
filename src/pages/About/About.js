import React from 'react'
import TopNavbar from '../../components/Navbar/TopNavbar'

const About = () => {
  return (
    <div>
        <TopNavbar navbarColor={'bg-blue-500'} label={'Tentang'} labelColor={'text-white'} back={true} navigateTo={-1}/>
        <div className='px-4 py-4'>
            <div className='bg-white rounded-lg px-4 py-4 border border-gray-200'>
                <p className='text-sm text-gray-500 text-center'>Made with ❤️ by Rezananda</p>
                <p className='text-sm text-gray-500 text-center'>&copy; Copyright 2022</p>
            </div>
        </div>
    </div>
  )
}

export default About