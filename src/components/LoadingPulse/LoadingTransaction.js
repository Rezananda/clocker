import React from 'react'

const LoadingTransaction = () => {
  return (
    <div className='animate-pulse mt-2'>
        <div className="flex flex-col gap-1 px-4">
            <div className="h-14 bg-slate-200 rounded-t-lg"></div>
            <div className="h-14 bg-slate-200"></div>
            <div className="h-14 bg-slate-200"></div>
            <div className="h-14 bg-slate-200"></div>
            <div className="h-14 bg-slate-200"></div>
            <div className="h-14 bg-slate-200"></div>
            <div className="h-14 bg-slate-200"></div>
            <div className="h-14 bg-slate-200"></div>
            <div className="h-14 bg-slate-200"></div>
        </div>
    </div>
  )
}

export default LoadingTransaction