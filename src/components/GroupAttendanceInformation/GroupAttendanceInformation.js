import { collection, doc, getDoc, onSnapshot, query, Timestamp, where } from 'firebase/firestore'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate } from 'react-router-dom'
import UseCheckAttendance from '../../hooks/UseCheckAttendance/UseCheckAttendance'
import useCheckGroup from '../../hooks/UseCheckGroup/useCheckGroup'
import useUserContext from '../../hooks/UseUserContext/UseUserContext'
import { db } from '../../utils/Firebase/Firebase'
import Chip from '../Chip/Chip'
import ListGroupAttendanceInformation from '../ListGroupAttendanceInformation/ListGroupAttendanceInformation'
import LoadingChip from '../LoadingPulse/LoadingChip'
import LoadingListAttendance from '../LoadingPulse/LoadingListAttendance'

const GroupAttendanceInformation = () => {
  const userContext = useUserContext()
  const navigate = useNavigate()
  const [initilaizingGroupInfo, groupInfo] = useCheckGroup()
  const [initializeAttendance, attendanceInfo, attendanceEmpty, scroll, checkAttandance] = UseCheckAttendance()
  const [initializeGetAllAttendance, setInitializeGetAllAttendance] = useState(false)
  const [allAttendance, setAllAttendance] = useState()
  const [filter, setFilter] = useState('all')
  const attendances = []

  const getNotAttendance = () => {
    try{
      const attendanceInfos = attendanceInfo.map(a => a.userName)
      const groupInfos = groupInfo.groupMember.map(a => a.displayName)
      const unique = groupInfos.filter(obj => attendanceInfos.indexOf(obj) === -1)
      navigate('/not-attendance', {state: unique})
    }catch (e){
      const groupInfos = groupInfo.groupMember.map(a => a.displayName)
      navigate('/not-attendance', {state: groupInfos})
    }
  }

  const getAllAttendance = async() => {
    setInitializeGetAllAttendance(true)
    try{
      const docRef = doc(db, 'users', userContext.currentUser.uid)
      const docSnap = await getDoc(docRef)
        if(docSnap.data().group[0]){
          const queryAttendance = query(collection(db, 'attendanceInformation'), where('groupId', '==', docSnap.data().group[0]))
          const unsubGetAttendance = onSnapshot(queryAttendance, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                attendances.push({id: doc.id, ...doc.data()})
            })
            setAllAttendance(attendances)
            setInitializeGetAllAttendance(false)
        })
        }else {
          setAllAttendance('noGroup')
          setInitializeGetAllAttendance(false)
        }
    }catch(error){
      setAllAttendance('noGroup')
      setInitializeGetAllAttendance(false)
    }
  }

  useEffect(() => {
    getAllAttendance()
  }, [])

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
        {initilaizingGroupInfo || initializeAttendance || initializeGetAllAttendance?
        <>
          <div className='animate-pulse mb-2'>
              <div className="flex items-center justify-between">
                  <div className="h-5 bg-slate-200 w-44 rounded"></div>
                  <div className="h-5 bg-slate-200 w-20 rounded-full"></div>
              </div>
          </div>
          <LoadingChip/>
          <LoadingListAttendance/>
        </>
        :
        (groupInfo === false && attendanceInfo === "noGroup" && allAttendance === "noGroup") ?
        <div className='flex flex-col gap-2'>
          <p className='font-bold dark:text-white'>Kehadiran Hari Ini</p>
          <p className='text-sm text-gray-500 text-center'>-Belum Ada Grup-</p>
        </div>
        :
        (groupInfo.status === '02' && attendanceInfo === 'noAttendance')?
        <div className='flex flex-col gap-2'>
          <p className='font-bold dark:text-white'>Kehadiran Hari Ini</p>
          <p className='text-sm text-gray-500 text-center'>-Menunggu Persetujuan Admin-</p>
        </div>
        :
        (groupInfo.groupStatus.length > 0 &&  groupInfo.status === '01') ?
        <div>
          <div className='flex w-full justify-between items-center'>
              <p className='font-bold dark:text-white'>Kehadiran Hari Ini</p>
              <button onClick={getNotAttendance} className='flex items-center bg-blue-500 px-2 py-0.5 text-white text-xs rounded-full'>
                {allAttendance.filter(item => item.addDate === moment(Timestamp.now().toDate()).format('DD/MM/YYYY')).length}/{groupInfo.groupMember.length} Hadir 
                {allAttendance.filter(item => item.addDate === moment(Timestamp.now().toDate()).format('DD/MM/YYYY')).length === groupInfo.groupMember.length ? 
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                }
              </button>
          </div>
          <style>
            {
              `.scrollable::-webkit-scrollbar {
                display: none;
            }`
            }
          </style>
          <div className='flex w-full gap-1 overflow-x-auto scrollable sticky top-0 bg-gray-100 py-2 dark:bg-black z-20' id='scrollableDiv'>
            <Chip text="Sudah Isi" enable={filter === 'all'} isCount={true} count={allAttendance.filter(item => item.addDate === moment(Timestamp.now().toDate()).format('DD/MM/YYYY')).length} handleClick={() => handleFilter('all')} color={'blue'} /> 
              {groupInfo.groupStatus.map((val, index) => 
                <Chip key={index} text={val} enable={val === filter} isCount={true} count={allAttendance.filter(item => item.addDate === moment(Timestamp.now().toDate()).format('DD/MM/YYYY') && item.status === val).length} handleClick={() => handleFilter(val === "WFH"? 'wfh': val === "WFO" ? 'wfo' : val === 'Sakit' ? 'sakit' : val === 'Cuti' ? 'cuti' :'')} color={val === "WFH"? 'green': val === "WFO" ? 'amber' : val === 'Sakit' ? 'red' : val === 'Cuti' ? 'indigo' :''}/>
              )}        
          </div>

          {attendanceInfo === 'noAttendance' &&<p className='text-sm text-gray-500 text-center'>-Belum Ada Kehadiran-</p>}

          <div className='flex flex-col gap-1'>
          {attendanceInfo !== "noGroup" && attendanceInfo !== "noAttendance"&&            
            <InfiniteScroll
              className='flex flex-col gap-1'
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
        </div>
        :
        ""
        }
        
    </div>
  )
}

export default GroupAttendanceInformation