import React, { useContext, useState } from 'react'
import ButtonIcon from '../../components/Button/ButtonIcon/ButtonIcon'
import "react-datepicker/dist/react-datepicker.css";
import Stepper from '../../components/Stepper/Stepper'
import { AuthContext } from '../../context/AuthProvider/AuthProvider'
import InputData from './InputData/InputData'
import Confirmation from './Confirmation/Confirmation'
import Result from './Result/Result'
import useCheckGroup from '../../hooks/UseCheckGroup/useCheckGroup'
import { collection, doc, getDoc, setDoc, Timestamp } from 'firebase/firestore'
import { db } from '../../utils/Firebase/Firebase'
import { useNavigate } from 'react-router-dom'

const AddAttendace = () => {
  const navigate = useNavigate()
  const user = useContext(AuthContext)
  const [initilaizingGroupInfo, groupInfo] = useCheckGroup(user.currentUser.uid)
  const [attendanceData, setAttendanceData] = useState({})
  const [initializeAddAttendance, setInitializeAddAttendance] = useState(false)

  console.log(attendanceData)

  const [stepAddAttendance, setStepAddAttendance] = useState(1)
  const [dateCuti, setDateCuti] = useState({
    startDate:"",
    endDate:""
  })

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

      await setDoc(doc(collection(db, "attendanceInformation")), {
        userName: docSnapGetUser.data().displayName,
        userId: docSnapGetUser.id,
        timestamp: Timestamp.now(),
        addDate: new Date(Timestamp.now().seconds*1000).toLocaleDateString(),
        addTime: new Date(Timestamp.now().seconds*1000).toLocaleTimeString(),
        updateDate: Timestamp.now(),
        status: attendanceData.status,
        groupId: docSnapGetUser.data().group[0],
        photoURL: docSnapGetUser.data().photoURL
      })
      setInitializeAddAttendance(false)
      handleStepAddAttendance('next')
    } catch (error) {
      console.log(error)
      setInitializeAddAttendance(false)
    }
  }

  return (
    <>
      <nav className="mb-2 px-2 py-4 bg-white drop-shadow-md">
          <div className='flex justify-start items-center'>
            <ButtonIcon 
            actionFunction={()=> navigate(-1)} 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>}
            />
            <p className='text-md font-bold text-blue-500 flex ml-1'>Tambah Kehadiran</p>
          </div>
      </nav>
      <div className='px-4'>
        <div className='bg-white rounded-lg p-4 flex flex-col gap-4'>
          <Stepper stepAddGroup={stepAddAttendance}/>
          {stepAddAttendance === 1? <InputData setAttendanceData={setAttendanceData} attendanceData={attendanceData} setDateCuti={setDateCuti} dateCuti={dateCuti} initilaizingGroupInfo={initilaizingGroupInfo} groupInfo={groupInfo} handleStepAddAttendance={handleStepAddAttendance}/> : stepAddAttendance === 2 ? <Confirmation initilaizingGroupInfo={initilaizingGroupInfo} groupInfo={groupInfo} attendanceData={attendanceData} handleStepAddAttendance={handleStepAddAttendance} handleAddAttendance={handleAddAttendance} initializeAddAttendance={initializeAddAttendance}/> : stepAddAttendance === 3? <Result initilaizingGroupInfo={initilaizingGroupInfo} groupInfo={groupInfo} attendanceData={attendanceData}/> : ""}
        </div>
      </div>
    </>
  )
}

export default AddAttendace