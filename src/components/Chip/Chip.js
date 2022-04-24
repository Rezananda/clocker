import React from 'react'

const Chip = ({text, count, enable}) => {
  return (
    <button className={`flex items-center text-xs font-bold px-1 mb-2 h-7 ${enable ? 'bg-blue-100 text-blue-500' : 'bg-gray-300 text-gray-500'}  rounded-full`}>{text} <div className={`flex ml-1 items-center justify-center ${enable? 'bg-red-500' : 'bg-gray-400' }  rounded-full text-xs text-white h-5 w-5`}>{count}</div></button>
  )
}

export default Chip