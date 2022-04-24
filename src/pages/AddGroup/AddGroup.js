import React, { useContext, useState } from 'react'
import ButtonIcon from '../../components/Button/ButtonIcon/ButtonIcon'
import InputGroupName from './AddGroup/InputGroupName'
import ConfirmationAddGroup from './AddGroup/ConfirmationAddGroup'
import { addDoc, arrayUnion, collection, doc, getDoc, serverTimestamp, setDoc, writeBatch } from 'firebase/firestore'
import { db } from '../../utils/Firebase/Firebase'
import { AuthContext } from '../../context/AuthProvider/AuthProvider'
import ResultAddGroup from './AddGroup/ResultAddGroup'
import InputGroupCode from './JoinGroup/InputGroupCode'
import ConfirmationJoinGroup from './JoinGroup/ConfirmationJoinGroup'
import ResultJoinGroup from './JoinGroup/ResultJoinGroup'
import Stepper from '../../components/Stepper/Stepper'
import { useNavigate } from 'react-router-dom'

const AddGroup = () => {

    const user = useContext(AuthContext)
    const navigate = useNavigate()
    // tab state
    const [tab, setTab] = useState(1)
    // stepper
    const [stepAddGroup, setStepAddGroup] = useState(1)
    const [stepJoinGroup, setStepJoinGroup] = useState(1)

    const [groupName, setGroupName] = useState("")

    const [groupStatus, setGroupStatus] = useState([])

    const [loadingSaveGroup, setLoadingSaveGroup] = useState(false)
    
    const [loadingJoinGroup, setLoadingJoinGroup] = useState(false)

    const [groupId, setGroupId] = useState("")

    const [groupCode, setGroupCode] = useState("")

    const [groupCodeData, setGroupCodeData] = useState({})

    const [initializingGroupCodeData, setInitializingGroupCodeData] = useState(false)

    function handleStepAddGroup(statusStepAddGroup){
      if(statusStepAddGroup === "prev"){
          setStepAddGroup(stepAddGroup - 1)
      }else if(statusStepAddGroup === "next"){
        setStepAddGroup(stepAddGroup + 1)
      }else{
          console.log('error step')
      }
    }

    function handleStepJoinGroup(statusStepJoinGroup){
      if(statusStepJoinGroup === "prev"){
          setStepJoinGroup(stepJoinGroup - 1)
      }else if(statusStepJoinGroup === "next"){
        setStepJoinGroup(stepJoinGroup + 1)
      }else{
          console.log('error step')
      }
    }

    const handleCheckCodeGroup = async () => {
      setInitializingGroupCodeData(true)
      const docRefGetGroup = doc(db, "groupInformation", groupCode);
      const docSnapGetGroup = await getDoc(docRefGetGroup)
      if(docSnapGetGroup.exists()){
          setGroupCodeData(docSnapGetGroup.data()) 
          setInitializingGroupCodeData(false)
          handleStepJoinGroup('next')
      }else{
          setInitializingGroupCodeData(false)
          setGroupCodeData(false)
      }
    }

    const handleGroupStatus = (e) => {
      if (e.target.checked) {
        setGroupStatus([...groupStatus,  e.target.value]);
      } else {
        setGroupStatus(groupStatus.filter((id) => id !== e.target.value));
      }
    };

    const handleAddGroup = async () => {
      setLoadingSaveGroup(true)
      try{
        const docRef = await addDoc(collection(db, "groupInformation"), {
          groupName: groupName,
          groupOwnerName: user.currentUser.displayName,
          groupOwnerId: user.currentUser.uid,
          groupMember: [
            {
              userId: user.currentUser.uid, 
              displayName: user.currentUser.displayName,
              photoURL: user.currentUser.photoURL,
              roleUser: '01', 
              status: '01'
            }
          ],
          groupCapacity: 50, 
          groupStatus: groupStatus,
          timestamps: serverTimestamp()
        })
        setGroupId(docRef.id)
        const personalRef = doc(db, "users", user.currentUser.uid)
        setDoc(personalRef, {group: [docRef.id]}, {merge: true})
        handleStepAddGroup('next')
        setLoadingSaveGroup(false)
      }catch(e){
        console.log(e)
        console.log('gagal')
        setLoadingSaveGroup(false)
      }
    }

    const handleJoinGroup = async () => {
      setLoadingJoinGroup(true)
      try{
        const batch = writeBatch(db)
        const groupInformationRef = doc(db, "groupInformation", groupCode)
        batch.update(groupInformationRef, {
          groupMember: arrayUnion({
            status: '02',
            roleUser: '02',
            displayName: user.currentUser.displayName,
            photoURL: user.currentUser.photoURL,
            userId: user.currentUser.uid})
        })
  
        const personalAdditionalInformationRef = doc(db, "users", user.currentUser.uid)
        batch.set(personalAdditionalInformationRef, {group : [groupInformationRef.id]}, {merge: true})

        const personalNotificationAdmin = doc(collection(db, 'personalNotifications'))

        const getGroupAdmin = await getDoc(groupInformationRef)

        batch.set(personalNotificationAdmin, {
          typeNotification: 'approval-group',
          destination: getGroupAdmin.data().groupOwnerId,
          title: "Persetujuan Bergabung Grup",
          message: "Ada yang bergabung ke grup mu nih, kamu bisa setujui / menolaknya",
          additionalMessage: {
            requestJoinId: user.currentUser.uid,
            groupId: getGroupAdmin.id
          },
          opened : false,
          timestamps: serverTimestamp()
        })
        await batch.commit()
        handleStepJoinGroup('next')
        setLoadingJoinGroup(false)
      }catch(e){
        console.log(e)
        setLoadingJoinGroup(false)
      }
    }

  return (
    <>
        <div className="mb-2 bg-white drop-shadow-md">
            <div className='flex justify-start items-center p-2'>
              <ButtonIcon 
              actionFunction={()=> navigate(-1)} 
              icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>}
              />
              <p className='text-md font-bold text-blue-500 flex ml-1'>Tambah Grup</p>
            </div>
            <ul className="flex mb-4">
                <li className="w-full"><button onClick={()=> setTab(1)} className={tab === 1 ? "p-2 w-full text-blue-500 border-b-4 border-blue-500" : "p-2 w-full text-gray-500 rounded-t-lg border-b-2 border-transparent"}>Gabung Grup</button></li>
                <li className="w-full"><button onClick={()=> setTab(2)} className={tab === 2 ? "p-2 w-full text-blue-500 border-b-4 border-blue-500" : "p-2 w-full text-gray-500 rounded-t-lg border-b-2 border-transparent"}>Buat Grup</button></li>
            </ul>
        </div>
        <div className={tab === 1 ? "block px-4" : "hidden"}>
          <div className='bg-white rounded-lg p-4'>
            <Stepper stepAddGroup={stepJoinGroup}/>
            {(stepJoinGroup === 1) ? <InputGroupCode setGroupCode={setGroupCode} groupCode={groupCode} handleCheckCodeGroup={handleCheckCodeGroup} groupCodeData={groupCodeData} initializingGroupCodeData={initializingGroupCodeData} /> : (stepJoinGroup === 2) ? <ConfirmationJoinGroup groupCodeData={groupCodeData} handleJoinGroup={handleJoinGroup} loadingJoinGroup={loadingJoinGroup} handleStepJoinGroup={handleStepJoinGroup} /> : (stepJoinGroup === 3 ) ? <ResultJoinGroup/> : <></>}
          </div>
        </div>
        <div className={tab === 2 ? "block px-4 " : "hidden"}>
          <div className='bg-white rounded-lg p-4'>
            <Stepper stepAddGroup={stepAddGroup}/>
            {(stepAddGroup === 1) ? <InputGroupName handleStepAddGroup={handleStepAddGroup} setGroupName={(e) => setGroupName(e.target.value)} handleGroupStatus={handleGroupStatus} groupName={groupName} groupStatus={groupStatus}/> : (stepAddGroup === 2) ?  <ConfirmationAddGroup groupName={groupName} groupStatus={groupStatus} handleAddGroup={handleAddGroup} loadingSaveGroup={loadingSaveGroup} handleStepAddGroup={handleStepAddGroup}/> : (stepAddGroup === 3) ? <ResultAddGroup groupId={groupId}/> : <></>}
          </div>
        </div>
    </>
  )
}

export default AddGroup

