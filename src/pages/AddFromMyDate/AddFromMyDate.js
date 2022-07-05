import { collection, doc, getDoc, serverTimestamp, Timestamp, writeBatch } from 'firebase/firestore'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ButtonIcon from '../../components/Button/ButtonIcon/ButtonIcon'
import Stepper from '../../components/Stepper/Stepper'
import useUserContext from '../../hooks/UseUserContext/UseUserContext'
import { db } from '../../utils/Firebase/Firebase'
import Confirmation from './Confirmation/Confirmation'
import InputData from './InputData/InputData'
import Result from './Result/Result'

const AddFromMyDate = () => {
    const userContext = useUserContext()
    const uid = userContext.currentUser.uid
    const navigate = useNavigate()
    const location = useLocation()
    const [stepAddCalender, setStepAddCalender] = useState(1)
    const [initializeAddCalender, setInitializeAddCalender] = useState(false)
    const [calender, setCalender] = useState(location.state)
    
    function handleStepAddCalender(statusAddCalender){
        if(statusAddCalender === "prev"){
          setStepAddCalender(stepAddCalender - 1)
        }else if(statusAddCalender === "next"){
            setStepAddCalender(stepAddCalender + 1)
        }else{
            console.log('error step')
        }
      }
      const handleAddCalender = async() => {
        try {
            setInitializeAddCalender(true)
          const docRefGetUser = doc(db, "users", uid);
          const docSnapGetUser = await getDoc(docRefGetUser);
          const batch = writeBatch(db)
    
          const attendances = {
            userName: docSnapGetUser.data().displayName,
            userId: docSnapGetUser.id,
            timestamp: Timestamp.now() ,
            addDate: new Date(Timestamp.now().seconds*1000).toLocaleDateString(),
            addTime: new Date(Timestamp.now().seconds*1000).toTimeString().split(' ')[0].substring(0,5),
            updateDate: Timestamp.now(),
            groupId: docSnapGetUser.data().group[0],
            photoURL: docSnapGetUser.data().photoURL
          }
    
          if(new Date(calender.startDate).toLocaleDateString() === new Date(calender.endDate).toLocaleDateString()){
            attendances.status = "Cuti"
            attendances.timestamp= new Date(calender.startDate)
            attendances.addDate= new Date(calender.startDate).toLocaleDateString()
            attendances.addTime= new Date(Timestamp.now().seconds*1000).toTimeString().split(' ')[0].substring(0,5)
            attendances.startDate = new Date(calender.startDate).toLocaleDateString()
            attendances.endDate = new Date(calender.endDate).toLocaleDateString()
            const attendanceRef = doc(collection(db, "attendanceInformation"))
            batch.set(attendanceRef, attendances);
          }else{
            for (let date = new Date(calender.startDate); date <= new Date(calender.endDate); date.setDate(date.getDate() + 1)){
              attendances.status = "Cuti"
              attendances.timestamp= date
              attendances.addDate= date.toLocaleDateString()
              attendances.addTime= new Date(Timestamp.now().seconds*1000).toTimeString().split(' ')[0].substring(0,5)
              attendances.startDate = new Date(calender.startDate).toLocaleDateString()
              attendances.endDate = new Date(calender.endDate).toLocaleDateString()
              const attendanceRef = doc(collection(db, "attendanceInformation"))
              batch.set(attendanceRef, attendances);
            }
          }
    
          const transactions = {
            userId: docSnapGetUser.id,
            transaction: "attendance",
            transactionType: 'add',
            date: serverTimestamp()
          }
    
          const transacrionRef = doc(collection(db, "transactionInformation"))
          batch.set(transacrionRef, transactions);
    
          await batch.commit()
    
          setInitializeAddCalender(false)
          handleStepAddCalender('next')
        } catch (error) {
          console.log(error)
          setInitializeAddCalender(false)
        }
      }
  return (
    <div>
        <nav className="mb-2 px-2 py-4 bg-blue-500 drop-shadow-md fixed top-0 w-full z-10">
          <div className='flex justify-start items-center'>
          <ButtonIcon 
          actionFunction={() => navigate('/my-date')}
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>}
          />
          <p className='text-md font-bold text-white flex ml-1'>Tambah Data Kalender</p>
          </div>
      </nav>
      <div className='px-4 mt-20'>
        <div className='bg-white rounded-lg p-4 flex flex-col border border-gray-200'>
          <Stepper stepAddGroup={stepAddCalender}/>
          {stepAddCalender === 1? 
          <InputData startDate={location.state.startDate} endDate={location.state.endDate} handleStepAddCalender={handleStepAddCalender} setCalender={setCalender}/> : 
          stepAddCalender === 2 ? 
          <Confirmation initializeAddCalender={initializeAddCalender} handleStepAddCalender={handleStepAddCalender} calender={calender} handleAddCalender={handleAddCalender}/> : 
          stepAddCalender === 3? 
          <Result calender={calender}/> : ""}
        </div>
      </div>
    </div>
  )
}

export default AddFromMyDate