import React from 'react'

const LetterAvatar = ({letter, size}) => {
  return (
      <div className='h-10 w-10 text-lg font-bold text-white bg-blue-500 rounded-full flex justify-center items-center'>{letter}</div>
  )
}

export default LetterAvatar