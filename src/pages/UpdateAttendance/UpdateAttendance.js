import { collection, doc, getDoc, serverTimestamp, Timestamp, writeBatch } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ButtonIcon from '../../components/Button/ButtonIcon/ButtonIcon'
import SpinnerLoading from '../../components/SpinnerLoading/SpinnerLoading'
import Stepper from '../../components/Stepper/Stepper'
import { AuthContext } from '../../context/AuthProvider/AuthProvider'
import useCheckGroup from '../../hooks/UseCheckGroup/useCheckGroup'
import { db } from '../../utils/Firebase/Firebase'
import Result from './Result/Result'
import Confirmation from './Confirmation/Confirmation'
import InputData from './InputData/InputData'

const UpdateAttendance = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const user = useContext(AuthContext)
    const [attendanceData, setAttendanceData] = useState({})
    const [initializeUpdateAttendance, setInitializeUpdateAttendance] = useState(false)
    const [initializeGetAttendance, setInitializeGetAttendance] = useState(false)
    const [initilaizingGroupInfo, groupInfo] = useCheckGroup(user.currentUser.uid)
    const [stepUpdateAttendance, setStepUpdateAttendance] = useState(1)
    
    const getAttendance = async() => {
        setInitializeGetAttendance(true)
        const docRefAttendance = doc(db, "attendanceInformation", location.state)
        const docSnapAttendance = await getDoc(docRefAttendance)
        setAttendanceData(docSnapAttendance.data())
        setInitializeGetAttendance(false)
    }

    useEffect(() => {
      getAttendance()
      return () => {
        getAttendance()
      }
    }, [])

    function handleStepUpdateAttendance(statusStepAddGroup){
        if(statusStepAddGroup === "prev"){
            setStepUpdateAttendance(stepUpdateAttendance - 1)
        }else if(statusStepAddGroup === "next"){
            setStepUpdateAttendance(stepUpdateAttendance + 1)
        }else{
            console.log('error step')
        }
      }

    const handleUpdateAttendance = async() => {
      try{
        setInitializeUpdateAttendance(true)
        const docRefGetUser = doc(db, "users", user.currentUser.uid);
        const docSnapGetUser = await getDoc(docRefGetUser);
        const batch = writeBatch(db)

        const attendances = {
          userName: docSnapGetUser.data().displayName,
          userId: docSnapGetUser.id,
          timestamp: attendanceData.timestamp ,
          addDate: attendanceData.addDate,
          addTime: attendanceData.addTime,
          updateDate: Timestamp.now(),
          groupId: docSnapGetUser.data().group[0],
          photoURL: docSnapGetUser.data().photoURL
        }
        
        if(attendanceData.status === 'WFH'){
          attendances.status = 'WFH'
          const attendanceRef = doc(db, "attendanceInformation", location.state)
          batch.set(attendanceRef, attendances);
        }else if(attendanceData.status === 'WFO'){
          attendances.status = "WFO"
          attendances.wfoLocation = attendanceData.wfoLocation
          const attendanceRef = doc(db, "attendanceInformation", location.state)
          batch.set(attendanceRef, attendances);
        }else if(attendanceData.status === "Sakit"){
          attendances.status = "Sakit"
          attendances.sickReason = attendanceData.sickReason
          const attendanceRef = doc(db, "attendanceInformation", location.state)
          batch.set(attendanceRef, attendances);
        }else if(attendanceData.status === "Cuti"){
          if(new Date(attendanceData.startDate).toLocaleDateString() === new Date(attendanceData.endDate).toLocaleDateString()){
            attendances.status = "Cuti"
            attendances.timestamp= new Date(attendanceData.startDate)
            attendances.addDate= new Date(attendanceData.startDate).toLocaleDateString()
            attendances.addTime= new Date(Timestamp.now().seconds*1000).toTimeString().split(' ')[0].substring(0,5)
            attendances.startDate = new Date(attendanceData.startDate).toLocaleDateString()
            attendances.endDate = new Date(attendanceData.endDate).toLocaleDateString()
            const attendanceRef = doc(db, "attendanceInformation", location.state)
            batch.set(attendanceRef, attendances);
          }else{
            for (let date = new Date(attendanceData.startDate); date <= new Date(attendanceData.endDate); date.setDate(date.getDate() + 1)){
              attendances.status = "Cuti"
              attendances.timestamp= date
              attendances.addDate= date.toLocaleDateString()
              attendances.addTime= new Date(Timestamp.now().seconds*1000).toTimeString().split(' ')[0].substring(0,5)
              attendances.startDate = new Date(attendanceData.startDate).toLocaleDateString()
              attendances.endDate = new Date(attendanceData.endDate).toLocaleDateString()
              const attendanceRef = doc(db, "attendanceInformation", location.state)
              batch.set(attendanceRef, attendances);
            }
          }
        }
        const transactions = {
          userId: docSnapGetUser.id,
          transaction: "attendance",
          transactionType: 'update',
          date: serverTimestamp()
        }
  
        const transacrionRef = doc(collection(db, "transactionInformation"))
        batch.set(transacrionRef, transactions);

        await batch.commit()
        setInitializeUpdateAttendance(false)
        handleStepUpdateAttendance('next')
      }catch(e){
        console.log(e)
        setInitializeUpdateAttendance(false)
      }
    }
  
  return (
    <>
    {initializeGetAttendance? <SpinnerLoading/> :
    <>    
    <nav className="mb-2 px-2 py-4 bg-blue-500 drop-shadow-md fixed top-0 w-full z-10">
        <div className='flex justify-start items-center'>
        <ButtonIcon 
        actionFunction={() => navigate(-1)}
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
        </svg>}
        />
        <p className='text-md font-bold text-white flex ml-1'>Ubah Kehadiran</p>
        </div>
    </nav>
    <div className='px-4 mt-20'>
        <div className='bg-white rounded-lg p-4 flex flex-col border border-gray-200'>
        <Stepper stepAddGroup={stepUpdateAttendance}/>
        {stepUpdateAttendance === 1? 
        <InputData setAttendanceData={setAttendanceData} attendanceData={attendanceData} handleStepUpdateAttendance={handleStepUpdateAttendance} initilaizingGroupInfo={initilaizingGroupInfo} groupInfo={groupInfo}/> : 
        stepUpdateAttendance === 2 ? 
        <Confirmation attendanceData={attendanceData} handleStepUpdateAttendance={handleStepUpdateAttendance} handleUpdateAttendance={handleUpdateAttendance} initializeUpdateAttendance={initializeUpdateAttendance} /> : 
        stepUpdateAttendance === 3 ?
        <Result attendanceData={attendanceData}/>:
        ""}
        </div>
    </div>
    </>
    }
    </>
  )
}

export default UpdateAttendance