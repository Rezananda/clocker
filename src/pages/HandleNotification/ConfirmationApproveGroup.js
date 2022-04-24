import React from 'react'

const ConfirmationApproveGroup = ({initializeHandleChangeStatus, handleChangeStatus}) => {
    if(initializeHandleChangeStatus){
        return (
          <>
            <p className='min-h-screen w-full'>Loading...</p>
          </>
        )
      }
  return (
    <div>ConfirmationApproveGroup</div>
  )
}

export default ConfirmationApproveGroup