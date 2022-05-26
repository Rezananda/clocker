import React from 'react'

const Chip = ({text, enable, emoji, handleClick}) => {
  return (
    <button onClick={handleClick} className={`flex items-center text-xs font-bold px-2 py-1 mb-2 ${enable ? 'bg-blue-100 text-blue-500' : 'text-gray-500'}  rounded-full`}>{text} <span className={`flex ml-1`}>{emoji}</span></button>  )
}

export default Chip