import React from 'react'

const AlertStatus = ({type, time, attendanceStatus, additionalClass}) => {
  return (
    <>
      {(type === 'success') ? 
        <div className='flex justify-between px-3 py-2 bg-blue-100 rounded-lg'>
          <div className='flex flex-col justify-center'>
              <p className='flex items-center gap-1'>Kamu {<p className='font-bold underline'>SUDAH</p>} Clock-In</p>
              <div className='flex items-center'>
                <p className='text-xs text-gray-400'>Clock-In pada</p>
                <p className='text-xs text-gray-400 ml-1'>{time}</p>
              </div>
          </div>
          <div className='flex items-center'>
            <span className='bg-white px-3 py-1 rounded-full border border-blue-500'>
              <p className='text-sm text-blue-500 font uppercase'>{attendanceStatus}</p>
            </span>
          </div>
        </div>
      :
      (type === 'info') ?
        <div className='flex px-3 py-3 bg-blue-100 rounded-lg w-full justify-center'>
            <p className='flex items-center gap-1'>Kamu {<p className='font-bold underline'>BELUM</p>} Clock-In</p>
        </div>
      :
      ""
      }
    </>
  )
}

export default AlertStatus