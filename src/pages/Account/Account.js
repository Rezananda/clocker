import { signOut } from 'firebase/auth'
import React, { useState } from 'react'
import { useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import LetterAvatar from '../../components/LetterAvatar/LetterAvatar'
import TopNavbar from '../../components/Navbar/TopNavbar'
import { AuthContext } from '../../context/AuthProvider/AuthProvider'
import useRouteContext from '../../hooks/UseRouteContext/UseRouteContext'
import { auth } from '../../utils/Firebase/Firebase'

const Account = () => {
    const user = useContext(AuthContext)
    const [logout, setLogout] = useState(false)
    const {handleRoute} = useRouteContext()
    const handlelogout = () =>{
      handleRoute(0)
      setLogout(true)
      signOut(auth)
    }
    
    const navigate = useNavigate()

    if(logout){
      return <Navigate to={'/login'}/>
    }
  return (
    <>
      <style>
      {
        `.scrollable::-webkit-scrollbar {
          display: none;
      }`
      }
      </style>
      <div className='flex flex-col gap-4 h-screen overflow-y-auto scrollable md:shadow-lg'>
          <TopNavbar navbarColor={`bg-blue-500`} label={`Akun`} labelColor={`text-white`} navigateTo={false}/>
          <div className='flex flex-col gap-1 items-center p-5'>
            <LetterAvatar letter={user.currentUser.displayName.split(" ").shift().charAt(0) + user.currentUser.displayName.split(" ").pop().charAt(0)}/>
            <p className='text-xl font-bold dark:text-white'>{user.currentUser.displayName}</p>
          </div>

          <div className='px-4'>
            <ul className='flex flex-col rounded-xl bg-white dark:bg-slate-800'>
              <li className='py-3 cursor-pointer flex items-center justify-between text-gray-600 px-4 border-b border-gray-200 dark:border-gray-600' onClick={() => navigate('/detail-profile')}>
                <div className='flex items-center gap-2 dark:text-white'>              
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <p>Profil</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 dark:text-white" viewBox="0 0 20 20" fill="currentColor" >
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </li>
              <li className='py-3 cursor-pointer flex items-center justify-between text-gray-600 px-4 border-b border-gray-200 dark:border-gray-600' onClick={() => navigate('/update-password')}>
                <div className='flex items-center gap-2 dark:text-white'>              
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <p>Ubah Password</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 dark:text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </li>
              <li className='py-3 cursor-pointer flex items-center justify-between text-gray-600 px-4 border-b border-gray-200 dark:border-gray-600' onClick={() => navigate('/settings')}>
                <div className='flex items-center gap-2 dark:text-white'>              
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                  <p>Pengaturan</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 dark:text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </li>
              <li className='py-3 cursor-pointer flex items-center justify-between text-gray-600 px-4 border-b border-gray-200 dark:border-gray-600' onClick={() => navigate('/about')}>
                <div className='flex items-center gap-2 dark:text-white'>              
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                  <p>Tentang</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 dark:text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </li>
              <li className='py-3 cursor-pointer flex items-center justify-between text-gray-600 px-4' onClick={() => handlelogout()}>
                <div className='flex items-center gap-2 dark:text-white'>  
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                  <p>Keluar</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 dark:text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </li>
            </ul>
          </div>
      </div>
    </>
    
  )
}

export default Account