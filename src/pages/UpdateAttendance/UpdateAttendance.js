import { collection, doc, getDoc, serverTimestamp, Timestamp, writeBatch } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SpinnerLoading from '../../components/SpinnerLoading/SpinnerLoading'
import Stepper from '../../components/Stepper/Stepper'
import { AuthContext } from '../../context/AuthProvider/AuthProvider'
import useCheckGroup from '../../hooks/UseCheckGroup/useCheckGroup'
import { db } from '../../utils/Firebase/Firebase'
import Result from './Result/Result'
import Confirmation from './Confirmation/Confirmation'
import InputData from './InputData/InputData'
import TopNavbar from '../../components/Navbar/TopNavbar'

const UpdateAttendance = () => {
    const location = useLocation()
    const user = useContext(AuthContext)
    const [attendanceData, setAttendanceData] = useState({})
    const [attendanceDataBefore, setAttendanceDataBefore] = useState()
    const [initializeUpdateAttendance, setInitializeUpdateAttendance] = useState(false)
    const [initializeGetAttendance, setInitializeGetAttendance] = useState(false)
    const [initilaizingGroupInfo, groupInfo] = useCheckGroup(user.currentUser.uid)
    const [stepUpdateAttendance, setStepUpdateAttendance] = useState(1)
    
    const getAttendance = async() => {
        setInitializeGetAttendance(true)
        const docRefAttendance = doc(db, "attendanceInformation", location.state)
        const docSnapAttendance = await getDoc(docRefAttendance)
        setAttendanceData(docSnapAttendance.data())
        setAttendanceDataBefore(docSnapAttendance.data())
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
          data: {
            before:attendanceDataBefore,
            after:attendances
          },
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
    <div className='flex flex-col h-screen'>
      <div className='flex sticky top-0 flex-col'>
        <TopNavbar navbarColor={'bg-blue-500'} label={'Ubah Kehadiran'} labelColor={'text-white'} back={true} navigateTo={-1}/>
      </div>    
      <div className='px-4 py-4 flex overflow-y-auto flex-col'>
        <Stepper stepAddGroup={stepUpdateAttendance}/>
        <div className='bg-white rounded-lg p-4 flex flex-col dark:bg-slate-800'>
          {stepUpdateAttendance === 1? 
          <InputData setAttendanceData={setAttendanceData} attendanceData={attendanceData} handleStepUpdateAttendance={handleStepUpdateAttendance} initilaizingGroupInfo={initilaizingGroupInfo} groupInfo={groupInfo}/> : 
          stepUpdateAttendance === 2 ? 
          <Confirmation attendanceData={attendanceData} handleStepUpdateAttendance={handleStepUpdateAttendance} handleUpdateAttendance={handleUpdateAttendance} initializeUpdateAttendance={initializeUpdateAttendance} /> : 
          stepUpdateAttendance === 3 ?
          <Result attendanceData={attendanceData}/>:""}
        </div>
        <div className='h-20'></div>
      </div>
    </div>
    }
    </>
  )
}

export default UpdateAttendance