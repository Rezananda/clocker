import React from 'react'
import { useNavigate } from 'react-router-dom'
import ButtonOutline from '../../../components/Button/ButtonOutline/ButtonOutline'

const ResultJoinGroup = ({groupCodeData}) => {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col gap-4'>
        <div className='flex flex-col items-center justify-center gap-1'>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </span>
          <p className='text-lg font-bold text-center'>MENUNGGU PERSETUJUAN</p>
        </div>
        <ul className='flex flex-col gap-2 text-center bg-blue-50 rounded-xl py-2'>
            <li><p>Nama Grup</p><p className='font-bold text-lg'>{groupCodeData.groupName}</p></li>
            <li><p>Pemilik Grup</p><span className='font-bold text-lg'>{groupCodeData.groupOwnerName}</span></li>
        </ul>
        <ButtonOutline handleClick={() => navigate('/')} label="Kembali ke Beranda"/>
    </div>
  )
}

export default ResultJoinGroup