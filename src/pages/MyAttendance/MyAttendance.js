import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ButtonIcon from '../../components/Button/ButtonIcon/ButtonIcon'
import ButtonLink from '../../components/Button/ButtonLink/ButtonLink'
import Chip from '../../components/Chip/Chip'
import LoadingChip from '../../components/LoadingPulse/LoadingChip'
import LoadingTransaction from '../../components/LoadingPulse/LoadingTransaction'
import useCheckGroup from '../../hooks/UseCheckGroup/useCheckGroup'
import UseCheckPersonalAttendance from '../../hooks/UseCheckPersonalAttendance/UseCheckPersonalAttendance'

const MyAttendance = () => {
    const navigate = useNavigate()
    const [initilaizingGroupInfo, groupInfo] = useCheckGroup()
    const [initializePersonalAttendance, personalAttendance, initializeAttendanceMore, attendanceEmpty, scroll, checkPersonalAttendance] = UseCheckPersonalAttendance()
    const [filter, setFilter] = useState('all')
  
    const handleFilter = (type) => {
        if(type === 'all'){
          setFilter('all')
          checkPersonalAttendance('all')
        }else if(type === 'wfh'){
          setFilter('WFH')
          checkPersonalAttendance('wfh')
        }else if(type === 'wfo'){
          setFilter('WFO')
          checkPersonalAttendance('wfo')
        }else if(type === 'sakit'){
          setFilter('Sakit')
          checkPersonalAttendance('sakit')
        }else if(type === 'cuti'){
          setFilter('Cuti')
          checkPersonalAttendance('cuti')
        }
      }

  return (
    <>
      <nav className="mb-2 px-2 py-4 bg-blue-500 drop-shadow-md fixed top-0 w-full z-10">
          <div className='flex justify-start items-center'>
            <ButtonIcon 
            actionFunction={()=> navigate(-1)} 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>}
            />
            <p className='text-md font-bold text-white flex ml-1'>Kehadiran Saya</p>
          </div>
      </nav>
      <div className='mt-20 px-2'>
      {initilaizingGroupInfo ? <LoadingChip/>:
      <>
          <style>
            {
              `.scrollable::-webkit-scrollbar {
                display: none;
            }`
            }
          </style>
        <div className='flex w-full gap-1 overflow-x-auto scrollable'>
            <Chip text={'Semua'} enable={filter === "all"} emoji={'📖'} handleClick={() => handleFilter('all')}/>
            {groupInfo.data.groupStatus.map((val, index) => 
                <Chip key={index} text={val} enable={val === filter} emoji={val === "WFH"? '🏠': val === "WFO" ? '🏢' : val === 'Sakit' ? '😷' : val === 'Cuti' ? '🏖️' :''} handleClick={() => handleFilter(val === "WFH"? 'wfh': val === "WFO" ? 'wfo' : val === 'Sakit' ? 'sakit' : val === 'Cuti' ? 'cuti' :'')}/>
                )}
        </div>      
      </>
        }
        </div>
      {initializePersonalAttendance? <LoadingTransaction/>:   
      <>
      <ul className='divide-y'>
        {personalAttendance !== "noAttendance"&&personalAttendance.map((val, index) => (
              <li key={index} className='bg-white px-4 py-2 flex justify-between'>
                  <div className='flex items-center gap-2'>
                      <p>{val.status === 'WFO'? '🏢' : val.status === 'WFH' ? '🏠': val.status === 'Cuti' ? '🏖️' : val.status === 'Sakit' ? '😷' : ''}</p>
                      <div className='flex flex-col'>
                          <p className='font-bold'>{val.status}</p>
                          <p className='text-sm'>{val.addDate}</p>
                      </div>
                  </div>
                  <div className='flex items-center'>
                      <p className='text-sm'>{val.addTime}</p>
                  </div>
              </li>
          ))}
        {personalAttendance === 'noAttendance' &&<p className='text-sm text-gray-500 text-center'>-Belum Ada Kehadiran-</p>}
      </ul>
      <div className='flex items-center justify-center mt-1'>
        {initializeAttendanceMore&&
          <div className='flex justify-center items-center'>
              <svg role="status" className="w-7 h-7 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
          </div>
          }
        {!initializeAttendanceMore&&!attendanceEmpty&& personalAttendance !== "noAttendance"&&<ButtonLink linkTo={() => scroll(filter === 'all' ? 'all' : filter === 'WFO' ? 'wfo' : filter === 'WFH' ? 'wfh' : filter === 'Cuti' ? 'cuti' : '' )} newProps={'text-sm'} label={'Selanjutnya'}/>}
      </div>
        </>
        }
    </> 
  )
}

export default MyAttendance