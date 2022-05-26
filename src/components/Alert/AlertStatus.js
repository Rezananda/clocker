import React from 'react'

const AlertStatus = ({type, text, additionalClass}) => {
  return (
    <>
      {(type === 'success') ? 
      <div className={`flex flex-col gap-4`}>
        <div className='flex justify-between bg-blue-100 rounded-lg border border-blue-500'>
          <div className='flex items-center px-2'>
              <p className='font-bold'>{text} </p>
          </div>
          <div className='flex items-center justify-center p-1 '>
          <div className='flex items-center justify-center w-10 h-10 bg-blue-50 rounded-lg'>
              <p className='text-3xl'>
                ✅
              </p>
            </div>
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
            <div className='flex items-center justify-center w-10 h-10 bg-blue-50 rounded-lg'>
              <p className='text-3xl'>
                ℹ️
              </p>
            </div>
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