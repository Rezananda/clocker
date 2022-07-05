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
            <ul className='flex flex-col gap-2 mb-4'>
                <li><p>Nama Grup</p><p className='font-bold text-lg'>{groupName}</p></li>
                <li><p>Kapasitas Group</p><p className='font-bold text-lg'>50</p></li>
                <li> <p>Status Grup</p> 
                  <div className='flex gap-2 flex-wrap'>
                    {groupStatus.map((item, i) => <div key={i} className='px-2 bg-blue-100 rounded-lg text-blue-500 flex items-center gap-1 text-lg font-bold'>{item}</div>)}
                  </div>
                </li>
                <li> <p>Lokasi WFO</p> 
                  <div className='flex gap-2 flex-wrap'>
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