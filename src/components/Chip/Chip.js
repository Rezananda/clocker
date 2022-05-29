import React from 'react'

const Chip = ({text, enable, emoji, handleClick}) => {
  return (
    <button onClick={handleClick} className={`flex gap-1 items-center text-sm font-bold px-2 py-1 mb-2 ${enable ? 'bg-blue-100 text-blue-500' : 'text-gray-500'}  rounded-full`}>
      <span className='flex'>{text}</span> 
      <span>{emoji}</span>
    </button>  
  )
}

export default Chip