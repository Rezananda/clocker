import React from 'react'
import AccountInformation from '../../components/AccountInformation/AccountInformation'
import AttendanceInformation from '../../components/AttendanceInformation/AttendanceInformation'
import GroupAttendanceInformation from '../../components/GroupAttendanceInformation/GroupAttendanceInformation'
import useUserContext from '../../hooks/UseUserContext/UseUserContext'

const Home = () => {
    const userContext = useUserContext()
  return (
    <>
      <AccountInformation displayName={userContext.currentUser.displayName} letter={userContext.currentUser.photoURL}/>
      <AttendanceInformation uid={userContext.currentUser.uid}/>
      <GroupAttendanceInformation uid={userContext.currentUser.uid}/>
    </>
  )
}

export default Home