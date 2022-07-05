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
    <div>
        <TopNavbar navbarColor={`bg-blue-500`} label={`Akun`} labelColor={`text-white`} navigateTo={false}/>
        <div className='flex flex-col gap-1 items-center p-5'>
          <LetterAvatar letter={user.currentUser.displayName.split(" ").shift().charAt(0) + user.currentUser.displayName.split(" ").pop().charAt(0)}/>
          <p className='text-xl font-bold dark:text-white'>{user.currentUser.displayName}</p>
        </div>

        <div className='px-4'>
          <ul className='flex flex-col border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-slate-800'>
            <li className='py-3 cursor-pointer flex items-center justify-between text-gray-600 px-4 border-b border-gray-200 dark:border-gray-600' onClick={() => navigate('/my-attendance')}>
              <div className='flex items-center gap-1 dark:text-white'>
                <p>🕗</p>
                <p>Kehadiran Saya</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 dark:text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </li>
            <li className='py-3 cursor-pointer flex items-center justify-between text-gray-600 px-4 border-b border-gray-200 dark:border-gray-600' onClick={() => navigate('/detail-profile')}>
              <div className='flex items-center gap-1 dark:text-white'>              
                <p>😀</p>
                <p>Profil</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 dark:text-white" viewBox="0 0 20 20" fill="currentColor" >
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </li>
            <li className='py-3 cursor-pointer flex items-center justify-between text-gray-600 px-4 border-b border-gray-200 dark:border-gray-600' onClick={() => navigate('/update-password')}>
              <div className='flex items-center gap-1 dark:text-white'>              
                <p>🔐</p>
                <p>Ubah Password</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 dark:text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </li>
            <li className='py-3 cursor-pointer flex items-center justify-between text-gray-600 px-4 border-b border-gray-200 dark:border-gray-600' onClick={() => navigate('/settings')}>
              <div className='flex items-center gap-1 dark:text-white'>              
                <p>⚙️</p>
                <p>Pengaturan</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 dark:text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </li>
            <li className='py-3 cursor-pointer flex items-center justify-between text-gray-600 px-4 border-b border-gray-200 dark:border-gray-600' onClick={() => navigate('/about')}>
              <div className='flex items-center gap-1 dark:text-white'>              
                <p>ℹ️</p>
                <p>Tentang</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 dark:text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </li>
            <li className='py-3 cursor-pointer flex items-center justify-between text-gray-600 px-4' onClick={() => handlelogout()}>
              <div className='flex items-center gap-1 dark:text-white'>  
                <p>➡️</p>
                <p>Keluar</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 dark:text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </li>
          </ul>
        </div>
    </div>
    
  )
}

export default Account