import React from 'react'
import ButtonFill from '../../../components/Button/ButtonFill/ButtonFill'
import ButtonOutline from '../../../components/Button/ButtonOutline/ButtonOutline'
import SpinnerLoading from '../../../components/SpinnerLoading/SpinnerLoading'

const Confirmation = ({initializeAddCalender, calender, handleStepAddCalender, handleAddCalender}) => {
  return (
      <>
      {initializeAddCalender ? <SpinnerLoading/> :      
        <div className='flex flex-col gap-4'>
            <div>
            <ul className='flex flex-col gap-2'>
            <li><p className=''>Kehadiran</p> <p className='font-bold text-lg'>{calender.status}</p></li>
            <div className='border-t border-gray-300'></div>
            {calender.startDate&&calender.endDate&&<li className=''><p className=''>Lama Cuti</p> <p className='font-bold text-lg'>{new Date(calender.startDate).toLocaleDateString()} - {new Date(calender.endDate).toLocaleDateString()}</p></li>}
        </ul>
            </div>
            <div className='flex flex-col gap-2'>
                <ButtonFill additionalClass={`bg-blue-500 border-blue-500`} label="Lanjutkan"  handleClick={() => handleAddCalender()} />
                <ButtonOutline label="Kembali" handleClick={() => handleStepAddCalender('prev')}/>
            </div>
        </div>
      }
      </>
  )
}

export default Confirmation