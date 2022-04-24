import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from '../../../components/Alert/Alert'
import ButtonFill from '../../../components/Button/ButtonFill/ButtonFill'
import ButtonIcon from '../../../components/Button/ButtonIcon/ButtonIcon'

const ResultAddGroup = ({groupId}) => {
    const navigate = useNavigate()
    const [isCopied, setIsCopied] = useState(false)

    const handleCopy = () => {
        setIsCopied(true)
        navigator.clipboard.writeText(groupId)
    }
  return (
    <div className='flex flex-col gap-4'>
        <Alert text="Berhasil tambah grup" color="green" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>}/>
        <div className='flex items-center justify-between bg-blue-50 px-4 py-2 rounded-lg'>
          <div>
            <p className='font-bold text-sm text-gray-500'>Kode Grup</p>
            <div className='border-b'>{groupId}</div>
            <span className='text-xs italic text-gray-500'>{ isCopied ? "tersalin!" :  "salin kode berikut untuk masuk grup"}</span>
          </div>
          <div className='flex items-center gap-1'>
            <ButtonIcon actionFunction={handleCopy} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" viewBox="0 0 20 20" fill="currentColor"><path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" /><path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" /></svg>}/>
            <ButtonIcon icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" /></svg>}/>
          </div>
       </div>
        <ButtonFill handleClick={() => navigate('/')} label="Kembali ke Beranda"/>
    </div>
  )
}

export default ResultAddGroup