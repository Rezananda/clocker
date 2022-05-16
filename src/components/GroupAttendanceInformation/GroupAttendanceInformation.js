import { Timestamp } from 'firebase/firestore'
import React from 'react'
import UseCheckAttendance from '../../hooks/UseCheckAttendance/UseCheckAttendance'
import useCheckGroup from '../../hooks/UseCheckGroup/useCheckGroup'
import Chip from '../Chip/Chip'
import ListGroupAttendanceInformation from '../ListGroupAttendanceInformation/ListGroupAttendanceInformation'
import LoadingChip from '../LoadingPulse/LoadingChip'
import LoadingListAttendance from '../LoadingPulse/LoadingListAttendance'


const GroupAttendanceInformation = () => {
  const [initilaizingGroupInfo, groupInfo] = useCheckGroup()
  const [initializeAttendance, attendanceInfo] = UseCheckAttendance('now')
  let dateToday = new Date()
  
  return (
    <div className='px-4'>
        {initilaizingGroupInfo ? 
        <>
          <LoadingChip/>
        </>
        :
        (groupInfo === false || groupInfo.status === '02') ?
        <p className='font-bold mb-2'>Kehadiran Hari Ini</p>
        :
        (groupInfo.data.groupStatus.length > 0) ?
        <div className=''>
          <p className='font-bold mb-2'>Kehadiran Hari Ini ({dateToday.getDate()}/{dateToday.getMonth()+1})</p>
          <div className='flex gap-1 overflow-x-auto mb-2'>
            <Chip text="Semua" enable={true} /> 
            {groupInfo.data.groupStatus.map((val, index) => 
              <Chip key={index} text={val} enable={false}/>
            )}

            <Chip text={"Belum_hadir"} enable={false} /> 
          </div>
        </div>
        :
        ""
        }
        {initializeAttendance ? 
          <LoadingListAttendance/>
          :
          (attendanceInfo !== "noGroup" && attendanceInfo !== "noAttendance") ? 
          <div>
            {attendanceInfo.filter(val => val.addDate === new Date(Timestamp.now().seconds*1000).toLocaleDateString()).map((val, index) => 
                <ListGroupAttendanceInformation key={index} val={val}/>
            )}
          </div>
          :
          (attendanceInfo === 'noGroup') ? 
          <>
            <p className='font-bold mb-2'>Kehadiran Hari Ini</p>
            <p className='font-bold text-sm text-gray-500 text-center p-4'>-Belum ada grup-</p>
          </>
          :
          (attendanceInfo === 'noAttendance') ? 
          <>
            <p className='font-bold text-sm text-gray-500 text-center p-4'>-Belum ada kehadiran-</p>
          </>
          :
          ""
          }
    </div>
  )
}

export default GroupAttendanceInformation