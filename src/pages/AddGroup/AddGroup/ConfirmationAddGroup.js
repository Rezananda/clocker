import React from 'react'
import Alert from '../../../components/Alert/Alert'
import ButtonFill from '../../../components/Button/ButtonFill/ButtonFill'
import ButtonOutline from '../../../components/Button/ButtonOutline/ButtonOutline'
import SpinnerLoading from '../../../components/SpinnerLoading/SpinnerLoading'

const ConfirmationAddGroup = ({ groupName, groupStatus, handleAddGroup, loadingSaveGroup, handleStepAddGroup, error, errorMessage}) => {
  return (
      <>
      {error&&<Alert type={'error'} text={errorMessage}/>}
        <div className='flex flex-col'>
            <ul className='flex flex-col gap-2 mb-4'>
                <li className='flex items-center'><p>Nama Grup</p> <span className='font-bold'>: {groupName}</span></li>
                <div className='border-t border-gray-300'></div>
                <li className='flex items-center'><p>Kapasitas Group</p> <span className='font-bold'>: 50</span></li>
                <div className='border-t border-gray-300'></div>
                <li className=''> <p>Status Grup:</p> 
                  <div className='flex gap-2'>
                    {groupStatus.map((item, i) => <div key={i} className='text-sm font-bold px-2 py-0.5 bg-blue-100 rounded-full text-blue-500'>{item}</div>)}
                  </div>
                </li>
            </ul>
            <div className='flex flex-col gap-4'>
              <ButtonFill label="Tambah" handleClick={handleAddGroup} additionalClass={'bg-blue-500 border-blue-500'}/>
              <ButtonOutline label="Kembali" handleClick={() => handleStepAddGroup('prev')}/>
            </div>
      </div>
      {loadingSaveGroup && <SpinnerLoading/>}
    </>        
  )
}

export default ConfirmationAddGroup