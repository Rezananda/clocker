import React from 'react'

const LoadingChip = () => {
  return (
      <div className='animate-pulse'>
        <div className="h-8 bg-slate-200 w-2/3 mb-2 rounded"></div>
        <div className='flex gap-1 overflow-x-auto'>
            <button className={`flex px-1 mb-2 h-7 w-20 bg-slate-200 rounded-full`}></button>
            <button className={`flex px-1 mb-2 h-7 w-20 bg-slate-200 rounded-full`}></button>
            <button className={`flex px-1 mb-2 h-7 w-20 bg-slate-200 rounded-full`}></button>
            <button className={`flex px-1 mb-2 h-7 w-20 bg-slate-200 rounded-full`}></button>
            <button className={`flex px-1 mb-2 h-7 w-20 bg-slate-200 rounded-full`}></button>
        </div>
      </div>
  )
}

export default LoadingChip