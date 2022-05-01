import React from 'react'
import { useNavigate } from 'react-router-dom'
import ButtonOutline from '../../../components/Button/ButtonOutline/ButtonOutline'

const ResultReset = () => {
    const navigate = useNavigate()
  return (
    <div className='h-screen flex justify-center items-center px-4'>
        <div className='p-4 bg-white items-center rounded-xl'>
            <div className='flex justify-center mb-4'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
            </div>
            <p className="text-center mb-4">Lakukan reset password pada link yang dikirim pada emailmu.</p>
            <div className='border-t border-gray-150 mb-4'></div>
            <div className='w-full'>
                <ButtonOutline label={'Kembali'} handleClick={() => navigate('/login')}/>
            </div>
        </div>
    </div>
  )
}

export default ResultReset