import React from 'react'
import LetterAvatar from '../LetterAvatar/LetterAvatar'

const ListGroupAttendanceInformation = ({val}) => {
  return (
    <div className='flex justify-between bg-white w-full border-b border-gray-200 px-2 py-2'>
      <div className='flex items-center'>
        <div>
          <LetterAvatar letter={val.photoURL}/>
        </div>
        <div className='ml-2 flex flex-col gap-0'>
          <p className='text-sm font-bold flex items-center text-gray-600'>
              {val.userName}
          </p>
          <div className='flex items-center gap-1'>
            <div className='text-xs text-blue-500 flex items-center bg-blue-100 rounded w-fit px-1 py-0.5'>{val.status}</div>
            {val.status==='WFO'&&<div className='text-xs text-blue-500 flex items-center bg-blue-100 rounded w-fit px-1 py-0.5'>{val.wfoLocation}</div>}
            {val.status==='Sakit'&&<div className='text-xs text-blue-500 flex items-center bg-blue-100 rounded w-fit px-1 py-0.5'>{val.sickReason}</div>}
            {val.status==='Cuti'&&<div className='text-xs text-blue-500 flex items-center bg-blue-100 rounded w-fit px-1 py-0.5'>{val.startDate} - {val.endDate}</div>}
          </div>
        </div>
      </div>
    <div className='flex items-center'>
      <div className='text-xs'>
            {new Date(val.timestamp.seconds*1000).toString().split(" ")[4].substring(0, 5)}
      </div>
    </div>
    </div>
  )
}

export default ListGroupAttendanceInformation