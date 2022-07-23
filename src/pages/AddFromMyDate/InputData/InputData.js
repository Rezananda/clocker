import React from 'react'
import ReactDatePicker from 'react-datepicker'
import ButtonFill from '../../../components/Button/ButtonFill/ButtonFill'
import LabelTypography from '../../../components/Typography/LabelTypography'

const InputData = ({handleStepAddCalender, calendar,  setCalender}) => {

    console.log(calendar)

  return (
    <div className='flex flex-col gap-4'>
        <div>
            <LabelTypography textValue="Tanggal"/>
            <div className='flex items-center gap-1'>
                <div>
                    <ReactDatePicker
                    className='bg-blue-50 w-full px-4 py-2 rounded-lg text-md text-gray-500 text-center'
                    selected={calendar.startDate}
                    onChange={(date) => setCalender((prevState => ({...prevState, startDate: new Date(date)})))}
                    selectsStart
                    startDate={calendar.startDate}
                    endDate={calendar.endDate}           
                    minDate={new Date()}
                    placeholderText='Tanggal Awal'
                    />
                </div>
                <span>-</span>
                <div>
                    <ReactDatePicker
                    className='bg-blue-50 w-full px-4 py-2 rounded-lg text-md text-gray-500 text-center'
                    selected={calendar.endDate}
                    onChange={(date) => setCalender((prevState => ({...prevState, endDate: new Date(date)})))}
                    selectsEnd
                    startDate={calendar.startDate}
                    endDate={calendar.endDate}
                    minDate={calendar.startDate}     
                    placeholderText='Tanggal Akhir'     
                    />
                </div>
            </div>
        </div>
        <div>
            <LabelTypography textValue={`Pilih Agenda`}/>
            <select onChange={(e) => setCalender((prevState) => ({...prevState, status: e.target.value}))} defaultValue={'DEFAULT'} className="bg-blue-50 text-gray-900 text-sm rounded-lg block w-full px-4 h-12">
                <option value={'DEFAULT'} disabled>Pilih...</option>
                <option value={'Cuti'}>Cuti</option>
            </select>  
        </div>
        <div>
        <ButtonFill disabled={Object.keys(calendar).length <= 2? true : false} additionalClass={Object.keys(calendar).length <= 2 ? `bg-blue-100 border-blue-100` : `bg-blue-500 border-blue-500`} label="Lanjutkan"  handleClick={() => handleStepAddCalender('next')} />
        </div>
        
    </div>
  )
}

export default InputData