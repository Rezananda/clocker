import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, query, updateDoc, where, writeBatch } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import ButtonFill from '../../components/Button/ButtonFill/ButtonFill';
import ButtonIcon from '../../components/Button/ButtonIcon/ButtonIcon';
import ButtonOutline from '../../components/Button/ButtonOutline/ButtonOutline';
import { db } from '../../utils/Firebase/Firebase';
import ApproveGroup from './ApproveGroup';
import ConfirmationApproveGroup from './ConfirmationApproveGroup';

const HandleNotification = () => {
  const history = useHistory()
  const location = useLocation();
  const [initializeUser, setInitializeUser] = useState(false)
  const [initializeGroupMember, setInitializeGroupMember] = useState(false)
  const [initializeHandleChangeStatus, setInitializeHandleChangeStatus] = useState(false)
  const [userData, setUserData] = useState({})
  const [groupMember, setGroupMember] = useState({})
  const [stepApprove, setGroupApprove] = useState(1)

  const detailNotification = location.state.data

  console.log(groupMember)

  const handleStepApprove = (statusStepJoinGroup) => {
    if(statusStepJoinGroup === "prev"){
      setGroupApprove(stepApprove - 1)
    }else if(statusStepJoinGroup === "next"){
      setGroupApprove(stepApprove + 1)
    }else{
        console.log('error step')
  }
  }
  
  const handleGetUserData = async() => {
    setInitializeUser(true)
    const userRef = doc(db, "users", detailNotification.additionalMessage.requestJoinId);
    const userSnap = await getDoc(userRef);
    if(userSnap.exists()){
      setUserData(userSnap.data())
      setInitializeUser(false)
    }else{
      console.log('tidak ada data')
      setInitializeUser(false)
    }
  }

  const handleGetGroupMember = async() => {
    setInitializeGroupMember(true)
    const userSnap = await getDoc(doc(db, "groupInformation", detailNotification.additionalMessage.groupId));
    if(userSnap.exists()){
      userSnap.data().groupMember.map((data) => {
        if(data.userId === detailNotification.additionalMessage.requestJoinId){
          setGroupMember(data)
        }
        return data
      })
      setInitializeGroupMember(false)
    }
  }

  useEffect(() => {
    handleGetUserData()
    handleGetGroupMember()
  }, [])
  

  const handleChangeStatus = async(status) => {
    setInitializeHandleChangeStatus(true)
    try{
      const batch = writeBatch(db)
      
      const groupInfo = doc(db, "groupInformation", detailNotification.additionalMessage.groupId)
  
      batch.update(groupInfo, {
        groupMember: arrayRemove({
          userId: detailNotification.additionalMessage.requestJoinId,
          status: "02",
          roleUser: "02"
        })
      })
      if(status === "approve"){
        console.log('approve')
        batch.update(groupInfo, {
          groupMember: arrayUnion(groupMember)
        })
        await batch.commit()
        // history.push('/dashboard')
        setInitializeHandleChangeStatus(false)
      }else if(status === "reject"){
        console.log('reject')
        batch.update(groupInfo, {
          groupMember: arrayUnion({
            userId: detailNotification.additionalMessage.requestJoinId,
            status: "03",
            roleUser: "02"
          })
        })
        await batch.commit()
        // history.push('/dashboard')
        setInitializeHandleChangeStatus(false)
      }
    }catch(e){
      console.log(e)
      setInitializeHandleChangeStatus(false)
    }
  }



  return (
    <div className='min-h-screen bg-gray-50'> 
      {(detailNotification.typeNotification === "approval-group" )?
      <div >
        <nav className='bg-white px-2 py-4 flex items-center mb-4 drop-shadow'>
        <ButtonIcon 
              actionFunction={()=> history.push('/dashboard/notifications')} 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>}/>
            <p className='text-md font-bold text-blue-500 flex ml-1'>Persetujuan Grup</p>
        </nav>
        {(stepApprove === 1) ? <ApproveGroup initializeUser={initializeUser} userData={userData} initializeGroupMember={initializeGroupMember} setGroupMember={setGroupMember} groupMember={groupMember} handleStepApprove={handleStepApprove}/> : (stepApprove === 2)? <ConfirmationApproveGroup initializeHandleChangeStatus={initializeHandleChangeStatus} handleChangeStatus={handleChangeStatus}/> : ""}

      </div>
      :
      <></>
      }
    </div>
  )
}

export default HandleNotification