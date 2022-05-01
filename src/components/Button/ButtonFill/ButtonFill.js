import React from 'react'

const ButtonFill = ({type, handleClick, label, additionalClass, disabled}) => {
  return (
    <div>
        <button disabled={disabled} onClick={handleClick} className={`${additionalClass} w-full rounded-full px-2 py-2 border-2 text-white text-lg font-bold`}>{label}</button>
    </div>
  )
}

export default ButtonFill