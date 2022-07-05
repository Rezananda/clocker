import React from 'react'
import ButtonFill from '../../../components/Button/ButtonFill/ButtonFill'
import ButtonOutline from '../../../components/Button/ButtonOutline/ButtonOutline'
import Input from '../../../components/Input/Input'
import SpinnerLoading from '../../../components/SpinnerLoading/SpinnerLoading'

const Confirmation = ({attendanceData, handleStepUpdateAttendance, handleUpdateAttendance, initializeUpdateAttendance}) => {
  return (
    <>
    <div className='flex flex-col gap-4'>
      <ul className='flex flex-col gap-2 dark:text-white'>
          <li><p>Kehadiran</p> <p className='font-bold text-lg'>{attendanceData.status}</p></li>
          {attendanceData.wfoLocation&&attendanceData.status==='WFO'&&<li><p>Lokasi WFO</p> <p className='font-bold text-lg'>{attendanceData.wfoLocation}</p></li>}
          {attendanceData.startDate&&attendanceData.endDate&&attendanceData.status==='Cuti'&&<li><p >Lama Cuti</p> <p className='font-bold text-lg'>{new Date(attendanceData.startDate).toLocaleDateString()} - {new Date(attendanceData.endDate).toLocaleDateString()}</p></li>}
          {attendanceData.sickReason&&attendanceData.status==='Sakit'&&<li><p>Alasan Sakit</p> <p className='font-bold text-lg'>{attendanceData.sickReason}</p></li>}
      </ul>
      <div className='flex flex-col gap-2'>
        <ButtonFill additionalClass={`bg-blue-500 border-blue-500`} label="Ubah" handleClick={() => handleUpdateAttendance()}/>
        <ButtonOutline label="Kembali" handleClick={() => handleStepUpdateAttendance('prev')}/>
      </div>
      {initializeUpdateAttendance&&<SpinnerLoading/>}
    </div>
    </>
  )
}

export default Confirmation