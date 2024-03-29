import React from 'react'

const Stepper = ({stepAddGroup}) => {
  return (
    <div className='flex items-center mb-8'>
        <div className='relative flex flex-col justify-center items-center'>
          <div className={`flex items-center justify-center rounded-full h-8 w-8 ${stepAddGroup === 1 || stepAddGroup === 2 || stepAddGroup === 3 ? 'bg-blue-100' : 'bg-gray-300 dark:bg-slate-800'} `}>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${stepAddGroup === 1 || stepAddGroup === 2 || stepAddGroup === 3 ? 'text-blue-500' : 'text-gray-500'}`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clipRule="evenodd" />
              </svg>
          </div>        
          <p className={`absolute mt-12 text-xs ${stepAddGroup === 1 || stepAddGroup === 2 || stepAddGroup === 3 ? 'text-blue-500' : 'text-gray-500'}`}>Input</p>
        </div>

        <div className='flex-auto border-t border-blue-100 dark:border-gray-600'></div>

        <div className='relative flex flex-col justify-center items-center'>
          <div className={`flex items-center justify-center rounded-full h-8 w-8 ${stepAddGroup === 2 || stepAddGroup === 3 ? ' bg-blue-100 ' : 'bg-gray-300 dark:bg-slate-800'} `}>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${stepAddGroup === 2 || stepAddGroup === 3 ? 'text-blue-500' : 'text-gray-500'}`} viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
          </div>
          <p className={`absolute mt-12 text-xs ${stepAddGroup === 2 || stepAddGroup === 3 ? 'text-blue-500' : 'text-gray-500'}`}>Konfirmasi</p>
        </div>

        <div className='flex-auto border-t border-blue-100 dark:border-gray-600'></div>

        <div className='relative flex flex-col justify-center items-center'>
          <div className={`flex items-center justify-center rounded-full h-8 w-8 ${stepAddGroup === 3 ? ' bg-blue-100 ' : 'bg-gray-300 dark:bg-slate-800'} `}>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${stepAddGroup === 3 ? 'text-blue-500' : 'text-gray-500'}`} viewBox="0 0 20 20" fill="currentColor">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
          </div>
          <p className={`absolute mt-12 text-xs ${stepAddGroup === 3 ? 'text-blue-500' : 'text-gray-500'}`}>Selesai</p>
        </div>
    </div>
  )
}

export default Stepper