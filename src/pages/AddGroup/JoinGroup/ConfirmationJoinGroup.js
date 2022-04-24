import React from 'react'
import ButtonFill from '../../../components/Button/ButtonFill/ButtonFill'
import ButtonOutline from '../../../components/Button/ButtonOutline/ButtonOutline'
import SpinnerLoading from '../../../components/SpinnerLoading/SpinnerLoading'

const ConfirmationJoinGroup = ({groupCodeData, handleJoinGroup, loadingJoinGroup, handleStepJoinGroup}) => {
  return (
    <>
    <div className='flex flex-col gap-4'>
        <ul className='flex flex-col gap-2'>
            <li>Nama Grup: <span className='font-bold'>{groupCodeData.groupName}</span></li>
            <div className='border-t border-gray-300'></div>
            <li>Pemilik Grup: <span className='font-bold'>{groupCodeData.groupOwnerName}</span></li>
        </ul>
        <ButtonFill label="Gabung Grup" handleClick={handleJoinGroup}/>
        <ButtonOutline label="Kembali" handleClick={() => handleStepJoinGroup('prev')}/>
    </div>
    {loadingJoinGroup && <SpinnerLoading/>}
    </>
  )
}

export default ConfirmationJoinGroup