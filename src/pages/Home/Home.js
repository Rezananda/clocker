import React, { useContext } from 'react'
import AccountInformation from '../../components/AccountInformation/AccountInformation'
import { AuthContext } from '../../context/AuthProvider/AuthProvider'
import AttendanceInformation from '../../components/AttendanceInformation/AttendanceInformation'
import GroupAttendanceInformation from '../../components/GroupAttendanceInformation/GroupAttendanceInformation'

const Home = () => {
    const authContext = useContext(AuthContext)
  return (
    <>
      <AccountInformation displayName={authContext.currentUser.displayName} letter={authContext.currentUser.photoURL}/>
      <AttendanceInformation uid={authContext.currentUser.uid}/>
      <GroupAttendanceInformation uid={authContext.currentUser.uid}/>
    </>
  )
}

export default Home