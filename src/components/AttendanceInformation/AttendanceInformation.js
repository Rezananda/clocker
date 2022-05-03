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
        <div className='w-full rounded bg-white flex flex-col bg-blue-500 p-4 gap-2 drop-shadow-md'>
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
                    <Alert color="green" 
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>} 
                        text="Kamu sudah Clock-In"
                    />
                    :
                    <>
                        <Alert 
                            additionalClass="mb-4" 
                            color="yellow" 
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-500 flex justify-start" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>} 
                            text={"Kamu Belum Clock-In. Swipe untuk Clcok-In"}
                        />
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
                <Alert color="yellow" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>} text="Menunggu persetujuan Admin"/>
            </>
            :
            <div className='flex flex-col'>
                <Alert color="yellow" additionalClass="mb-4" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>} text="Belum ada grup."/>
                <ButtonOutline label="Tambah Grup" handleClick={() => navigate('/add-group')}/>
            </div>
            }
        </div>
    </div>
  )
}

export default AttendanceInformation