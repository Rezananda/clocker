import { arrayRemove, collection, deleteField, doc, Timestamp, writeBatch} from 'firebase/firestore'
import React, { useReducer } from 'react'
import LetterAvatar from '../../components/LetterAvatar/LetterAvatar'
import ListGroupMember from '../../components/ListGroupAttendanceInformation/ListGroupMember'
import LoadingDetailGroup from '../../components/LoadingPulse/LoadingDetailGroup'
import TopNavbar from '../../components/Navbar/TopNavbar'
import useCheckGroup from '../../hooks/UseCheckGroup/useCheckGroup'
import useUserContext from '../../hooks/UseUserContext/UseUserContext'
import { db } from '../../utils/Firebase/Firebase'

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
    <div className='flex flex-col h-screen'>
        <div className='flex sticky top-0 flex-col'>
            <TopNavbar navbarColor={'bg-blue-500'} label={'Informasi Grup'} labelColor={'text-white'} back={true} navigateTo={'/'}/>
        </div>
        {initilaizingGroupInfo? <LoadingDetailGroup/> : 
        <div className='py-4 flex overflow-y-auto flex-col gap-3 h-screen'>
            <div className='flex flex-col gap-1 items-center'>
                <LetterAvatar letter={groupInfo.groupName.split(" ").length > 1? groupInfo.groupName.split(" ").shift().charAt(0) + groupInfo.groupName.split(" ").pop().charAt(0) : groupInfo.groupName.split(" ").shift().charAt(0)}/>
                <p className='text-xl font-bold dark:text-white'>{groupInfo.groupName}</p>
                <div className='flex justify-center'>
                    <div className='flex p-2 items-center gap-2 bg-white rounded-lg border border-gray-200 dark:bg-slate-800 dark:border-gray-600 dark:text-white'>
                        <div className='flex flex-col'>
                            <span className='flex text-xs font-bold '>Kode Grup</span> 
                            <p className='text-sm'>{groupInfo.id}</p>
                        </div>
                        <div className='relative flex items-center gap-1 justify-center'>
                            <button onClick={handleCopy} className='bg-blue-500 text-white text-sm font-bold rounded px-2 py-1'>Salin</button>
                            {state.showToltip ? 
                            <div className="absolute flex bottom-0 flex-col items-center mb-8">
                                <div className="relative z-10 p-2 text-xs leading-none text-white bg-black rounded-lg shadow-lg flex items-center gap-1">
                                    <p>Tersalin</p>
                                    <p className='text-gray-300'>|</p>
                                    <p className='text-gray-300' onClick={() => dispatch({type: "HANDLE TOLTIP", payload: !state.showToltip})}>x</p>
                                </div>
                                <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                            </div>
                            :
                            null
                            }
                        </div>
                    </div> 
                </div>
            </div>
            <div className='px-4'>
                <p className='font-bold mb-2 dark:text-white'>Anggota Grup</p>
                <div className='flex flex-col overflow-y-auto border-gray-200 rounded-xl dark:border-gray-600'>
                    <ul>
                        {groupInfo.groupMember.map((val, index) => 
                            <li key={index}>
                                <ListGroupMember val={val} groupInfo={groupInfo} dispatch={dispatch} state={state} handleChangeStatus={handleChangeStatus}/>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
        }
    </div>
  )
}

export default DetailGroup