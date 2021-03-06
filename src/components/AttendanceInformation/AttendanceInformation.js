import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useCheckGroup from '../../hooks/UseCheckGroup/useCheckGroup';
import useGetStatusAttendance from '../../hooks/UseGetStatusAttedance/useGetStatusAttendance';
import AlertStatus from '../Alert/AlertStatus';
import ButtonFill from '../Button/ButtonFill/ButtonFill';
import ButtonIcon from '../Button/ButtonIcon/ButtonIcon';
import LoadingAttendanceInformation from '../LoadingPulse/LoadingAttendanceInformation';
import SwipeClockIn from '../SwipeClockIn/SwipeClockIn';
import LoadingAttendanceInformationClockInStatus from './LoadingAttendanceInformationClockInStatus';

const AttendanceInformation = () => {
    const [initilaizingGroupInfo, groupInfo] = useCheckGroup()
    const [initializeGetStatusAttendance, statusAttendance] = useGetStatusAttendance()
    const [dropDown, setDropDonw] = useState(false)
    const navigate = useNavigate()

  return (
    <div className='px-4 mb-4'>
        <div className='w-full rounded-2xl flex flex-col bg-white border border-gray-200 dark:bg-slate-800 dark:border-gray-600'>
            {initilaizingGroupInfo? 
            <LoadingAttendanceInformation/>
            : 
            (groupInfo.status === "01") ? 
            <>
                <div className='flex justify-between items-center px-4 py-2 dark:text-white'>
                    <div className='flex justify-start'>
                        <p className='text-xl font-bold'>{groupInfo.groupName}</p>
                    </div>
                    <div>
                        {groupInfo.groupMember.some(val => val.status === "02")? <div className='flex justify-end'><span className="absolute rounded-full h-2 w-2 bg-red-500"></span></div> : ""}
                        <ButtonIcon actionFunction={() => setDropDonw(!dropDown)} icon={<svg className="h-6 w-6"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"> <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="12" r="1" />  <circle cx="12" cy="19" r="1" />  <circle cx="12" cy="5" r="1" /></svg>}/>
                        {dropDown&&<div onClick={() => setDropDonw(!dropDown)} className='fixed inset-0 z-40'></div>}
                        <div className='flex justify-end'>                            
                            <ul className={`divide-y text-gray-700 absolute z-50 bg-white rounded px-4 py-2 shadow-md w-fit dark:bg-black dark:text-white ${dropDown? 'block' : 'hidden'} `}>
                                <li className='cursor-pointer' onClick={() => navigate(`/detail-group`)}>Detail Grup</li>    
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='border-b border-gray-200 dark:border-gray-600'></div>
                {initializeGetStatusAttendance ? <LoadingAttendanceInformationClockInStatus/>
                :
                statusAttendance !== undefined ? 
                
                    <div className='flex flex-col gap-2 p-4'>
                        <AlertStatus type={'success'} text={`Kamu Sudah Clock-In`}/>
                        <div className='flex items-center justify-between'>
                            <p className='text-sm dark:text-white'>Clock-In pada {statusAttendance.addTime}</p>
                            <div className='font-bold px-2 py-1 rounded flex gap-2 bg-blue-100'>
                                <div className='flex items-center gap-1'>
                                    <p className='text-blue-500'>
                                        {statusAttendance.status} 
                                    </p>
                                    <p>
                                        {statusAttendance.status === "WFH"? '????': statusAttendance.status === "WFO" ? '????' : statusAttendance.status === 'Sakit' ? '????' : statusAttendance.status === 'Cuti' ? '???????' :''}
                                    </p>
                                </div>
                                <div className='border-r border-blue-500'></div>
                                <ButtonIcon icon={
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                } actionFunction={() => navigate('/update-attendance', {state: statusAttendance.id})} />
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
                        <p className='text-lg font-bold'>{groupInfo.groupName}</p>
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