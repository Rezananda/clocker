import React from 'react'
import Input from '../../../components/Input/Input'
import LabelTypography from '../../../components/Typography/LabelTypography'
import DatePicker from "react-datepicker"
import ButtonFill from '../../../components/Button/ButtonFill/ButtonFill'

const InputData = ({setAttendanceData, attendanceData, setDateCuti, dateCuti, initilaizingGroupInfo, groupInfo, handleStepAddAttendance}) => {
  return (
    <div className='flex flex-col gap-4'>
        <div>
            <LabelTypography textValue="Waktu Kehadiran"/>
            <Input type="date" handleChange={() => new Date().toISOString().split('T')[0]} value={new Date().toISOString().split('T')[0]} readOnly={true} additionalClass="text-gray-500"/>
        </div>
        <div>
            <LabelTypography textValue="Grup"/>
            {initilaizingGroupInfo ? <p>Loading...</p> :
            <Input type="text" handleChange={() => groupInfo.data.groupName} value={groupInfo.data.groupName} readOnly={true} additionalClass="text-gray-500"/>
            }
        </div>
        <div>
            <LabelTypography textValue="Pilih Status Kehadiran"/>
            <div className='mb-2'>
            <input onChange={(e) => setAttendanceData((prevState) => ({...prevState, status: e.target.value}))}  className="sr-only peer" type="radio" value="WFH" name="statusAttendance" id="wfh"/>
            <label className="flex p-4 items-center bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-blue-100 peer-checked:ring-blue-500 peer-checked:ring-2 peer-checked:border-transparent peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white" htmlFor="wfh">WFH</label>
            </div>
            <div className='mb-2'>
            <input onChange={(e) => setAttendanceData((prevState) => ({...prevState, status: e.target.value}))}  className="sr-only peer" type="radio" value="WFO" name="statusAttendance" id="wfo"/>
            <label className="flex items-center p-4 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-blue-100 peer-checked:ring-blue-500 peer-checked:ring-2 peer-checked:border-transparent peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white" htmlFor="wfo">WFO</label>
            </div>
            <div className='mb-2'>
            <input onChange={(e) => setAttendanceData((prevState) => ({...prevState, status: e.target.value}))}  className="sr-only peer" type="radio" value="Cuti" name="statusAttendance" id="cuti"/>
            <label className="flex items-center p-4 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-blue-100 peer-checked:ring-blue-500 peer-checked:ring-2 peer-checked:border-transparent peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white" htmlFor="cuti">Cuti</label>
            </div>
            <div>
            <input onChange={(e) => setAttendanceData((prevState) => ({...prevState, status: e.target.value}))}  className="sr-only peer" type="radio" value="Sakit" name="statusAttendance" id="sakit"/>
            <label className="flex items-center p-4 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-blue-100 peer-checked:ring-blue-500 peer-checked:ring-2 peer-checked:border-transparent peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white" htmlFor="sakit">Sakit</label>
            </div>
        </div>
        {attendanceData.status === 'Sakit' && 
        <div>
            <LabelTypography textValue="Alasan Sakit"/>
            <Input handleChange={(e) => setAttendanceData((prevState) => ({...prevState, [e.target.name] : e.target.value}))} maxLength={20} type="text" name="sickReason" placeholder="Nama Grup..."/>
        </div>
        }
        {attendanceData.status === 'Cuti' &&
        <div>
            <LabelTypography textValue="Lama Cuti"/>
            <div className='flex items-center gap-1'>
            <div className='relative'>
                <DatePicker
                selected={dateCuti.startDate}
                onChange={(date) => setDateCuti((prevState) => ({...prevState, startDate: date}))}
                selectsStart
                startDate={dateCuti.startDate}
                endDate={dateCuti.endDate}
                className='bg-blue-50 w-full px-4 py-3 rounded-lg text-md'
                placeholderText='MM/DD/YYYY'
                />
                <span className='flex items-center absolute inset-y-0 right-0 pr-2'><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                </span>
            </div>
            <span>-</span>
            <div className='relative'>
                <DatePicker
                selected={dateCuti.endDate}
                onChange={(date) => setDateCuti((prevState) => ({...prevState, endDate: date}))}
                selectsEnd
                startDate={dateCuti.startDate}
                endDate={dateCuti.endDate}
                minDate={dateCuti.startDate}
                className='bg-blue-50 w-full px-4 py-3 rounded-lg text-md'
                placeholderText='MM/DD/YYYY'
                />
                <span className='flex items-center absolute inset-y-0 right-0 pr-2'><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                </span>
            </div>
            </div>
        </div>
        }
        {attendanceData.status === 'WFO' && 
            <select className="bg-blue-50 text-gray-900 text-sm rounded-lg block w-full px-4 py-3">
                <option selected disabled>Pilih...</option>
                <option value="Wisma Asia">Wisma Asia</option>
                <option value="Menara BCA">Menara BCA</option>
                <option value="Gading Serpong">Gading Serpong</option>
            </select>
        }
        <ButtonFill label="Lanjutkan" handleClick={() => handleStepAddAttendance('next')} />
    </div>
  )
}

export default InputData