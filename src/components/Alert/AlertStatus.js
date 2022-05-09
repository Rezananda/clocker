import React from 'react'

const AlertStatus = ({type, text, additionalClass}) => {
  return (
    <>
      {(type === 'success') ? 
      <div className={`flex flex-col gap-4`}>
        <div className='flex justify-between bg-green-100 rounded-lg border border-green-500'>
          <div className='flex items-center px-2'>
              <p className='font-bold'>{text} </p>
          </div>
          <div className='flex items-center justify-center p-1 '>
            <svg xmlns="http://www.w3.org/2000/svg" className="text-green-500 w-10 h-10" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
      :
      (type === 'info') ?
      <div className={`flex flex-col gap-4`}>
        <div className='flex justify-between bg-blue-100 rounded-lg border border-blue-500'>
          <div className='flex items-center px-2'>
              <p className='font-bold'>{text} </p>
          </div>
          <div className='flex items-center justify-center p-1 '>
            <svg xmlns="http://www.w3.org/2000/svg" className="text-blue-500 w-10 h-10 bg-blue-50 rounded-lg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
      :
      ""
      }
    </>
  )
}

export default AlertStatus