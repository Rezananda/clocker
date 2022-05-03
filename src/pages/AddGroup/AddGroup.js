import React, { useContext, useReducer, useState } from 'react'
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

const initialState = {
  tab: 1,
  stepAddGroup: 1,
  stepJoinGroup: 1,
  groupName:"",
  loadingSaveGroup: false,
  loadingJoinGroup: false,
  groupId: "",
  groupCode: "",
  groupCodeData: {},
  initializingGroupCodeData: false
} 

const reducer = (state, action) => {
  switch (action.type) {
    case "HANDLE TAB":
      return {...state, tab: action.payload}
    case "HANDLE STEP ADD GROUP":
      return {...state, stepAddGroup: action.payload}
    case "HANDLE STEP JOIN GROUP":
      return {...state, stepJoinGroup: action.payload}
    case "HANDLE GROUP NAME":
      return {...state, groupName: action.payload}
    case "HANDLE GROUP ID":
      return {...state, groupId: action.payload}
    case "HANDLE GROUP CODE":
      return {...state, groupCodeData: action.payload}
    case "HANDLE GROUP DATA":
      return {...state, groupCode: action.payload}
    case "HANDLE LOADING SAVE GROUP":
      return {...state, loadingSaveGroup: action.payload}
    case "HANDLE LOADING JOIN GROUP":
      return {...state, loadingJoinGroup: action.payload}
    case "HANDLE LOADING GROUP CODE DATA":
      return {...state, initializingGroupCodeData: action.payload}
    default:
      break;
  }
}

const AddGroup = () => {

    const user = useContext(AuthContext)
    const navigate = useNavigate()

    const [state, dispatch] = useReducer(reducer, initialState)

    const [groupStatus, setGroupStatus] = useState([])

    function handleStepAddGroup(statusStepAddGroup){
      if(statusStepAddGroup === "prev"){
          dispatch({type: 'HANDLE STEP ADD GROUP', payload: state.stepAddGroup - 1})
      }else if(statusStepAddGroup === "next"){
          dispatch({type: 'HANDLE STEP ADD GROUP', payload: state.stepAddGroup + 1})
      }else{
          console.log('error step')
      }
    }

    function handleStepJoinGroup(statusStepJoinGroup){
      if(statusStepJoinGroup === "prev"){
          dispatch({type: "HANDLE STEP JOIN GROUP", payload: state.stepJoinGroup - 1})
      }else if(statusStepJoinGroup === "next"){
          dispatch({type: "HANDLE STEP JOIN GROUP", payload: state.stepJoinGroup + 1})
      }else{
          console.log('error step')
      }
    }

    const handleCheckCodeGroup = async () => {
      dispatch({type: "HANDLE LOADING GROUP CODE DATA", payload: true})
      const docRefGetGroup = doc(db, "groupInformation", state.groupCode);
      const docSnapGetGroup = await getDoc(docRefGetGroup)
      if(docSnapGetGroup.exists()){
          dispatch({type: "HANDLE GROUP CODE", payload: docSnapGetGroup.data()})
          dispatch({type: "HANDLE LOADING GROUP CODE DATA", payload: false})
          handleStepJoinGroup('next')
      }else{
        dispatch({type: "HANDLE LOADING GROUP CODE DATA", payload: false})
          dispatch({type: "HANDLE GROUP CODE", payload: false})
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
      dispatch({type: "HANDLE LOADING SAVE GROUP", payload: true})
      try{
        const docRef = await addDoc(collection(db, "groupInformation"), {
          groupName: state.groupName,
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
        dispatch({type: "HANDLE GROUP ID", payload: docRef.id})
        const personalRef = doc(db, "users", user.currentUser.uid)
        setDoc(personalRef, {group: [docRef.id]}, {merge: true})
        handleStepAddGroup('next')
        dispatch({type: "HANDLE LOADING SAVE GROUP", payload: false})
      }catch(e){
        console.log(e)
        console.log('gagal')
        dispatch({type: "HANDLE LOADING SAVE GROUP", payload: false})
      }
    }

    const handleJoinGroup = async () => {
      dispatch({type: "HANDLE LOADING JOIN GROUP", payload: true})
      try{
        const batch = writeBatch(db)
        const groupInformationRef = doc(db, "groupInformation", state.groupCode)
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
        dispatch({type: "HANDLE LOADING JOIN GROUP", payload: false})
      }catch(e){
        console.log(e)
        dispatch({type: "HANDLE LOADING JOIN GROUP", payload: false})
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
                <li className="w-full"><button onClick={()=> dispatch({type: "HANDLE TAB", payload: 1})} className={state.tab === 1 ? "p-2 w-full text-blue-500 border-b-4 border-blue-500" : "p-2 w-full text-gray-500 rounded-t-lg border-b-2 border-transparent"}>Gabung Grup</button></li>
                <li className="w-full"><button onClick={()=> dispatch({type: "HANDLE TAB", payload: 2})} className={state.tab === 2 ? "p-2 w-full text-blue-500 border-b-4 border-blue-500" : "p-2 w-full text-gray-500 rounded-t-lg border-b-2 border-transparent"}>Buat Grup</button></li>
            </ul>
        </div>

        <div className={state.tab === 1 ? "block px-4" : "hidden"}>
          <div className='bg-white rounded-lg p-4'>
            <Stepper stepAddGroup={state.stepJoinGroup}/>
            {(state.stepJoinGroup === 1) ? <InputGroupCode setGroupCode={(e) => dispatch({type: "HANDLE GROUP CODE", payload: e.target.value})} groupCode={state.groupCode} handleCheckCodeGroup={handleCheckCodeGroup} groupCodeData={state.groupCodeData} initializingGroupCodeData={state.initializingGroupCodeData} /> : (state.stepJoinGroup === 2) ? <ConfirmationJoinGroup groupCodeData={state.groupCodeData} handleJoinGroup={handleJoinGroup} loadingJoinGroup={state.loadingJoinGroup} handleStepJoinGroup={handleStepJoinGroup} /> : (state.stepJoinGroup === 3 ) ? <ResultJoinGroup/> : <></>}
          </div>
        </div>

        <div className={state.tab === 2 ? "block px-4 " : "hidden"}>
          <div className='bg-white rounded-lg p-4'>
            <Stepper stepAddGroup={state.stepAddGroup}/>
            {(state.stepAddGroup === 1) ? <InputGroupName handleStepAddGroup={handleStepAddGroup} setGroupName={(e) => dispatch({type: "HANDLE GROUP NAME", payload: e.target.value})} handleGroupStatus={handleGroupStatus} groupName={state.groupName} groupStatus={groupStatus}/> : (state.stepAddGroup === 2) ?  <ConfirmationAddGroup groupName={state.groupName} groupStatus={groupStatus} handleAddGroup={handleAddGroup} loadingSaveGroup={state.loadingSaveGroup} handleStepAddGroup={handleStepAddGroup}/> : (state.stepAddGroup === 3) ? <ResultAddGroup groupId={state.groupId}/> : <></>}
          </div>
        </div>
    </>
  )
}

export default AddGroup

