import { Timestamp } from 'firebase/firestore';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useCheckGroup from '../../hooks/UseCheckGroup/useCheckGroup';
import UseCheckPersonalAttendance from '../../hooks/UseCheckPersonalAttendance/UseCheckPersonalAttendance';
import useUserContext from '../../hooks/UseUserContext/UseUserContext';
import Alert from '../Alert/Alert';
import ButtonIcon from '../Button/ButtonIcon/ButtonIcon';
import ButtonOutline from '../Button/ButtonOutline/ButtonOutline';
import LoadingAttendanceInformation from '../LoadingPulse/LoadingAttendanceInformation';
import SwipeClockIn from '../SwipeClockIn/SwipeClockIn';
import LoadingAttendanceInformationClockInStatus from './LoadingAttendanceInformationClockInStatus';

const AttendanceInformation = () => {
    const userContext = useUserContext()
    const uid = userContext.currentUser.uid
    const [initilaizingGroupInfo, groupInfo] = useCheckGroup()
    const [initializePersonalAttendance, personalAttendance] = UseCheckPersonalAttendance(uid)
    const [dropDown, setDropDonw] = useState(false)
    const navigate = useNavigate()

  return (
    <div className='px-4 mb-4'>
        <div className='w-full rounded flex flex-col bg-blue-500 p-4 gap-2 drop-shadow-md'>
            {initilaizingGroupInfo? 
            <LoadingAttendanceInformation/>
            : 
            (groupInfo.status === "01") ? 
            <>
                <div className='flex justify-between h-10 items-center'>
                    <div className='flex justify-start'>
                        <p className='text-lg font-bold text-white'>{groupInfo.data.groupName}</p>
                    </div>
                    
                    <div>
                        {groupInfo.data.groupMember.some(val => val.status === "02")? <div className='flex justify-end'><span className="absolute rounded-full h-2 w-2 bg-red-500"></span></div> : ""}
                        <ButtonIcon actionFunction={() => setDropDonw(!dropDown)} icon={<svg className="h-6 w-6 text-white"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"> <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="12" r="1" />  <circle cx="12" cy="19" r="1" />  <circle cx="12" cy="5" r="1" /></svg>}/>
                        <div className='flex justify-end'>                            
                            <ul className={`divide-y text-gray-700 absolute z-50 bg-white rounded px-4 py-2 shadow-md ${dropDown? 'block' : 'hidden'} `}>
                                <li onClick={() => navigate(`/detail-group`)} className="">Detail Grup</li>    

                            </ul>
                        </div>
                    </div>
                </div>
                {initializePersonalAttendance ? <LoadingAttendanceInformationClockInStatus/>
                :
                <div className='flex flex-col justify-center'>
                    {personalAttendance.find(val => val.addDate === new Date(Timestamp.now().seconds*1000).toLocaleDateString()) ? 
                    <Alert type={'success'} text={'Kamu sudah Clock-In'} additionalClass={'mb-4'}/>
                    :
                    <>
                    <Alert type={'info'} text={'Kamu belum Clock-In, Swipe untuk Clock-In'} additionalClass={'mb-4'}/>
                    <SwipeClockIn/>
                    </>
                    }
                </div>
                }
            </>
            :
            (groupInfo.status === "02") ? 
            <>
                <div className='flex justify-between h-10 items-center'>
                    <div className='flex justify-start'>
                        <p className='text-lg font-bold text-white'>{groupInfo.data.groupName}</p>
                    </div>
                    <div className=''>
                        <ButtonIcon actionFunction={() => setDropDonw(!dropDown)} icon={<svg className="h-6 w-6 text-white"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"> <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="12" r="1" />  <circle cx="12" cy="19" r="1" />  <circle cx="12" cy="5" r="1" /></svg>}/>
                        <div className='flex justify-end'>                            
                            <ul className={`divide-y text-gray-700 absolute z-50 bg-white rounded px-4 py-2 ${dropDown? 'block' : 'hidden'} `}>
                                <li className="">Keluar Grup</li>                            
                                <li className="">Informasi</li>                                                   
                            </ul>
                        </div>
                    </div>
                </div>
                <Alert type={'info'} additionalClass={'mb-4'} text="Menunggu persetujuan Admin"/>
            </>
            :
            <div className='flex flex-col'>
                <Alert type={'warning'} additionalClass={'mb-4'} text="Belum ada grup."/>
                <ButtonOutline label="Tambah Grup" handleClick={() => navigate('/add-group')}/>
            </div>
            }
        </div>
    </div>
  )
}

export default AttendanceInformation