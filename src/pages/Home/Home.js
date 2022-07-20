import React from 'react'
import AccountInformation from '../../components/AccountInformation/AccountInformation'
import AttendanceInformation from '../../components/AttendanceInformation/AttendanceInformation'
import GroupAttendanceInformation from '../../components/GroupAttendanceInformation/GroupAttendanceInformation'
import useDarkMode from '../../hooks/UseDarkMode/useDarkMode'

const Home = () => {
  useDarkMode()
  return (
    <>
      <style>
        {
          `.scrollable::-webkit-scrollbar {
            display: none;
        }`
        }
      </style>
      <div className='h-screen overflow-y-auto scrollable'>
        <AccountInformation/>
        <AttendanceInformation/>
        <GroupAttendanceInformation/>
        <div className='h-96 w-full'></div>
      </div>
    </>
  )
}

export default Home