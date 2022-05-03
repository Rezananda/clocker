import React from 'react'

const LoadingAttendanceInformation = () => {
  return (
    <div className='animate-pulse'>
        <div className="flex flex-col gap-4">
            <div className="h-8 bg-slate-200 w-2/6 rounded"></div>
            <div className="h-8 bg-slate-200 rounded"></div>
            <div className="h-8 bg-slate-200 rounded"></div>
        </div>
    </div>
  )
}

export default LoadingAttendanceInformation