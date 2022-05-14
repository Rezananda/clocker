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
    <div className='flex w-full p-4 bg-white mb-4 rounded-b-2xl items-center justify-between border-b border-gray-200'>
      <div className='flex items-center'>
        <p className='text-xl'>Halo,</p>
        <p className='ml-1 text-xl font-bold'>{displayName} </p>
        <span className='ml-1 text-lg' role="img" aria-label="sheep">👋</span>
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