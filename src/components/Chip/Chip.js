import React from 'react'

const Chip = ({text, enable, count, isCount, handleClick, color}) => {
  return (
    <button onClick={handleClick} className={`px-2 py-1 ${enable ? `bg-${color}-100 text-${color}-500` : 'text-gray-500'}  rounded-full`}>
      <div className='flex gap-1 items-center text-sm font-bold'>
        <p className='flex truncate'>{text}</p> 
        {isCount? 
        <span className={`flex items-center justify-center rounded-full w-5 h-5 text-xs ${enable ? `text-white bg-${color}-500` : 'text-gray-500 bg-gray-200'}`}>{count}</span>
        :
        null
        }
      </div>
    </button>  
  )
}

export default Chip