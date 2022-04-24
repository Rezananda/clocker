import React from 'react'
import LetterAvatar from '../LetterAvatar/LetterAvatar'

const ListGroupAttendanceInformation = ({letter, dateAdd, displayName, statusAttendance}) => {
  return (
    <div className='flex items-center bg-white w-full border-l-4 border-blue-500 rounded px-2 py-1 mb-1'>
      <div>
        <LetterAvatar letter={letter}/>
      </div>
      <div className='ml-2 '>
        <span className='text-xs'>{new Date(dateAdd.seconds*1000).toString().split(" ")[4]}</span>
        <div className='flex items-center gap-1'>
          <span className='text-sm font-bold flex items-center text-gray-600'>
              {displayName}
          </span>
          <span className='text-xs font-bold text-blue-500 flex items-center bg-blue-100 rounded w-fit px-1 py-0.5'>
              {statusAttendance}
          </span>
        </div>
      </div>
    </div>
  )
}

export default ListGroupAttendanceInformation