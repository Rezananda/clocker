import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ButtonIcon from '../../../components/Button/ButtonIcon/ButtonIcon'
import ButtonOutline from '../../../components/Button/ButtonOutline/ButtonOutline'

const ResultAddGroup = ({groupId}) => {
    const navigate = useNavigate()
    const [isCopied, setIsCopied] = useState(false)

    const handleCopy = () => {
        setIsCopied(!isCopied)
        navigator.clipboard.writeText(groupId)
    }
  return (
    <div className='flex flex-col gap-4'>
        <div className='flex flex-col items-center justify-center gap-1'>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-green-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </span>
          <p className='text-lg font-bold text-center'>BERHASIL</p>
          <p className='text-sm text-center'>Salin atau bagikan Kode Grup agar User dapat masuk ke grupmu. </p>
          <div className='flex items-center justify-between bg-blue-50 w-full px-4 py-2 rounded-lg'>
            <div>
              <p className='font-bold text-sm'>Kode Grup</p>
              <p>{groupId}</p>
            </div>
            <div className='flex items-center gap-1'>
              <div className='relative flex justify-center'>
                <ButtonIcon actionFunction={handleCopy} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" viewBox="0 0 20 20" fill="currentColor"><path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" /><path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" /></svg>}/>
                {isCopied ? 
                <div className="absolute flex bottom-0 flex-col items-center mb-7">
                  <span className="relative z-10 p-2 text-xs leading-none text-white bg-black rounded-lg shadow-lg">Tersalin</span>
                  <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                </div>
                :
                null
                }
              </div>
              <ButtonIcon icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" /></svg>}/>
            </div>
          </div>
        </div>
        <ButtonOutline handleClick={() => navigate('/')} label="Kembali ke Beranda"/>
    </div>
  )
}

export default ResultAddGroup