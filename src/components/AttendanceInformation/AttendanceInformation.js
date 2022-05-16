import { Timestamp } from 'firebase/firestore';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useCheckGroup from '../../hooks/UseCheckGroup/useCheckGroup';
import UseCheckPersonalAttendance from '../../hooks/UseCheckPersonalAttendance/UseCheckPersonalAttendance';
import Alert from '../Alert/Alert';
import AlertStatus from '../Alert/AlertStatus';
import ButtonFill from '../Button/ButtonFill/ButtonFill';
import ButtonIcon from '../Button/ButtonIcon/ButtonIcon';
import LoadingAttendanceInformation from '../LoadingPulse/LoadingAttendanceInformation';
import SwipeClockIn from '../SwipeClockIn/SwipeClockIn';
import LoadingAttendanceInformationClockInStatus from './LoadingAttendanceInformationClockInStatus';

const AttendanceInformation = () => {
    const [initilaizingGroupInfo, groupInfo] = useCheckGroup()
    const [initializePersonalAttendance, personalAttendance] = UseCheckPersonalAttendance()
    const [dropDown, setDropDonw] = useState(false)
    const navigate = useNavigate()
    
  return (
    <div className='px-4 mb-4'>
        <div className='w-full rounded-2xl flex flex-col bg-white border border-gray-200'>
            {initilaizingGroupInfo? 
            <LoadingAttendanceInformation/>
            : 
            (groupInfo.status === "01") ? 
            <>
                <div className='flex justify-between items-center px-4 py-2'>
                    <div className='flex justify-start'>
                        <p className='text-xl font-bold'>{groupInfo.data.groupName}</p>
                    </div>
                    <div>
                        {groupInfo.data.groupMember.some(val => val.status === "02")? <div className='flex justify-end'><span className="absolute rounded-full h-2 w-2 bg-red-500"></span></div> : ""}
                        <ButtonIcon actionFunction={() => setDropDonw(!dropDown)} icon={<svg className="h-6 w-6"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"> <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="12" r="1" />  <circle cx="12" cy="19" r="1" />  <circle cx="12" cy="5" r="1" /></svg>}/>
                        <div className='flex justify-end'>                            
                            <ul className={`divide-y text-gray-700 absolute z-50 bg-white rounded px-4 py-2 shadow-md ${dropDown? 'block' : 'hidden'} `}>
                                <li onClick={() => navigate(`/detail-group`)} className="">Detail Grup</li>    

                            </ul>
                        </div>
                    </div>
                </div>
                <div className='border-b border-gray-200'></div>
                {initializePersonalAttendance ? <LoadingAttendanceInformationClockInStatus/>
                :
                personalAttendance.find(val => val.addDate === new Date(Timestamp.now().seconds*1000).toLocaleDateString()) ? 
                <div className='flex flex-col gap-2 p-4'>
                    <AlertStatus type={'success'} text={`Kamu Sudah Clock-In`}/>
                    <div className='flex items-center justify-between'>
                        <p className='text-sm'>Clock-In pada {new Date(personalAttendance.find(val => val.addDate === new Date(Timestamp.now().seconds*1000).toLocaleDateString()).timestamp.seconds*1000).toString().split(" ")[4].substring(0, 5)}</p>
                        <div className='text-blue-500 font-bold px-2 py-1 rounded flex gap-2 font-bold bg-blue-100'>{personalAttendance.find(val => val.addDate === new Date(Timestamp.now().seconds*1000).toLocaleDateString()).status} 
                            <ButtonIcon icon={
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            }/>
                        </div>
                    </div>
                </div>
                :
                <div className='flex flex-col justify-center px-4 py-4'>
                    <div className='flex flex-col gap-4'>
                        <AlertStatus type={'info'} text={`Kamu Belum Clock-In`}/>
                        <SwipeClockIn/>
                    </div>
                </div>
                }
            </>
            :
            (groupInfo.status === "02") ? 
            <>
                <div className='flex flex-col gap-2 px-4 py-2'>
                    <div className='flex justify-start'>
                        <p className='text-lg font-bold'>{groupInfo.data.groupName}</p>
                    </div>
                </div>
                <div className='border-b border-gray-200'></div>
                <div className='flex flex-col gap-2 p-4'>
                    <AlertStatus type={'info'} text={'Menunggu persetujuan Admin'}/>
                </div>
            </>
            :
            <div className='flex flex-col p-4 gap-4'>
                <AlertStatus type={'info'} text={'Belum ada grup'}/>
                <ButtonFill label={'Tambah Grup'} handleClick={() => navigate('/add-group')} additionalClass={'bg-blue-500 border-blue-500'}/>
            </div>
            }
        </div>
    </div>
  )
}

export default AttendanceInformation