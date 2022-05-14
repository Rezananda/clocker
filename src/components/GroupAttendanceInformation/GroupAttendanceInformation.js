import { Timestamp } from 'firebase/firestore'
import React from 'react'
import UseCheckAttendance from '../../hooks/UseCheckAttendance/UseCheckAttendance'
import useCheckGroup from '../../hooks/UseCheckGroup/useCheckGroup'
import Alert from '../Alert/Alert'
import ButtonLink from '../Button/ButtonLink/ButtonLink'
import Chip from '../Chip/Chip'
import ListGroupAttendanceInformation from '../ListGroupAttendanceInformation/ListGroupAttendanceInformation'
import LoadingChip from '../LoadingPulse/LoadingChip'
import LoadingListAttendance from '../LoadingPulse/LoadingListAttendance'


const GroupAttendanceInformation = () => {
  const [initilaizingGroupInfo, groupInfo] = useCheckGroup()
  const [initializeAttendance, attendanceInfo] = UseCheckAttendance('now')
  let dateToday = new Date()
  
  return (
    <div>
        {initilaizingGroupInfo ? 
        <>
          <LoadingChip/>
        </>
        :
        (groupInfo === false || groupInfo.status === '02') ?
        ""
        :
        (groupInfo.data.groupStatus.length > 0) ?
        <div className='px-4'>
          <p className='font-bold mb-2'>Kehadiran Hari Ini ({dateToday.getDate()}/{dateToday.getMonth()+1})</p>
          <div className='flex gap-1 overflow-x-auto'>
            <Chip text="Semua" count="20" enable={true} /> 
            {groupInfo.data.groupStatus.map((val, index) => 
              <Chip key={index} text={val} count="5" enable={false}/>
            )}

            <Chip text={"Belum"} count="20" enable={false} /> 
          </div>
        </div>
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
            <p className='font-bold mb-2'>Kehadiran Hari Ini</p>
            <p className='font-bold text-sm text-gray-500 text-center p-4'>-Belum ada grup-</p>
          </>
          :
          (attendanceInfo === 'noAttendance') ? 
          <p className='font-bold text-sm text-gray-500 text-center p-4'>-Belum ada kehadiran-</p>
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