import React from 'react'

const LetterAvatar = ({letter, handleClick, additionalClass}) => {
  return (
      <div onClick={handleClick} className={`h-10 w-10 text-lg font-bold text-white bg-blue-500 rounded-full flex justify-center items-center uppercase ${additionalClass}`}>{letter}</div>
  )
}

export default LetterAvatar