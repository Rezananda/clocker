import { Timestamp } from 'firebase/firestore'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import UseCheckAttendance from '../../hooks/UseCheckAttendance/UseCheckAttendance'
import useCheckGroup from '../../hooks/UseCheckGroup/useCheckGroup'
import FloatingButton from '../Button/FloatingButton/FloatingButton'
import Chip from '../Chip/Chip'
import ListGroupAttendanceInformation from '../ListGroupAttendanceInformation/ListGroupAttendanceInformation'
import LoadingChip from '../LoadingPulse/LoadingChip'
import LoadingListAttendance from '../LoadingPulse/LoadingListAttendance'


const GroupAttendanceInformation = () => {
  const [initilaizingGroupInfo, groupInfo] = useCheckGroup()
  const [initializeAttendance, attendanceInfo, attendanceEmpty, scroll, checkAttandance] = UseCheckAttendance()
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const handleFilter = (type) => {
    if(type === 'all'){
      setFilter('all')
      checkAttandance('all')
    }else if(type === 'wfh'){
      setFilter('WFH')
      checkAttandance('wfh')
    }else if(type === 'wfo'){
      setFilter('WFO')
      checkAttandance('wfo')
    }else if(type === 'sakit'){
      setFilter('Sakit')
      checkAttandance('sakit')
    }else if(type === 'cuti'){
      setFilter('Cuti')
      checkAttandance('cuti')
    }
  }

  return (
    <div className='px-4'>
        <p className='font-bold mb-2 dark:text-white'>Kehadiran Hari Ini ({moment().format('DD/MM')})</p>
        {initilaizingGroupInfo || initializeAttendance?
        <>
          <LoadingChip/>
          <LoadingListAttendance/>
        </>
        :
        (groupInfo === false && attendanceInfo === "noGroup") ?
          <p className='text-sm text-gray-500 text-center'>-Belum Ada Grup-</p>
        :
        (groupInfo.status === '02')?
          <p className='text-sm text-gray-500 text-center'>-Menunggu Persetujuan Admin-</p>
        :
        (groupInfo.groupStatus.length > 0 &&  groupInfo.status === '01') ?
        <div>
          <style>
            {
              `.scrollable::-webkit-scrollbar {
                display: none;
            }`
            }
          </style>
          <div className='flex w-full gap-1 overflow-x-auto scrollable'>
            <Chip text="Sudah Isi" enable={filter === 'all'} emoji={'📝'} handleClick={() => handleFilter('all')} /> 
              {groupInfo.groupStatus.map((val, index) => 
                <Chip key={index} text={val} enable={val === filter} emoji={val === "WFH"? '🏠': val === "WFO" ? '🏢' : val === 'Sakit' ? '😷' : val === 'Cuti' ? '🏖️' :''} handleClick={() => handleFilter(val === "WFH"? 'wfh': val === "WFO" ? 'wfo' : val === 'Sakit' ? 'sakit' : val === 'Cuti' ? 'cuti' :'')}/>
              )}
          </div>
          {attendanceInfo === 'noAttendance' &&<p className='text-sm text-gray-500 text-center'>-Belum Ada Kehadiran-</p>}

          <div className={`flex flex-col overflow-y-auto ${attendanceInfo !== 'noAttendance'&&'rounded-xl border border-gray-200 dark:border-gray-600'}`} id="scrollableDiv" style={{ height: attendanceInfo.length > 10? "40vh" : ''}}>
            {attendanceInfo !== "noGroup" && attendanceInfo !== "noAttendance"&&            
            <InfiniteScroll
              dataLength={attendanceInfo.length}
              next={() => scroll(filter === 'all' ? 'all' : filter === 'WFO' ? 'wfo' : filter === 'WFH' ? 'wfh' : filter === 'Cuti' ? 'cuti' : '' )}
              hasMore={!attendanceEmpty}
              loader={
                <div className='flex justify-center items-center p-1'>
                  <svg role="status" className="w-6 h-6 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
              </div>
              }
              scrollableTarget={'scrollableDiv'}
            >
              {attendanceInfo !== "noGroup" && attendanceInfo !== "noAttendance"&& attendanceInfo.filter(val => val.addDate === moment(Timestamp.now().toDate()).format('DD/MM/YYYY')).map((val, index) => (
                <ListGroupAttendanceInformation key={index} val={val}/>
              ))}
            </InfiniteScroll>
            }
          </div>
          <div className='relative'>
            <FloatingButton/>
          </div>
        </div>
        :
        ""
        }
        
    </div>
  )
}

export default GroupAttendanceInformation