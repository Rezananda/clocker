import React from 'react'
import { useNavigate } from 'react-router-dom'

const FloatingButton = () => {
  const navigate = useNavigate()
  return (
    <button onClick={()=> navigate('/my-date')} className='flex items-center justify-center rounded-full bg-blue-500 p-2 fixed bottom-0 right-0 mr-4 mb-20 z-20 drop-shadow-lg'>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
    </button>
  )
}

export default FloatingButton