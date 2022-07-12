import { Timestamp } from 'firebase/firestore'
import moment from 'moment'
import React from 'react'
import ButtonFill from '../../../components/Button/ButtonFill/ButtonFill'
import ButtonOutline from '../../../components/Button/ButtonOutline/ButtonOutline'
import SpinnerLoading from '../../../components/SpinnerLoading/SpinnerLoading'

const Confirmation = ({initilaizingGroupInfo, groupInfo, attendanceData, handleStepAddAttendance, handleAddAttendance, initializeAddAttendance}) => {
  return (
    <>
    {initilaizingGroupInfo ? <SpinnerLoading/> :
    <div className='flex flex-col gap-4'>
      <ul className='flex flex-col gap-2 dark:text-white text-center'>
          <li><p className='font-bold'>Tanggal</p><p className='text-lg'>{moment(Timestamp.now().toDate()).format('DD/MM/YYYY')}</p></li>
          <li><p className='font-bold'>Grup</p><p className='text-lg'>{groupInfo.groupName}</p></li>
          <li><p className='font-bold'>Kehadiran</p> <p className='text-lg'>{attendanceData.status}</p></li>
          {attendanceData.wfoLocation&&<li><p className='font-bold'>Lokasi WFO</p> <p className='text-lg'> {attendanceData.wfoLocation}</p></li>}
          {attendanceData.startDate&&attendanceData.endDate&&<li><p className='font-bold'>Lama Cuti</p> <p className='font-bold text-lg'>{moment(moment(attendanceData.startDate)).format('DD/MM/YYYY')} - {moment(moment(attendanceData.endDate)).format('DD/MM/YYYY')}</p></li>}
          {attendanceData.sickReason&&<li><p className='font-bold'>Alasan Sakit</p> <p className='font-bold text-lg'> {attendanceData.sickReason}</p></li>}
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