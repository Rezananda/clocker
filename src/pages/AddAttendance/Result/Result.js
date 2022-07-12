import React from 'react'
import { useNavigate } from 'react-router-dom'
import ButtonOutline from '../../../components/Button/ButtonOutline/ButtonOutline'

const Result = ({initilaizingGroupInfo, groupInfo, attendanceData}) => {
    const navigate = useNavigate()
  return (
    <>
    <div className='flex flex-col gap-4'>
        <div className='flex flex-col items-center justify-center gap-1'>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-green-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </span>
          <p className='text-lg font-bold text-center dark:text-white'>BERHASIL TAMBAH KEHADIRAN</p>
        </div>
        <ul className='flex flex-col gap-2 text-center bg-blue-50 rounded-xl py-2'>
          <li><p className='font-bold'>Kehadiran</p> <p className='text-lg'>{attendanceData.status}</p></li>
          {attendanceData.wfoLocation&&<li className=''><p className='font-bold'>Lokasi WFO</p> <p className='text-lg'>{attendanceData.wfoLocation}</p></li>}
          {attendanceData.startDate&&attendanceData.endDate&&<li className=''><p className='font-bold'>Lama Cuti</p> <p className='text-lg'>{new Date(attendanceData.startDate).toLocaleDateString()} - {new Date(attendanceData.endDate).toLocaleDateString()}</p></li>}
          {attendanceData.sickReason&&<li className=''><p className='font-bold'>Alasan Sakit</p> <p className='text-lg'>: {attendanceData.sickReason}</p></li>}
        </ul>
        <ButtonOutline handleClick={() => navigate('/')} label="Kembali ke Beranda"/>
    </div>
    </>
  )
}

export default Result