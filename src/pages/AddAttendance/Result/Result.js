import React from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from '../../../components/Alert/Alert'
import ButtonOutline from '../../../components/Button/ButtonOutline/ButtonOutline'

const Result = ({initilaizingGroupInfo, groupInfo, attendanceData}) => {
    const navigate = useNavigate()
  return (
    <div className='flex flex-col gap-4'>
        <Alert text="Berhasil menambah kehadiran" color="green" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>} />
        <ul className='flex flex-col gap-2'>
            <li className='flex items-center'><p>Waktu</p> <p className='font-bold'>: {new Date().toDateString()}</p></li>
            <div className='border-t border-gray-300'></div>
            {initilaizingGroupInfo ? <p>Loading...</p> :
            <li className='flex items-center'><p>Grup</p> <p className='font-bold'>: {groupInfo.data.groupName}</p></li>
            }
            <div className='border-t border-gray-300'></div>
            <li className='flex items-center'><p>Kehadiran</p> <p className='font-bold'>: {attendanceData.status}</p></li>
            <div className='border-t border-gray-300'></div>
            <li className='flex items-center'><p>Status</p> <p className='font-bold'>: Berhasil</p></li>
            <div className='border-t border-gray-300'></div>
        </ul>
        <ButtonOutline handleClick={() => navigate(-1)} label="Kembali ke Beranda"/>
    </div>
  )
}

export default Result