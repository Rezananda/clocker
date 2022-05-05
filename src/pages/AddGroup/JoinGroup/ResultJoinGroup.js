import React from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from '../../../components/Alert/Alert'
import ButtonOutline from '../../../components/Button/ButtonOutline/ButtonOutline'

const ResultJoinGroup = ({groupCodeData}) => {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col gap-4'>
        <Alert text="Menunggu persetujuan admin." type={'info'}/>
        <ul className='flex flex-col gap-2'>
            <li>Nama Grup: <span className='font-bold'>{groupCodeData.groupName}</span></li>
            <div className='border-t border-gray-300'></div>
            <li>Pemilik: <span className='font-bold'>{groupCodeData.groupOwnerName}</span></li>
        </ul>
        <ButtonOutline handleClick={() => navigate('/')} label="Kembali ke Beranda"/>
    </div>
  )
}

export default ResultJoinGroup