import { Timestamp } from 'firebase/firestore'
import React from 'react'
import UseCheckAttendance from '../../hooks/UseCheckAttendance/UseCheckAttendance'
import useCheckGroup from '../../hooks/UseCheckGroup/useCheckGroup'
import useUserContext from '../../hooks/UseUserContext/UseUserContext'
import Alert from '../Alert/Alert'
import ButtonLink from '../Button/ButtonLink/ButtonLink'
import Chip from '../Chip/Chip'
import ListGroupAttendanceInformation from '../ListGroupAttendanceInformation/ListGroupAttendanceInformation'
import LoadingChip from '../LoadingPulse/LoadingChip'
import LoadingListAttendance from '../LoadingPulse/LoadingListAttendance'


const GroupAttendanceInformation = () => {
  const userContext = useUserContext()
  const uid = userContext.currentUser.uid
  const [initilaizingGroupInfo, groupInfo] = useCheckGroup(uid)
  const [initializeAttendance, attendanceInfo] = UseCheckAttendance(uid, 'now')
  let dateToday = new Date()

  return (
    <div className='px-4'>
        {initilaizingGroupInfo ? 
        <>
          <LoadingChip/>
        </>
        :
        (groupInfo === false) ?
        ""
        :
        (groupInfo.data.groupStatus.length > 0) ?
        <>
          <p className='font-bold text-md text-gray-500 mb-2'>Kehadiran Hari Ini ({dateToday.getDate()}/{dateToday.getMonth()+1})</p>
          <div className='flex gap-1 overflow-x-auto'>
            <Chip text="Semua" count="20" enable={true} /> 
            {groupInfo.data.groupStatus.map((val, index) => 
              <Chip key={index} text={val} count="5" enable={false}/>
            )}

            <Chip text={"Belum"} count="20" enable={false} /> 
          </div>
        </>
        :
        ""
        }
        {initializeAttendance ? 
          <>
            <LoadingListAttendance/>
          </>
          :
          (attendanceInfo === 'noGroup') ? 
          <>
            <p className='font-bold text-md text-gray-500 mb-2'>Kehadiran Hari Ini</p>
            <Alert additionalClass="mt-2" text="Belum ada grup." type={'info'}/>
          </>
          :
          (attendanceInfo === 'noAttendance')? 
          <Alert additionalClass="mt-2" text="Belum ada kehadiran" type={'info'}/>
          :
          <>
          {attendanceInfo.map((val, index) => val.addDate === new Date(Timestamp.now().seconds*1000).toLocaleDateString() ?
            <ListGroupAttendanceInformation key={index} letter={val.photoURL} dateAdd={val.timestamp} displayName={val.userName} statusAttendance={val.status}/>
            :
            ""
          )}
            <div className='flex justify-center mt-2'>
              <ButtonLink label="Selanjutnya" newProps="text-xs"/>
            </div>
          </>
          }
    </div>
  )
}

export default GroupAttendanceInformation