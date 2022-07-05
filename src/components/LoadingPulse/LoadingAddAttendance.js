import React from 'react'

const LoadingAddAttendance = () => {
  return (
    <div className='animate-pulse mt-2'>
        <div className="flex flex-col gap-2">
            <div className='flex flex-col gap-1'>
                <div className='w-20 h-6 bg-slate-200 rounded'></div>
                <div className='w-28 h-6 bg-slate-200 rounded'></div>
            </div>
            <div className='flex flex-col gap-1'>
                <div className='w-14 h-6 bg-slate-200 rounded'></div>
                <div className='h-6 bg-slate-200 rounded'></div>
            </div>
            <div className="h-6 w-3/6 bg-slate-200 rounded"></div>
            <div className="h-14 bg-slate-200 rounded"></div>
            <div className="h-14 bg-slate-200 rounded"></div>
            <div className="h-14 bg-slate-200 rounded"></div>
            <div className="h-14 bg-slate-200 rounded"></div>
            <div className="h-12 bg-slate-200 rounded-full mt-2"></div>
        </div>
    </div>
  )
}

export default LoadingAddAttendance