import React from 'react'

const Chip = ({text, enable, emoji, handleClick}) => {
  return (
    <button onClick={handleClick} className={`px-2 py-1 mb-2 ${enable ? 'bg-blue-100 text-blue-500' : 'text-gray-500'}  rounded-full`}>
      <div className='flex gap-1 items-center text-sm font-bold'>
        <p className='flex truncate'>{text}</p> 
        <span>{emoji}</span>
      </div>
    </button>  
  )
}

export default Chip