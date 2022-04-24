import React from 'react'

const ButtonOutline = ({type, handleClick, label, additionalClass}) => {
  return (
    <div>
      <button onClick={handleClick} className={`w-full rounded-full px-2 py-2 border-2 border-blue-500 bg-white text-blue-500 text-lg font-bold ${additionalClass}`}>{label}</button>
    </div>
  )
}

export default ButtonOutline