import { Timestamp } from 'firebase/firestore'
import React from 'react'
import UseCheckAttendance from '../../hooks/UseCheckAttendance/UseCheckAttendance'
import useCheckGroup from '../../hooks/UseCheckGroup/useCheckGroup'
import FloatingButton from '../Button/FloatingButton/FloatingButton'
import Chip from '../Chip/Chip'
import ListGroupAttendanceInformation from '../ListGroupAttendanceInformation/ListGroupAttendanceInformation'
import LoadingChip from '../LoadingPulse/LoadingChip'
import LoadingListAttendance from '../LoadingPulse/LoadingListAttendance'


const GroupAttendanceInformation = () => {
  const [initilaizingGroupInfo, groupInfo] = useCheckGroup()
  const [initializeAttendance, attendanceInfo] = UseCheckAttendance()
  
  return (
    <div className='px-4'>
        {initilaizingGroupInfo ? 
        <>
          <LoadingChip/>
        </>
        :
        (groupInfo === false || groupInfo.status === '02') ?
        ""
        :
        (groupInfo.data.groupStatus.length > 0) ?
        <div>
          <p className='font-bold mb-2'>Kehadiran Hari Ini ({new Date().getDate()}/{new Date().getMonth()+1})</p>
          <div className='flex gap-1 overflow-x-auto'>
            <Chip text="Semua" enable={true} emoji={'📖'} /> 
            {groupInfo.data.groupStatus.map((val, index) => 
              <Chip key={index} text={val} enable={false} emoji={val === "WFH"? '🏠': val === "WFO" ? '🏢' : val === 'Sakit' ? '😷' : val === 'Cuti' ? '🏖️' :''}/>
            )}
            <Chip text={"Belum "} emoji={'⛔'} enable={false} /> 
          </div>
          <FloatingButton/>
        </div>
        :
        ""
        }
        
        {initializeAttendance ? 
          <LoadingListAttendance/>
          :
          (attendanceInfo !== "noGroup" && attendanceInfo !== "noAttendance") ? 
          <div className='flex flex-col gap-1'>
            {attendanceInfo.filter(val => val.addDate === new Date(Timestamp.now().seconds*1000).toLocaleDateString()).map((val, index) => 
                <ListGroupAttendanceInformation key={index} val={val}/>
            )}
          </div>
          :
          ""
          }
    </div>
  )
}

export default GroupAttendanceInformation