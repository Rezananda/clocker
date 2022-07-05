import moment from 'moment'
import React from 'react'
import LetterAvatar from '../LetterAvatar/LetterAvatar'

const ListGroupAttendanceInformation = ({val}) => {
  return (
    <div className='flex justify-between bg-white w-full border-b border-gray-200 px-4 py-2 dark:bg-slate-800 dark:border-gray-600'>
      <div className='flex items-center'>
        <div>
          <LetterAvatar letter={val.photoURL}/>
        </div>
        <div className='ml-2 flex flex-col'>
          <p className='font-bold flex items-center text-gray-600 dark:text-white'>
              {val.userName}
          </p>
          <div className='flex items-center gap-1'>
            <div className='text-sm font-bold text-blue-500 flex items-center bg-blue-100 rounded w-fit px-2 py-0.5'>{val.status} {val.status === "WFH"? '🏠': val.status === "WFO" ? '🏢' : val.status === 'Sakit' ? '😷' : val.status === 'Cuti' ? '🏖️' :''} </div>
            {val.status==='WFO'&&<div className='text-sm font-bold text-blue-500 flex items-center bg-blue-100 rounded w-fit px-2 py-0.5'>{val.wfoLocation}</div>}
            {val.status==='Sakit'&&<div className='text-sm font-bold text-blue-500 flex items-center bg-blue-100 rounded w-fit px-2 py-0.5'>{val.sickReason}</div>}
            {val.status==='Cuti'&&<div className='text-sm font-bold text-blue-500 flex items-center bg-blue-100 rounded w-fit px-2 py-0.5'>{moment(val.startDate, 'DD/MM/YYYY').format('DD/MM')} - {moment(val.endDate, 'DD/MM/YYYY').format('DD/MM')}</div>}
          </div>
        </div>
      </div>
    <div className='flex items-center'>
      <p className='text-sm dark:text-white'>
            {val.addTime}
      </p>
    </div>
    </div>
  )
}

export default ListGroupAttendanceInformation