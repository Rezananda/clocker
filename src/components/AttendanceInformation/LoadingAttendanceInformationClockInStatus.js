import React from 'react'

const LoadingAttendanceInformationClockInStatus = () => {
  return (
    <div className='animate-pulse'>
      <div className="flex flex-col gap-2 p-4">
          <div className="h-12 bg-slate-200 rounded"></div>
          <div className='flex justify-between'>
            <div className="w-32 h-8 bg-slate-200 rounded"></div>
            <div className="w-28 h-8 bg-slate-200 rounded"></div>
          </div>
      </div>
    </div>
  )
}

export default LoadingAttendanceInformationClockInStatus