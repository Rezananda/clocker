import { signOut } from 'firebase/auth'
import React, { useState } from 'react'
import { useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import LetterAvatar from '../../components/LetterAvatar/LetterAvatar'
import { AuthContext } from '../../context/AuthProvider/AuthProvider'
import { auth } from '../../utils/Firebase/Firebase'

const Account = () => {
    const user = useContext(AuthContext)
    const [logout, setLogout] = useState(false)
    const handlelogout = () =>{
      setLogout(true)
      signOut(auth)
    }
    if(logout){
      return <Navigate to={'/login'}/>
    }
  return (
    <div>
        <nav className='py-3 px-2 bg-blue-500'>
          <p className='text-lg font-bold text-white'>
              Akun
          </p>
        </nav>
        <div className='flex flex-col gap-1 items-center p-10'>
          <LetterAvatar letter={user.currentUser.displayName.split(" ").shift().charAt(0) + user.currentUser.displayName.split(" ").pop().charAt(0)}/>
          <p className='font-bold'>{user.currentUser.displayName}</p>
        </div>
        <ul className='divide-y'>
          <li className='bg-white p-2 cursor-pointer' onClick={handlelogout}>
            Keluar
          </li>
        </ul>
    </div>
    
  )
}

export default Account