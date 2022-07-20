import React from 'react'
import ReactDatePicker from 'react-datepicker'
import ButtonFill from '../../../components/Button/ButtonFill/ButtonFill'
import LabelTypography from '../../../components/Typography/LabelTypography'

const InputData = ({handleStepAddCalender, calendar,  setCalender}) => {

    const handleDateChangeRaw = (e) => {
        e.preventDefault();
    }

  return (
    <div className='flex flex-col gap-4'>
        <div>
            <LabelTypography textValue="Tanggal"/>
            <div className='flex items-center gap-1'>
                <div>
                    <ReactDatePicker
                    className='bg-blue-50 w-full px-4 py-2 rounded-lg text-md text-gray-500'
                    selected={calendar.startDate}
                    onChange={(date) => setCalender((prevState => ({...prevState, startDate: new Date(date)})))}
                    selectsStart
                    startDate={calendar.startDate}
                    endDate={calendar.endDate}           
                    minDate={new Date()}
                    placeholderText='Tanggal Awal'
                    onChangeRaw={handleDateChangeRaw}
                    />
                </div>
                <span>-</span>
                <div>
                    <ReactDatePicker
                    className='bg-blue-50 w-full px-4 py-2 rounded-lg text-md text-gray-500'
                    selected={calendar.endDate}
                    onChange={(date) => setCalender((prevState => ({...prevState, endDate: new Date(date)})))}
                    selectsEnd
                    startDate={calendar.startDate}
                    endDate={calendar.endDate}
                    minDate={calendar.startDate}     
                    placeholderText='Tanggal Akhir'     
                    onChangeRaw={handleDateChangeRaw}  
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
        <ButtonFill additionalClass={`bg-blue-500 border-blue-500`} label="Lanjutkan"  handleClick={() => handleStepAddCalender('next')} />
        </div>
        
    </div>
  )
}

export default InputData