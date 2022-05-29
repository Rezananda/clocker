import React from 'react'
import ReactDatePicker from 'react-datepicker'
import ButtonFill from '../../../components/Button/ButtonFill/ButtonFill'
import LabelTypography from '../../../components/Typography/LabelTypography'

const InputData = ({startDate, endDate, handleStepAddCalender, setCalender}) => {
  return (
    <div className='flex flex-col gap-4'>
        <div>
            <LabelTypography textValue="Kalender"/>
            <div className='flex items-center gap-1'>
                <div>
                    <ReactDatePicker
                    selected={new Date(startDate)}
                    className='bg-blue-50 w-full px-4 py-3 rounded-lg text-md text-gray-500'
                    disabled
                    />
                </div>
                <span>-</span>
                <div>
                    <ReactDatePicker
                    selected={new Date(endDate)}
                    className='bg-blue-50 w-full px-4 py-3 rounded-lg text-md text-gray-500'
                    disabled
                    />
                </div>
            </div>
        </div>
        <div>
            <LabelTypography textValue={`Pilih Jenis`}/>
            <select onChange={(e) => setCalender((prevState) => ({...prevState, status: e.target.value}))} defaultValue={'DEFAULT'} className="bg-blue-50 text-gray-900 text-sm rounded-lg block w-full px-4 py-3">
                <option value={'DEFAULT'} disabled>Pilih...</option>
                <option value={'Cuti'}>Cuti</option>
            </select>  
        </div>
        <div>
        <ButtonFill additionalClass={`bg-blue-500 border-blue-500`} label="Lanjutkan"  handleClick={() => handleStepAddCalender('next')} />
        </div>
        
    </div>
  )
}

export default InputData