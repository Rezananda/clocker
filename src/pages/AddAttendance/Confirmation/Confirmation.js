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
          <Input type="text" handleChange={() => new Date().toISOString().split('T')[0]} value={new Date().toISOString().split('T')[0]} readOnly={true} additionalClass="text-gray-500 text-center"/>
          <Input type="text" handleChange={() => groupInfo.data.groupName} value={groupInfo.data.groupName} readOnly={true} additionalClass="text-gray-500 text-center"/>
      </div>
      <ul className='flex flex-col gap-2'>
          <li className='flex items-center'><p>Kehadiran</p> <p className='font-bold'>: {attendanceData.status}</p></li>
          <div className='border-t border-gray-300'></div>
          {attendanceData.wfoLocation&&<li className='flex items-center'><p>Lokasi WFO</p> <p className='font-bold'>: {attendanceData.wfoLocation}</p></li>}
          {attendanceData.startDate&&attendanceData.endDate&&<li className='flex items-center'><p>Lama Cuti</p> <p className='font-bold'>: {new Date(attendanceData.startDate).toLocaleDateString()} - {new Date(attendanceData.endDate).toLocaleDateString()}</p></li>}
          {attendanceData.sickReason&&<li className='flex items-center'><p>Alasan Sakit</p> <p className='font-bold'>: {attendanceData.sickReason}</p></li>}
      </ul>
      <ButtonFill additionalClass={`bg-blue-500 border-blue-500`} label="Tambah" handleClick={() => handleAddAttendance()}/>
      <ButtonOutline label="Kembali" handleClick={() => handleStepAddAttendance('prev')}/>
      {initializeAddAttendance&&<SpinnerLoading/>}
    </div>
    }
    </>
  )
}

export default Confirmation