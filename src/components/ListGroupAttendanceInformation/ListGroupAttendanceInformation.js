import moment from 'moment'
import React from 'react'
import LetterAvatar from '../LetterAvatar/LetterAvatar'

const ListGroupAttendanceInformation = ({val, date}) => {
  return (
    <div className='flex justify-between bg-white w-full px-4 py-2 rounded-lg dark:bg-slate-800 overflow-x-auto'>
      <div className='flex items-center'>
        <div>
          <LetterAvatar letter={val.photoURL}/>
        </div>
        <div className='ml-2 flex flex-col'>
          <div className='w-56'>
            <p className='font-bold items-center text-gray-600 dark:text-white truncate'>
                {val.userName}
            </p>
          </div>
          <div className='flex items-center gap-1'>
            <div className={`${val.status === 'WFO'? 'bg-amber-100 text-amber-500' : val.status ==='WFH'? 'bg-green-100 text-green-500' : val.status === 'Cuti'? 'bg-indigo-100 text-indigo-500' : val.status === 'Sakit' ? 'bg-red-100 text-red-500': val.status === 'Training' ? 'bg-pink-100 text-pink-500' : ''} text-xs flex items-center rounded-full w-fit px-2 py-0.5 font-bold`}>{val.status}</div>
            {val.status==='WFO'&&<div className='text-xs text-amber-500 flex items-center bg-amber-100 rounded-full w-fit px-2 py-0.5 font-bold'>{val.wfoLocation}</div>}
            {val.status==='Sakit'&&<div className='text-xs text-red-500 flex items-center bg-red-100 rounded-full w-fit px-2 py-0.5 font-bold'>{val.sickReason}</div>}
            {val.status==='Cuti'&&<div className='text-xs text-indigo-500 flex items-center bg-indigo-100 rounded-full w-fit px-2 py-0.5 font-bold'>{moment(val.startDate, 'DD/MM/YYYY').format('DD/MM')} - {moment(val.endDate, 'DD/MM/YYYY').format('DD/MM')}</div>}
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-center items-end'>
        <p className='text-sm dark:text-white'>
              {val.addTime}
        </p>
        {date&&        
        <p className='text-sm dark:text-white'>
              {val.addDate}
        </p>
        }
      </div>
    </div>
  )
}

export default ListGroupAttendanceInformation