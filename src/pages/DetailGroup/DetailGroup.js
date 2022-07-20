import { arrayRemove, collection, deleteField, doc, Timestamp, writeBatch} from 'firebase/firestore'
import React, { useReducer, useState } from 'react'
import LoadingDetailGroup from '../../components/LoadingPulse/LoadingDetailGroup'
import TopNavbar from '../../components/Navbar/TopNavbar'
import UseCheckAllAttendance from '../../hooks/UseCheckAllAttendance/UseCheckAllAttendance'
import useCheckGroup from '../../hooks/UseCheckGroup/useCheckGroup'
import useUserContext from '../../hooks/UseUserContext/UseUserContext'
import { db } from '../../utils/Firebase/Firebase'
import GroupAttendance from './GroupAttendance/GroupAttendance'
import GroupDetail from './GroupDetail/GroupDetail'

const initialState = {
    initializeChangeStatus: false,
    initializeChangeRoleUser: false,
    showModal: false,
    showModalDeleteUser: false,
    dropDown: false,
    showToltip: false
}

const reducer = (state, action) => {
    switch (action.type) {
        case "LOADING CHANGE STATUS":
            return {...state, initializeChangeStatus: action.payload}
        case "LOADING CHANGE ROLE USER":
            return {...state, initializeChangeRoleUser: action.payload}
        case "HANDLE SHOW MODAL":
            return {...state, showModal: action.payload}
        case "HANDLE SHOW MODAL DELETE USER":
            return {...state, showModalDeleteUser: action.payload}
        case "HANDLE DROPDOWN":
            return {...state, dropDown: action.payload}
        case "HANDLE TOLTIP":
            return {...state, showToltip: action.payload}
        default:
            break;
    }
}

const DetailGroup = () => {
    const [initilaizingGroupInfo, groupInfo] = useCheckGroup()
    const [initializeGetAllAttendance, allAttendance] = UseCheckAllAttendance()
    const [tab, setTab] = useState(1)
    const userContext = useUserContext()
    const [state, dispatch] = useReducer(reducer, initialState)
    const handleCopy = () => {
        navigator.clipboard.writeText(groupInfo.id)
        dispatch({type: "HANDLE TOLTIP", payload: !state.showToltip})
    }
    
    const handleChangeStatus = async(userId, displayName, photoURL, status,  groupId, roleUser) => {
        dispatch({type: "LOADING CHANGE STATUS", payload: true})
        const batch = writeBatch(db)
        const memberRef = doc(db, 'groupInformation', groupId)
        const transacrionRef = doc(collection(db, "transactionInformation"))
        const transacrionDeclineRef = doc(collection(db, "transactionInformation"))
        const userRef = doc(db, 'users', userId)
    
        batch.update(memberRef, {
          groupMember: arrayRemove({
            displayName: displayName,
            photoURL: photoURL,
            status: status,
            userId: userId
          })
        })
        
        const transactions = {
            userId: userContext.currentUser.uid,
            transaction: "remove user",
            transactionType: 'add',
            data: {
                displayName: displayName,
                photoURL: photoURL,
                roleUser: roleUser,
                userId: userId
                },
            date: Timestamp.now()
        }

        const transactionUser = {
            userId: userId,
            transaction: "removed by admin",
            transactionType: 'update',
            data: {
                groupId: groupId
            },
            date: Timestamp.now()
        }

        console.log(transactions)
        console.log(transactionUser)
    
          batch.set(transacrionDeclineRef, transactions)
          batch.set(transacrionRef, transactionUser)
    
          batch.update(userRef, {
            group: deleteField()
          })
          
          await batch.commit()
          dispatch({type: "LOADING CHANGE STATUS", payload: false})
          dispatch({type: "HANDLE SHOW MODAL DELETE USER", payload: !state.showModalDeleteUser})
    }

  return (
    <div className='flex flex-col h-screen overflow-y-auto'>
    {initilaizingGroupInfo? <LoadingDetailGroup/> : 
    <>
        <div className='flex sticky top-0 flex-col'>
            <TopNavbar navbarColor={'bg-blue-500'} label={'Informasi Grup'} labelColor={'text-white'} back={true} navigateTo={'/'}/>
            {groupInfo.roleUser.includes('02')&&       
            <ul className="flex bg-blue-500 z-50 drop-shadow-sm">
                <li className="w-full"><button onClick={()=> setTab(1)} className={tab === 1 ? "p-2 w-full text-white border-b-4 border-white" : "p-2 w-full text-blue-400 rounded-t-lg border-b-2 border-transparent"}>Detail Grup</button></li>
                <li className="w-full"><button onClick={()=> setTab(2)} className={tab === 2 ? "p-2 w-full text-white border-b-4 border-white" : "p-2 w-full text-blue-400 rounded-t-lg border-b-2 border-transparent"}>Kehadiran Grup</button></li>
            </ul>
            }
        </div>
        {tab === 1 ?
        <GroupDetail groupInfo={groupInfo} handleCopy={handleCopy} dispatch={dispatch} state={state} handleChangeStatus={handleChangeStatus}/>
        : tab === 2 ? 
        <GroupAttendance initializeGetAllAttendance={initializeGetAllAttendance} allAttendance={allAttendance}/>
        :
        null
        }
        </>
        }
    </div>
  )
}

export default DetailGroup