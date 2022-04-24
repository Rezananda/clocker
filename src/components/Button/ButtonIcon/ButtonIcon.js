import React from 'react'

const ButtonIcon = ({key, icon, actionFunction, handleMouseEnter, handleMouseLeave}) => {
  return (
    <button className='flex justify-center items-center' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={actionFunction}>
        {icon}
    </button>
  )
}

export default ButtonIcon