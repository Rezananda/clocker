import React from 'react'
import { useNavigate } from 'react-router-dom'

const FloatingButton = ({icon, action}) => {
  const navigate = useNavigate()
  return (
    <button onClick={()=> navigate(action)} className='flex items-center justify-center rounded-full bg-blue-500 p-2 fixed bottom-0 right-0 mr-4 mb-20 z-20 drop-shadow-lg'>
      {icon}
    </button>
  )
}

export default FloatingButton