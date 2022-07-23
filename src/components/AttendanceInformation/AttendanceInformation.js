import moment from 'moment';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useCheckGroup from '../../hooks/UseCheckGroup/useCheckGroup';
import useGetStatusAttendance from '../../hooks/UseGetStatusAttedance/useGetStatusAttendance';
import AlertStatus from '../Alert/AlertStatus';
import ButtonFill from '../Button/ButtonFill/ButtonFill';
import ButtonOutline from '../Button/ButtonOutline/ButtonOutline';
import LoadingAttendanceInformation from '../LoadingPulse/LoadingAttendanceInformation';
import SlideIn from '../SlideIn/SlideIn';
import SpinnerLoading from '../SpinnerLoading/SpinnerLoading';
import SwipeClockIn from '../SwipeClockIn/SwipeClockIn';
import LoadingAttendanceInformationClockInStatus from './LoadingAttendanceInformationClockInStatus';

const AttendanceInformation = () => {
    const [initilaizingGroupInfo, groupInfo] = useCheckGroup()
    const [initializeGetStatusAttendance, statusAttendance] = useGetStatusAttendance()
    const [slideIn, setSlideIn] = useState(false)
    const navigate = useNavigate()

  return (
      <>
        <div className='px-4 mb-4'>
            <div className='w-full rounded-2xl flex flex-col bg-white dark:bg-slate-800'>
                {initilaizingGroupInfo? 
                <LoadingAttendanceInformation/>
                : 
                (groupInfo.status === "01") ? 
                <>
                    <div className='flex justify-between items-center px-4 py-2 cursor-pointer dark:text-white' onClick={() => navigate(`/detail-group`)}>
                        <div className='flex justify-start'>
                            {groupInfo.groupMember.some(val => val.status === "02")? <div className='flex justify-end'><span className="absolute rounded-full h-2 w-2 bg-red-500"></span></div> : ""}
                            <p className='text-xl font-bold'>{groupInfo.groupName}</p>
                        </div>
                    </div>
                    <div className='border-b border-gray-100 dark:border-gray-600'></div>
                    {initializeGetStatusAttendance ? <LoadingAttendanceInformationClockInStatus/>
                    :
                    statusAttendance !== undefined ? 
                        <div className='flex flex-col gap-2 p-4 cursor-pointer' onClick={() => setSlideIn(true)}>
                            <AlertStatus type={'success'} time={statusAttendance.addTime} attendanceStatus={statusAttendance.status}/>
                            <div className='flex items-center justify-between'>
                            </div>
                        </div>
                    :
                    <div className='flex flex-col justify-center px-4 py-4'>
                        <div className='flex flex-col gap-4'>
                            <AlertStatus type={'info'}/>
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
                        <AlertStatus type={'waitingAdmin'}/>
                    </div>
                </>
                :
                <div className='flex flex-col p-4 gap-4'>
                    <AlertStatus type={'noGroup'}/>
                    <ButtonFill label={'Tambah Grup'} handleClick={() => navigate('/add-group')} additionalClass={'bg-blue-500 border-blue-500'}/>
                </div>
                }
            </div>
        </div>

        {slideIn?
        <SlideIn>            
            {initializeGetStatusAttendance ? 
            <SpinnerLoading/>
            :
            <div className='flex flex-col w-full p-4 gap-4'>
                <div className='flex justify-between w-full items-center border-b border-gray-100 mb-2'>
                    <p className='font-bold'>Detail Kehadiran</p>
                    <button className='flex justify-end mb-2' onClick={() => setSlideIn(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <ul className='text-center flex flex-col gap-2 w-full'>
                    <li>
                        <p className='text-sm dark:text-white'>Kehadiran</p>
                        <p className='text-lg font-bold dark:text-white'>{statusAttendance.status}</p>
                    </li>
                    <li>
                        {statusAttendance.wfoLocation&&<li><p className='text-sm dark:text-white'>Lokasi WFO</p> <p className='text-lg font-bold dark:text-white'> {statusAttendance.wfoLocation}</p></li>}
                        {statusAttendance.startDate&&statusAttendance.endDate&&<li><p className='text-sm dark:text-white'>Lama Cuti</p> <p className='font-bold text-lg dark:text-white'>{moment(moment(statusAttendance.startDate)).format('DD/MM/YYYY')} - {moment(moment(statusAttendance.endDate)).format('DD/MM/YYYY')}</p></li>}
                        {statusAttendance.sickReason&&<li><p className='text-sm dark:text-white'>Alasan Sakit</p><p className='font-bold text-lg dark:text-white'> {statusAttendance.sickReason}</p></li>}
                    </li>
                    <li>
                        <p className='text-sm dark:text-white'>Tanggal Kehadiran</p>
                        <p className='text-lg font-bold dark:text-white'>{statusAttendance.addDate}</p>
                    </li>
                    <li>
                        <p className='text-sm dark:text-white'>Waktu Kehadiran</p>
                        <p className='text-lg font-bold dark:text-white'>{statusAttendance.addTime}</p>
                    </li>
                </ul>
                <ButtonOutline label={'Ubah'} handleClick={() => navigate('/update-attendance', {state: statusAttendance.id})}/>
            </div>
            }

        </SlideIn>
        :
        null
        }
      </>
  )
}

export default AttendanceInformation