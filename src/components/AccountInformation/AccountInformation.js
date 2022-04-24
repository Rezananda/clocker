import React from 'react'
import LetterAvatar from '../LetterAvatar/LetterAvatar'

const AccountInformation = ({displayName, letter}) => {  
  return (
    <div className='flex w-full px-4 py-2 bg-white mb-4 rounded-b-2xl items-center justify-between'>
      <div className=''>
        <div className='flex items-center'>
          <p className=''>Hello </p>
          <span className='ml-1 text-lg' role="img" aria-label="sheep">👋</span>
        </div>
          <p className='text-lg font-bold'>{displayName} </p>
      </div>
      <div>
        <LetterAvatar letter={letter}/>
      </div>
    </div>
  )
}

export default AccountInformation