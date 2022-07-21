import React, { useContext, useReducer, useState } from 'react'
import ButtonIcon from '../../components/Button/ButtonIcon/ButtonIcon'
import InputGroupName from './AddGroup/InputGroupName'
import ConfirmationAddGroup from './AddGroup/ConfirmationAddGroup'
import { arrayUnion, collection, doc, getDoc, serverTimestamp, Timestamp, writeBatch } from 'firebase/firestore'
import { db } from '../../utils/Firebase/Firebase'
import { AuthContext } from '../../context/AuthProvider/AuthProvider'
import ResultAddGroup from './AddGroup/ResultAddGroup'
import InputGroupCode from './JoinGroup/InputGroupCode'
import ConfirmationJoinGroup from './JoinGroup/ConfirmationJoinGroup'
import ResultJoinGroup from './JoinGroup/ResultJoinGroup'
import Stepper from '../../components/Stepper/Stepper'
import { useNavigate } from 'react-router-dom'
import TopNavbar from '../../components/Navbar/TopNavbar'

const initialState = {
  tab: 1,
  stepAddGroup: 1,
  stepJoinGroup: 1,
  groupName:"",
  groupLocationName: "",
  loadingSaveGroup: false,
  loadingJoinGroup: false,
  groupId: "",
  groupCode: "",
  groupCodeData: {},
  initializingGroupCodeData: false,
  error: "",
  errorMessage: ""
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
    case "HANDLE GROUP LOCATION NAME":
      return {...state, groupLocationName: action.payload}
    case "HANDLE GROUP ID":
      return {...state, groupId: action.payload}
    case "HANDLE GROUP DATA":
      return {...state, groupCodeData: action.payload}
    case "HANDLE GROUP CODE":
      return {...state, groupCode: action.payload}
    case "HANDLE LOADING SAVE GROUP":
      return {...state, loadingSaveGroup: action.payload}
    case "HANDLE LOADING JOIN GROUP":
      return {...state, loadingJoinGroup: action.payload}
    case "HANDLE LOADING GROUP CODE DATA":
      return {...state, initializingGroupCodeData: action.payload}
    case "HANDLE STATUS":
      return {...state, initializingGroupCodeData: action.payload}
    case "HANDLE ERROR":
      return {...state, error: true, errorMessage: action.payload}
    default:
      break;
  }
}

