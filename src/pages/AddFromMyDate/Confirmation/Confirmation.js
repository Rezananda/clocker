import moment from 'moment'
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
            <ul className='flex flex-col gap-2 text-center'>
            <li><p className='text-sm'>Kehadiran</p> <p className='text-lg font-bold'>{calender.status}</p></li>
            {calender.startDate&&calender.endDate&&<li><p className='text-sm'>Lama Cuti</p> <p className='text-lg font-bold'>{moment(moment(calender.startDate)).format('DD/MM/YYYY')} - {moment(moment(calender.endDate)).format('DD/MM/YYYY')}</p></li>}
        </ul>
            </div>
            <div className='flex flex-col gap-2'>
                <ButtonFill additionalClass={`bg-blue-500 border-blue-500`} label="Tambah"  handleClick={() => handleAddCalender()} />
                <ButtonOutline label="Kembali" handleClick={() => handleStepAddCalender('prev')}/>
            </div>
        </div>
      }
      </>
  )
}

export default Confirmation