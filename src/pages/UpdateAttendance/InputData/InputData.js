import React from 'react'
import Input from '../../../components/Input/Input'
import LabelTypography from '../../../components/Typography/LabelTypography'
import DatePicker from "react-datepicker"
import ButtonFill from '../../../components/Button/ButtonFill/ButtonFill'
import SpinnerLoading from '../../../components/SpinnerLoading/SpinnerLoading'
import {parseISO} from 'date-fns'
import moment from 'moment'

const InputData = ({setAttendanceData, attendanceData, handleStepUpdateAttendance, initilaizingGroupInfo, groupInfo}) => {

    return (
    <>
    <div className='flex flex-col gap-4'>
        <div>
            <LabelTypography textValue="Status Kehadiran" additionalClass={'dark: text-white'}/>
            <div className='mb-2'>
            <input onChange={(e) => {setAttendanceData(prevState => ({ ...prevState, status: e.target.value}))}} className="sr-only peer" type="radio" value="WFH" name="statusAttendance" id="wfh" checked={attendanceData.status === 'WFH'}/>
            <label className="flex p-4 items-center bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-blue-100 peer-checked:ring-blue-500 peer-checked:ring-2 peer-checked:border-transparent peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white dark:bg-black dark:text-white dark:border-gray-600" htmlFor="wfh">WFH</label>
            </div>
            <div className='mb-2'>
            <input onChange={(e) => {setAttendanceData(prevState => ({ ...prevState, status: e.target.value}))}}  className="sr-only peer" type="radio" value="WFO" name="statusAttendance" id="wfo" checked={attendanceData.status === 'WFO'}/>
            <label className="flex items-center p-4 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-blue-100 peer-checked:ring-blue-500 peer-checked:ring-2 peer-checked:border-transparent peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white dark:bg-black dark:text-white dark:border-gray-600" htmlFor="wfo">WFO</label>
            </div>
            <div className='mb-2'>
            <input onChange={(e) => {setAttendanceData(prevState => ({ ...prevState, status: e.target.value}))}}  className="sr-only peer" type="radio" value="Cuti" name="statusAttendance" id="cuti" checked={attendanceData.status === 'Cuti'}/>
            <label className="flex items-center p-4 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-blue-100 peer-checked:ring-blue-500 peer-checked:ring-2 peer-checked:border-transparent peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white dark:bg-black dark:text-white dark:border-gray-600" htmlFor="cuti">Cuti</label>
            </div>
            <div>
            <input onChange={(e) => {setAttendanceData(prevState => ({ ...prevState, status: e.target.value}))}}  className="sr-only peer" type="radio" value="Sakit" name="statusAttendance" id="sakit" checked={attendanceData.status === 'Sakit'}/>
            <label className="flex items-center p-4 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-blue-100 peer-checked:ring-blue-500 peer-checked:ring-2 peer-checked:border-transparent peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white dark:bg-black dark:text-white dark:border-gray-600" htmlFor="sakit">Sakit</label>
            </div>
        </div>
        {attendanceData.status === 'Sakit' && 
        <div>
            <LabelTypography textValue="Alasan Sakit" additionalClass={'dark: text-white'}/>
            <Input value={attendanceData.sickReason} handleChange={(e) => setAttendanceData((prevState) => ({...prevState, [e.target.name] : e.target.value}))} maxLength={20} type="text" name="sickReason" placeholder="Alasan Sakit" additionalClass={'dark: bg-black dark: text-white'}/>
        </div>
        }
        {attendanceData.status === 'Cuti' &&
        <div>
            <LabelTypography textValue="Lama Cuti" additionalClass={'dark: text-white'}/>
            <div className='flex items-center gap-1'>
                <div className='relative'>
                    <DatePicker
                    selected={parseISO(moment().format('YYYY-MM-DD'))}
                    className='bg-blue-50 w-full px-4 py-3 rounded-lg text-md text-gray-500 dark:bg-black dark:text-gray-600'
                    disabled
                    />
                    <span className='flex items-center absolute inset-y-0 right-0 pr-2'><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    </span>
                </div>
            <span>-</span>
            <div className='relative'>
                <DatePicker
                selected={attendanceData.endDate? parseISO(moment(attendanceData.endDate, 'DD/MM/YYYY').format('YYYY-MM-DD')) : parseISO(moment().format('YYYY-MM-DD'))}
                onChange={(date) => setAttendanceData((prevState) => ({...prevState, startDate:new Date(Date.now()), endDate: date}))}
                selectsEnd
                minDate={new Date()}
                className='bg-blue-50 w-full px-4 py-3 rounded-lg text-md dark:bg-black dark:text-gray-600'
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
        <div>
            <LabelTypography textValue="Lokasi WFO" additionalClass={'dark: text-white'}/>
            {initilaizingGroupInfo? <SpinnerLoading/>:
            <select value={attendanceData.wfoLocation} onChange={(e) => setAttendanceData((prevState) => ({...prevState, wfoLocation: e.target.value}))} defaultValue={'DEFAULT'} className="bg-blue-50 text-gray-900 text-sm rounded-lg block w-full px-4 h-12 focus:outline-none focus:ring-blue-500 focus:ring-2 dark:bg-black dark:text-white">
                <option value={'DEFAULT'} disabled>Pilih...</option>
                {groupInfo.groupLocation.map((val, index) => (
                    <option key={index} value={val}>{val}</option>
                ))}
            </select>
            }
        </div>
        }
        <ButtonFill additionalClass={attendanceData.status === "WFH" || attendanceData.wfoLocation || attendanceData.sickReason || attendanceData.startDate || attendanceData.endDate ? `bg-blue-500 border-blue-500` : `bg-blue-100 border-blue-100`} label="Lanjutkan" handleClick={() => handleStepUpdateAttendance('next')} />
    </div>
    </>
  )
}

export default InputData