import React, { useContext, useState } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import Stepper from '../../components/Stepper/Stepper'
import { AuthContext } from '../../context/AuthProvider/AuthProvider'
import InputData from './InputData/InputData'
import Confirmation from './Confirmation/Confirmation'
import Result from './Result/Result'
import useCheckGroup from '../../hooks/UseCheckGroup/useCheckGroup'
import { collection, doc, getDoc, serverTimestamp, Timestamp, writeBatch } from 'firebase/firestore'
import { db } from '../../utils/Firebase/Firebase'
import TopNavbar from '../../components/Navbar/TopNavbar';
import moment from 'moment';

const AddAttendace = () => {
  const user = useContext(AuthContext)
  const [initilaizingGroupInfo, groupInfo] = useCheckGroup()
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
      const batch = writeBatch(db)

      const attendances = {
        userName: docSnapGetUser.data().displayName,
        userId: docSnapGetUser.id,
        timestamp: Timestamp.now(),
        addDate: moment(Timestamp.now().toDate()).format('DD/MM/YYYY'),
        addTime: moment(Timestamp.now().toMillis()).format('HH:mm') ,
        updateDate: Timestamp.now(),
        groupId: docSnapGetUser.data().group[0],
        photoURL: docSnapGetUser.data().photoURL
      }

      if(attendanceData.status === 'WFH'){
        attendances.status = 'WFH'
        const attendanceRef = doc(collection(db, "attendanceInformation"))
        batch.set(attendanceRef, attendances);
      }else if(attendanceData.status === 'WFO'){
        attendances.status = "WFO"
        attendances.wfoLocation = attendanceData.wfoLocation
        const attendanceRef = doc(collection(db, "attendanceInformation"))
        batch.set(attendanceRef, attendances);
      }else if(attendanceData.status === "Sakit"){
        attendances.status = "Sakit"
        attendances.sickReason = attendanceData.sickReason
        const attendanceRef = doc(collection(db, "attendanceInformation"))
        batch.set(attendanceRef, attendances);
      }else if(attendanceData.status === "Cuti"){
        if(moment(attendanceData.startDate).toDate() === moment(attendanceData.endDate).toDate()){
          attendances.status = "Cuti"
          attendances.timestamp= Timestamp.fromDate(moment(attendanceData.startDate).toDate())
          attendances.addDate= moment(attendanceData.startDate).format('DD/MM/YYYY')
          attendances.addTime= moment(Timestamp.now().toMillis()).format('HH:mm')
          attendances.startDate = moment(attendanceData.startDate).format('DD/MM/YYYY')
          attendances.endDate = moment(attendanceData.endDate).format('DD/MM/YYYY')
          const attendanceRef = doc(collection(db, "attendanceInformation"))
          batch.set(attendanceRef, attendances);
        }else{
          let start = moment(attendanceData.startDate)
          let endDate = moment(attendanceData.endDate).add(1, 'days')
          while(start.isBefore(endDate, 'day')){
            attendances.status = "Cuti"
            attendances.timestamp= Timestamp.fromDate(start.toDate())
            attendances.addDate= moment(start).format('DD/MM/YYYY')
            attendances.addTime= moment(Timestamp.now().toMillis()).format('HH:mm')
            attendances.startDate = moment(start).format('DD/MM/YYYY')
            attendances.endDate = moment(attendanceData.endDate).format('DD/MM/YYYY')
            const attendanceRef = doc(collection(db, "attendanceInformation"))
            batch.set(attendanceRef, attendances);

            start.add(1, 'days')
          }
        }
      }

      const transactions = {
        userId: docSnapGetUser.id,
        transaction: "attendance",
        transactionType: 'add',
        data: attendances,
        date: serverTimestamp()
      }

      const transacrionRef = doc(collection(db, "transactionInformation"))
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
    <div className='flex flex-col overflow-y-auto'>
      <div className='flex sticky top-0 flex-col z-50'>
        <TopNavbar navbarColor={'bg-blue-500'} label={'Tambah Kehadiran'} labelColor={'text-white'} back={true} navigateTo={-1}/>
      </div>
      <div className='px-4 py-4 flex flex-col'>
        <Stepper stepAddGroup={stepAddAttendance}/>
        <div className='bg-white rounded-lg p-4 h-full overflow-y-auto dark:bg-slate-800 dark:border-gray-600'>
          {stepAddAttendance === 1? 
          <InputData setAttendanceData={setAttendanceData} attendanceData={attendanceData} initilaizingGroupInfo={initilaizingGroupInfo} groupInfo={groupInfo} handleStepAddAttendance={handleStepAddAttendance}/> : 
          stepAddAttendance === 2 ? 
          <Confirmation initilaizingGroupInfo={initilaizingGroupInfo} groupInfo={groupInfo} attendanceData={attendanceData} handleStepAddAttendance={handleStepAddAttendance} handleAddAttendance={handleAddAttendance} initializeAddAttendance={initializeAddAttendance}/> : 
          stepAddAttendance === 3? 
          <Result initilaizingGroupInfo={initilaizingGroupInfo} groupInfo={groupInfo} attendanceData={attendanceData}/> : ""}
        </div>
        <div className='h-20'></div>
      </div>
    </div>
  )
}

export default AddAttendace