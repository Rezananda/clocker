import React from 'react'
import ButtonFill from '../../../components/Button/ButtonFill/ButtonFill'
import ButtonOutline from '../../../components/Button/ButtonOutline/ButtonOutline'
import SpinnerLoading from '../../../components/SpinnerLoading/SpinnerLoading'

const Confirmation = ({initilaizingGroupInfo, groupInfo, attendanceData, handleStepAddAttendance, handleAddAttendance, initializeAddAttendance}) => {
  return (
    <div className='flex flex-col gap-4'>
        <ul className='flex flex-col gap-2'>
            <li className='flex items-center'><p>Waktu</p> <p className='font-bold'>: {new Date().toDateString()}</p></li>
            <div className='border-t border-gray-300'></div>
            {initilaizingGroupInfo ? <p>Loading...</p> :
            <li className='flex items-center'><p>Grup</p> <p className='font-bold'>: {groupInfo.data.groupName}</p></li>
            }
            <div className='border-t border-gray-300'></div>
            <li className='flex items-center'><p>Kehadiran</p> <p className='font-bold'>: {attendanceData.status}</p></li>
            <div className='border-t border-gray-300'></div>
        </ul>
        <ButtonFill label="Tambah" handleClick={() => handleAddAttendance()}/>
        <ButtonOutline label="Kembali" handleClick={() => handleStepAddAttendance('prev')}/>
        {initializeAddAttendance&&<SpinnerLoading/>}
    </div>
  )
}

export default Confirmation