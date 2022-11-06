import React from 'react'
import AccountInformation from '../../components/AccountInformation/AccountInformation'
import AttendanceInformation from '../../components/AttendanceInformation/AttendanceInformation'
import GroupAttendanceInformation from '../../components/GroupAttendanceInformation/GroupAttendanceInformation'
import useDarkMode from '../../hooks/UseDarkMode/useDarkMode'

const Home = () => {
  useDarkMode()
  return (
    <div className='bg-gray-100 dark:bg-black md:shadow-lg'>
      <AccountInformation/>
      <AttendanceInformation/>
      <GroupAttendanceInformation/>
      <div className='h-32 w-full'></div>
    </div>
  )
}

export default Home