import React from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from '../../../components/Alert/Alert'
import ButtonOutline from '../../../components/Button/ButtonOutline/ButtonOutline'
import Input from '../../../components/Input/Input'
import SpinnerLoading from '../../../components/SpinnerLoading/SpinnerLoading'

const Result = ({attendanceData}) => {
    const navigate = useNavigate()
  return (
    <>  
    <div className='flex flex-col gap-4'>
        <Alert type={'success'} text="Berhasil menambah kehadiran"/>
        <div className='border-t border-gray-300'></div>
        <ul className='flex flex-col gap-2'>
          <li><p className=''>Kehadiran</p> <p className='font-bold text-lg'>{attendanceData.status}</p></li>
          <div className='border-t border-gray-300'></div>
          {attendanceData.wfoLocation&&attendanceData.status==='WFO'&&<li><p>Lokasi WFO</p> <p className='font-bold text-lg'>{attendanceData.wfoLocation}</p></li>}
          {attendanceData.startDate&&attendanceData.endDate&&attendanceData.status==='Cuti'&&<li><p >Lama Cuti</p> <p className='font-bold text-lg'>{new Date(attendanceData.startDate).toLocaleDateString()} - {new Date(attendanceData.endDate).toLocaleDateString()}</p></li>}
          {attendanceData.sickReason&&attendanceData.status==='Sakit'&&<li><p>Alasan Sakit</p> <p className='font-bold text-lg'>{attendanceData.sickReason}</p></li>}
          <div className='border-t border-gray-300'></div>
        </ul>
        <ButtonOutline handleClick={() => navigate('/')} label="Kembali ke Beranda"/>
    </div>
    </>
  )
}

export default Result