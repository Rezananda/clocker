import React from 'react'
import AccountInformation from '../../components/AccountInformation/AccountInformation'
import AttendanceInformation from '../../components/AttendanceInformation/AttendanceInformation'
import GroupAttendanceInformation from '../../components/GroupAttendanceInformation/GroupAttendanceInformation'

const Home = () => {
  return (
    <>
      <AccountInformation/>
      <AttendanceInformation/>
      <GroupAttendanceInformation/>
    </>
  )
}

export default Home