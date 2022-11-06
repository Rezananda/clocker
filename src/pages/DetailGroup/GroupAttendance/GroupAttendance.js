import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate } from 'react-router-dom'
import ButtonIcon from '../../../components/Button/ButtonIcon/ButtonIcon'
import Chip from '../../../components/Chip/Chip'
import ListGroupAttendanceInformation from '../../../components/ListGroupAttendanceInformation/ListGroupAttendanceInformation'
import SpinnerLoading from '../../../components/SpinnerLoading/SpinnerLoading'
import useSearch from '../../../hooks/UseSearch/useSearch'

const GroupAttendance = ({initializeGetAllAttendance, allAttendance, attendanceEmpty, scroll, filter, groupInfo, initilaizingGroupInfo}) => {
  const [searchValue, setSearchValue] = useState("")
  const [search, initializeSearch, getSearchValue] = useSearch(searchValue)
  const navigate = useNavigate()

  const handleClose = () => {
    setSearchValue("")
    getSearchValue()
  }

  return (
    <div className='py-4 px-4' >
        {initializeGetAllAttendance || initilaizingGroupInfo? 
        <SpinnerLoading/>
        :
        <div className='flex flex-col gap-1'>
          {/* <div className='flex gap-2 mb-2'>
            <div className='relative w-full'>
              <input type={'text'} className='p-2 rounded-lg w-full' placeholder='Cari Nama Member' onChange={(e) => setSearchValue(e.target.value)}/>
              {search.length > 0 &&              
              <div className='absolute inset-y-0 right-0 pr-3 flex items-center'>
                <ButtonIcon icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                }
                actionFunction={handleClose}
                />
              </div>
              }
            </div>
            <button className='bg-blue-500 p-2 text-white rounded-lg flex items-center' onClick={getSearchValue}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              Cari
              </button>
          </div> */}
          <div className='flex'>
          <div className='flex w-full gap-1 overflow-x-auto scrollable sticky top-0 bg-gray-100 py-2 dark:bg-black z-20'>
            <Chip text="Sudah Isi" enable={filter === 'all'} color={'blue'} /> 
              {groupInfo.groupStatus.map((val, index) => 
                <Chip key={index} text={val} enable={val === filter}/>
              )}
          </div>
          <ButtonIcon icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          }
          actionFunction={() => navigate('/search')}
          />
          </div>
          {allAttendance !== 'noAttendance' && <InfiniteScroll
              className='flex flex-col gap-1'
              dataLength={allAttendance.length}
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
            {search.length===0&&allAttendance.map((val, index) => 
                <ListGroupAttendanceInformation val={val} key={index} date={true}/>
            )}
          </InfiniteScroll>
          }

          {initializeSearch ? 
          
          <SpinnerLoading/> 
          :
          <div className='flex flex-col gap-1'>
            {search.length>0&&search.map((val, index) => 
              <ListGroupAttendanceInformation val={val} key={index} date={true}/>
            )}
          </div>            
          }

        </div>
        }
    </div>
  )
}

export default GroupAttendance