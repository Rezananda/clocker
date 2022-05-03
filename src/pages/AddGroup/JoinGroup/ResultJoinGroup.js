import React from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from '../../../components/Alert/Alert'
import ButtonOutline from '../../../components/Button/ButtonOutline/ButtonOutline'

const ResultJoinGroup = ({groupCodeData}) => {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col gap-4'>
        <Alert text="Menunggu persetujuan admin." color="yellow" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>}/>
        <ul className='flex flex-col gap-2'>
            <li>Nama Grup: <span className='font-bold'>{groupCodeData.groupName}</span></li>
            <div className='border-t border-gray-300'></div>
            <li>Pemilik Grup: <span className='font-bold'>{groupCodeData.groupOwnerName}</span></li>
        </ul>
        <ButtonOutline handleClick={() => navigate('/')} label="Kembali ke Beranda"/>
    </div>
  )
}

export default ResultJoinGroup