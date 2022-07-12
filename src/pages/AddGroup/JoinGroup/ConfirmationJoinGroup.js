import React from 'react'
import Alert from '../../../components/Alert/Alert'
import ButtonFill from '../../../components/Button/ButtonFill/ButtonFill'
import ButtonOutline from '../../../components/Button/ButtonOutline/ButtonOutline'
import SpinnerLoading from '../../../components/SpinnerLoading/SpinnerLoading'

const ConfirmationJoinGroup = ({groupCodeData, handleJoinGroup, loadingJoinGroup, handleStepJoinGroup, error, errorMessage}) => {
  return (
    <>
      {error&&<Alert type={'error'} text={errorMessage}/>}
      <div className='flex flex-col gap-2'>
          <ul className='flex flex-col gap-2 text-center'>
              <li><p>Nama Grup</p><p className='font-bold text-lg'>{groupCodeData.groupName}</p></li>
              <li><p>Pemilik Grup</p><p className='font-bold text-lg'>{groupCodeData.groupOwnerName}</p></li>
          </ul>
          <ButtonFill additionalClass={'bg-blue-500 border-blue-500'} label="Gabung Grup" handleClick={handleJoinGroup}/>
          <ButtonOutline label="Kembali" handleClick={() => handleStepJoinGroup('prev')}/>
      </div>
      {loadingJoinGroup && <SpinnerLoading/>}
    </>
  )
}

export default ConfirmationJoinGroup