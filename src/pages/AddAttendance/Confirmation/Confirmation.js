import React from 'react'
import ButtonFill from '../../../components/Button/ButtonFill/ButtonFill'
import ButtonOutline from '../../../components/Button/ButtonOutline/ButtonOutline'
import Input from '../../../components/Input/Input'
import SpinnerLoading from '../../../components/SpinnerLoading/SpinnerLoading'

const Confirmation = ({initilaizingGroupInfo, groupInfo, attendanceData, handleStepAddAttendance, handleAddAttendance, initializeAddAttendance}) => {
  return (
    <>
    {initilaizingGroupInfo ? <SpinnerLoading/> :
    <div className='flex flex-col gap-4'>
      <div className='flex gap-2'>
          <div className='flex items-center justify-center bg-blue-100 rounded-lg px-4 py-1 text-blue-500 text-lg'>{new Date(Date.now()).toLocaleDateString()}</div>
          <div className='flex items-center justify-center bg-blue-100 rounded-lg px-4 py-1 text-blue-500 text-lg'>{groupInfo.data.groupName}</div>
      </div>
      <div className='border-t border-gray-300'></div>
      <ul className='flex flex-col gap-2'>
          <li><p className=''>Kehadiran</p> <p className='font-bold text-lg'>{attendanceData.status}</p></li>
          <div className='border-t border-gray-300'></div>
          {attendanceData.wfoLocation&&<li className='flex items-center'><p className=''>Lokasi WFO</p> <p className='font-bold text-lg'>: {attendanceData.wfoLocation}</p></li>}
          {attendanceData.startDate&&attendanceData.endDate&&<li className=''><p className=''>Lama Cuti</p> <p className='font-bold text-lg'>{new Date(attendanceData.startDate).toLocaleDateString()} - {new Date(attendanceData.endDate).toLocaleDateString()}</p></li>}
          {attendanceData.sickReason&&<li className='flex items-center'><p className=''>Alasan Sakit</p> <p className='font-bold text-lg'>: {attendanceData.sickReason}</p></li>}
          <div className='border-t border-gray-300'></div>
      </ul>
      <div className='flex flex-col gap-2'>
        <ButtonFill additionalClass={`bg-blue-500 border-blue-500`} label="Tambah" handleClick={() => handleAddAttendance()}/>
        <ButtonOutline label="Kembali" handleClick={() => handleStepAddAttendance('prev')}/>
      </div>
      {initializeAddAttendance&&<SpinnerLoading/>}
    </div>
    }
    </>
  )
}

export default Confirmation