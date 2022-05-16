import React, { useContext, useState } from 'react'
import ButtonIcon from '../../components/Button/ButtonIcon/ButtonIcon'
import "react-datepicker/dist/react-datepicker.css";
import Stepper from '../../components/Stepper/Stepper'
import { AuthContext } from '../../context/AuthProvider/AuthProvider'
import InputData from './InputData/InputData'
import Confirmation from './Confirmation/Confirmation'
import Result from './Result/Result'
import useCheckGroup from '../../hooks/UseCheckGroup/useCheckGroup'
import { collection, doc, getDoc, serverTimestamp, Timestamp, writeBatch } from 'firebase/firestore'
import { db } from '../../utils/Firebase/Firebase'
import { useNavigate } from 'react-router-dom'

const AddAttendace = () => {
  const navigate = useNavigate()
  const user = useContext(AuthContext)
  const [initilaizingGroupInfo, groupInfo] = useCheckGroup(user.currentUser.uid)
  const [attendanceData, setAttendanceData] = useState({})
  const [initializeAddAttendance, setInitializeAddAttendance] = useState(false)

  const [stepAddAttendance, setStepAddAttendance] = useState(1)

  function handleStepAddAttendance(statusStepAddGroup){
    if(statusStepAddGroup === "prev"){
      setStepAddAttendance(stepAddAttendance - 1)
    }else if(statusStepAddGroup === "next"){
      setStepAddAttendance(stepAddAttendance + 1)
    }else{
        console.log('error step')
    }
  }

  const handleAddAttendance = async() => {
    try {
      setInitializeAddAttendance(true)
      const docRefGetUser = doc(db, "users", user.currentUser.uid);
      const docSnapGetUser = await getDoc(docRefGetUser);

      const attendances = {
        userName: docSnapGetUser.data().displayName,
        userId: docSnapGetUser.id,
        timestamp: Timestamp.now(),
        addDate: new Date(Timestamp.now().seconds*1000).toLocaleDateString(),
        addTime: new Date(Timestamp.now().seconds*1000).toLocaleTimeString(),
        updateDate: Timestamp.now(),
        groupId: docSnapGetUser.data().group[0],
        photoURL: docSnapGetUser.data().photoURL
      }

      if(attendanceData.status === 'WFH'){
        attendances.status = 'WFH'
      }else if(attendanceData.status === 'WFO'){
        attendances.status = "WFO"
        attendances.wfoLocation = attendanceData.wfoLocation
      }else if(attendanceData.status === "Sakit"){
        attendances.status = "Sakit"
        attendances.sickReason = attendanceData.sickReason
      }else if(attendanceData.status === "Cuti"){
        attendances.status = "Cuti"
        attendances.startDate = new Date(attendanceData.startDate).toLocaleDateString()
        attendances.endDate = new Date(attendanceData.endDate).toLocaleDateString()
      }

      const transactions = {
        userId: docSnapGetUser.id,
        transaction: "attendance",
        transactionType: 'add',
        date: serverTimestamp()
      }

      const batch = writeBatch(db)
      const attendanceRef = doc(collection(db, "attendanceInformation"))
      const transacrionRef = doc(collection(db, "transactionInformation"))

      batch.set(attendanceRef, attendances);
      batch.set(transacrionRef, transactions);

      await batch.commit()

      setInitializeAddAttendance(false)
      handleStepAddAttendance('next')
    } catch (error) {
      console.log(error)
      setInitializeAddAttendance(false)
    }
  }

  return (
    <>
      <nav className="mb-2 px-2 py-4 bg-blue-500 drop-shadow-md fixed top-0 w-full z-10">
          <div className='flex justify-start items-center'>
            <ButtonIcon 
            actionFunction={()=> navigate(-1)} 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>}
            />
            <p className='text-md font-bold text-white flex ml-1'>Tambah Kehadiran</p>
          </div>
      </nav>
      <div className='px-4 mt-20'>
        <div className='bg-white rounded-lg p-4 flex flex-col border border-gray-200'>
          <Stepper stepAddGroup={stepAddAttendance}/>
          {stepAddAttendance === 1? <InputData setAttendanceData={setAttendanceData} attendanceData={attendanceData} initilaizingGroupInfo={initilaizingGroupInfo} groupInfo={groupInfo} handleStepAddAttendance={handleStepAddAttendance}/> : stepAddAttendance === 2 ? <Confirmation initilaizingGroupInfo={initilaizingGroupInfo} groupInfo={groupInfo} attendanceData={attendanceData} handleStepAddAttendance={handleStepAddAttendance} handleAddAttendance={handleAddAttendance} initializeAddAttendance={initializeAddAttendance}/> : stepAddAttendance === 3? <Result initilaizingGroupInfo={initilaizingGroupInfo} groupInfo={groupInfo} attendanceData={attendanceData}/> : ""}
        </div>
      </div>
    </>
  )
}

export default AddAttendace