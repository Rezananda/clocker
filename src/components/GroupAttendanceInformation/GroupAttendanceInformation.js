import { Timestamp } from 'firebase/firestore'
import React from 'react'
import UseCheckAttendance from '../../hooks/UseCheckAttendance/UseCheckAttendance'
import useCheckGroup from '../../hooks/UseCheckGroup/useCheckGroup'
import Alert from '../Alert/Alert'
import ButtonLink from '../Button/ButtonLink/ButtonLink'
import Chip from '../Chip/Chip'
import ListGroupAttendanceInformation from '../ListGroupAttendanceInformation/ListGroupAttendanceInformation'


const GroupAttendanceInformation = ({uid}) => {
  const [initilaizingGroupInfo, groupInfo] = useCheckGroup(uid)
  const [initializeAttendance, attendanceInfo] = UseCheckAttendance(uid, 'now')

  return (
    <div className='px-4'>
        <p className='font-bold text-md text-gray-500 mb-2'>Kehadiran Hari Ini (14/02)</p>
        {initilaizingGroupInfo ? 
        <p>Loading...</p>
        :
        (groupInfo === false) ?
        ""
        :
        (groupInfo.data.groupStatus.length > 0) ?
        <div className='flex gap-1 overflow-x-auto'>
          <Chip text="Semua" count="20" enable={true} /> 
          {groupInfo.data.groupStatus.map((val, index) => 
            <Chip key={index} text={val} count="5" enable={false}/>
          )}

          <Chip text="Belum Hadir" count="20" enable={false} /> 
        </div>
        :
        ""
        }
        {initializeAttendance ? 
          <p>Loading...</p> :
          (attendanceInfo === 'noGroup') ? 
          <Alert additionalClass="mt-2" text="Belum ada grup" color="yellow" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 flex justify-start" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>}/>
          :
          (attendanceInfo === 'noAttendance')? 
          <Alert additionalClass="mt-2" text="Belum ada kehadiran" color="yellow" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 flex justify-start" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>}/>
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