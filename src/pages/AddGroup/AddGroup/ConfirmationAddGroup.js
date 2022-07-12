import React from 'react'
import Alert from '../../../components/Alert/Alert'
import ButtonFill from '../../../components/Button/ButtonFill/ButtonFill'
import ButtonOutline from '../../../components/Button/ButtonOutline/ButtonOutline'
import SpinnerLoading from '../../../components/SpinnerLoading/SpinnerLoading'

const ConfirmationAddGroup = ({ groupName, groupStatus, locations, handleAddGroup, loadingSaveGroup, handleStepAddGroup, error, errorMessage}) => {
  return (
      <>
      {error&&<Alert type={'error'} text={errorMessage}/>}
        <div className='flex flex-col'>
            <ul className='flex flex-col gap-2 mb-4 text-center'>
                <li><p className='font-bold'>Nama Grup</p><p className='text-lg'>{groupName}</p></li>
                <li><p className='font-bold'>Kapasitas Group</p><p className='text-lg'>50</p></li>
                <li> <p className='font-bold'>Status Grup</p> 
                  <div className='flex gap-2 flex-wrap justify-center'>
                    {groupStatus.map((item, i) => <div key={i} className='px-2 bg-blue-100 rounded-lg text-blue-500 flex items-center gap-1 text-lg font-bold'>{item}</div>)}
                  </div>
                </li>
                <li> <p className='font-bold'>Lokasi WFO</p> 
                  <div className='flex gap-2 flex-wrap justify-center'>
                    {locations.map((item, i) => <div key={i} className='px-2 bg-blue-100 rounded-lg text-blue-500 flex items-center gap-1 text-lg font-bold'>{item}</div>)}
                  </div>
                </li>
            </ul>
            <div className='flex flex-col gap-2'>
              <ButtonFill label="Tambah" handleClick={handleAddGroup} additionalClass={'bg-blue-500 border-blue-500'}/>
              <ButtonOutline label="Kembali" handleClick={() => handleStepAddGroup('prev')}/>
            </div>
      </div>
      {loadingSaveGroup && <SpinnerLoading/>}
    </>        
  )
}

export default ConfirmationAddGroup