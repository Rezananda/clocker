import React from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from '../../../components/Alert/Alert'
import ButtonOutline from '../../../components/Button/ButtonOutline/ButtonOutline'

const ResultJoinGroup = () => {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col gap-4'>
        <Alert text="Berhasil bergabung dengan grup. Tunggu persetujuan dari admin" color="green" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>}/>
        <ButtonOutline handleClick={() => navigate('/')} label="Kembali ke Beranda"/>
    </div>
  )
}

export default ResultJoinGroup