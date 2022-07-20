import React from 'react'
import { Link } from 'react-router-dom'
import useRouteContext from '../../hooks/UseRouteContext/UseRouteContext'
import useUserContext from '../../hooks/UseUserContext/UseUserContext'
import LetterAvatar from '../LetterAvatar/LetterAvatar'

const AccountInformation = () => {  
  const userContext = useUserContext()
  const displayName = userContext.currentUser.displayName.split(' ')[0]
  const letter = userContext.currentUser.photoURL

  const {handleRoute} = useRouteContext()

  return (
    <div className='flex w-full p-4 bg-white mb-4 rounded-b-2xl items-center justify-between dark:bg-slate-800 dark:border-gray-600'>
      <div className='flex items-center dark:text-white'>
        <p className='text-xl'>Hi,</p>
        <p className='ml-1 text-xl font-bold uppercase'>{displayName} </p>
      </div>
      <div>
        <Link to={'/profile'} onClick={() => handleRoute(3)}>
          <LetterAvatar letter={letter}/>
        </Link>
      </div>
    </div>
  )
}

export default AccountInformation