const AddGroup = () => {

    const user = useContext(AuthContext)
    const navigate = useNavigate()
    const [state, dispatch] = useReducer(reducer, initialState)
    const [groupStatus, setGroupStatus] = useState([])
    const [locations, setLocations] = useState([])

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
          const groupinformation = docSnapGetGroup.data()
          if(groupinformation.groupMember.length <= groupinformation.groupCapacity){
            dispatch({type: "HANDLE GROUP DATA", payload: docSnapGetGroup.data()})
            dispatch({type: "HANDLE LOADING GROUP CODE DATA", payload: false})
            handleStepJoinGroup('next')
          }else{
            dispatch({type: "HANDLE GROUP DATA", payload: false})
            dispatch({type: "HANDLE LOADING GROUP CODE DATA", payload: false})
          }
      }else{
          dispatch({type: "HANDLE GROUP DATA", payload: false})
          dispatch({type: "HANDLE LOADING GROUP CODE DATA", payload: false})
      }
    }

    const handleGroupStatus = (e) => {
      if (e.target.checked) {
        setGroupStatus([...groupStatus,  e.target.value]);
      } else {
        setGroupStatus(groupStatus.filter((id) => id !== e.target.value));
      }
    };

    const handleLocation = () => {
      setLocations(prevState => [...prevState, state.groupLocationName])
      dispatch({type: "HANDLE GROUP LOCATION NAME", payload: ""})
    }
    
    const handleRemoveLocation = (val) => {
      const newLocation = locations.filter((item) => item !== val)
      setLocations(newLocation)
    }

    const handleAddGroup = async () => {
      dispatch({type: "HANDLE LOADING SAVE GROUP", payload: true})
      try{
        const groupData = {
          groupName: state.groupName,
          groupOwnerName: user.currentUser.displayName,
          groupOwnerId: user.currentUser.uid,
          groupMember: [
            {
              userId: user.currentUser.uid, 
              displayName: user.currentUser.displayName,
              photoURL: user.currentUser.photoURL,
              roleUser: ['01', '03'], 
              status: '01'
            }
          ],
          groupCapacity: 50, 
          groupStatus: groupStatus,
          groupLocation: locations,
          timestamps: Timestamp.now()
        }

        const transactions = {
          userId: user.currentUser.uid,
          transaction: "add group",
          transactionType: 'add',
          data: groupData,
          date: Timestamp.now()
        }

        const batch = writeBatch(db)
        const addGroupRef = doc(collection(db, "groupInformation"))
        const transacrionRef = doc(collection(db, "transactionInformation"))
        const personalRef = doc(db, "users", user.currentUser.uid)

        batch.set(addGroupRef, groupData)
        batch.set(transacrionRef, transactions)
        batch.set(personalRef, {group: [addGroupRef.id]}, {merge: true})

        await batch.commit()
        dispatch({type: "HANDLE GROUP ID", payload: addGroupRef.id})
        handleStepAddGroup('next')
        dispatch({type: "HANDLE LOADING SAVE GROUP", payload: false})
        
      }catch(error){
        dispatch({type: "HANDLE ERROR", payload: 'Terjadi kesalahanan'})
        dispatch({type: "HANDLE LOADING SAVE GROUP", payload: false})
      }
    }

    const handleJoinGroup = async () => {
      dispatch({type: "HANDLE LOADING JOIN GROUP", payload: true})
      try{
        const batch = writeBatch(db)
        const groupInformationRef = doc(db, "groupInformation", state.groupCode)
        const transacrionRef = doc(collection(db, "transactionInformation"))
        const personalAdditionalInformationRef = doc(db, "users", user.currentUser.uid)

        const transactions = {
          userId: user.currentUser.uid,
          transaction: "join group",
          transactionType: 'add',
          date: serverTimestamp()
        }

        batch.update(groupInformationRef, {
          groupMember: arrayUnion({
            status: '02',
            displayName: user.currentUser.displayName,
            photoURL: user.currentUser.photoURL,
            userId: user.currentUser.uid})
        })
        batch.set(transacrionRef, transactions)
        batch.set(personalAdditionalInformationRef, {group : [groupInformationRef.id]}, {merge: true})

        // const personalNotificationAdmin = doc(collection(db, 'personalNotifications'))

        // const getGroupAdmin = await getDoc(groupInformationRef)

        // batch.set(personalNotificationAdmin, {
        //   typeNotification: 'approval-group',
        //   destination: getGroupAdmin.data().groupOwnerId,
        //   title: "Persetujuan Bergabung Grup",
        //   message: "Ada yang bergabung ke grup mu nih, kamu bisa setujui / menolaknya",
        //   additionalMessage: {
        //     requestJoinId: user.currentUser.uid,
        //     groupId: getGroupAdmin.id
        //   },
        //   opened : false,
        //   timestamps: Date.now()
        // })

        await batch.commit()
        handleStepJoinGroup('next')
        dispatch({type: "HANDLE LOADING JOIN GROUP", payload: false})
      }catch(e){
        console.log(e)
        dispatch({type: "HANDLE ERROR", payload: 'Terjadi kesalahanan'})
        dispatch({type: "HANDLE LOADING JOIN GROUP", payload: false})
      }
    }

  return (
    <div className='flex flex-col overflow-y-auto'>
        <div className='flex sticky top-0 flex-col z-50'>
          <TopNavbar navbarColor={'bg-blue-500'} label={'Tambah Grup'} labelColor={'text-white'} back={true} navigateTo={'/'}/>
          <ul className="flex bg-blue-500 z-50 drop-shadow-sm">
              <li className="w-full"><button onClick={()=> dispatch({type: "HANDLE TAB", payload: 1})} className={state.tab === 1 ? "p-4 w-full text-white border-b-4 border-white" : "p-4 w-full text-blue-300 rounded-t-lg border-b-2 border-transparent"}>Gabung Grup</button></li>
              <li className="w-full"><button onClick={()=> dispatch({type: "HANDLE TAB", payload: 2})} className={state.tab === 2 ? "p-4 w-full text-white border-b-4 border-white" : "p-4 w-full text-blue-300 rounded-t-lg border-b-2 border-transparent"}>Buat Grup</button></li>
          </ul>
        </div>
        <div className={state.tab === 1 ? "flex flex-col px-4 py-4" : "hidden"}>
          <div className='bg-white rounded-xl p-4'>
            <Stepper stepAddGroup={state.stepJoinGroup}/>
            {(state.stepJoinGroup === 1) ? 
            <InputGroupCode setGroupCode={(e) => dispatch({type: "HANDLE GROUP CODE", payload: e.target.value})} groupCode={state.groupCode} handleCheckCodeGroup={handleCheckCodeGroup} groupCodeData={state.groupCodeData} initializingGroupCodeData={state.initializingGroupCodeData} /> : (state.stepJoinGroup === 2) ? 
            <ConfirmationJoinGroup groupCodeData={state.groupCodeData} handleJoinGroup={handleJoinGroup} loadingJoinGroup={state.loadingJoinGroup} handleStepJoinGroup={handleStepJoinGroup} error={state.error} errorMessage={state.errorMessage} /> : (state.stepJoinGroup === 3 ) ? 
            <ResultJoinGroup groupCodeData={state.groupCodeData}/> : <></>}
          </div>
        </div>

        <div className={state.tab === 2 ? "flex flex-col px-4 py-4" : "hidden"}>
          <Stepper stepAddGroup={state.stepAddGroup}/>
          <div className='bg-white rounded-xl p-4'>
            {(state.stepAddGroup === 1) ? 
            <InputGroupName handleStepAddGroup={handleStepAddGroup} setGroupName={(e) => dispatch({type: "HANDLE GROUP NAME", payload: e.target.value})} handleGroupStatus={handleGroupStatus} groupName={state.groupName} groupStatus={groupStatus} handleLocation={handleLocation} handleRemoveLocation={handleRemoveLocation} setLocation={(e) => dispatch({type: "HANDLE GROUP LOCATION NAME", payload: e.target.value})} locations={locations} location={state.groupLocationName} /> : (state.stepAddGroup === 2) ? 
            <ConfirmationAddGroup  groupName={state.groupName} groupStatus={groupStatus} locations={locations} handleAddGroup={handleAddGroup} loadingSaveGroup={state.loadingSaveGroup} handleStepAddGroup={handleStepAddGroup} error={state.error} errorMessage={state.errorMessage}/> : (state.stepAddGroup === 3) ? 
            <ResultAddGroup groupId={state.groupId}/> : <></>}
          </div>
          <div className='h-20'></div>
        </div>
    </div>
  )
}

export default AddGroup

