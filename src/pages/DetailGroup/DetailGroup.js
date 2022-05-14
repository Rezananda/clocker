import { arrayRemove, arrayUnion, deleteField, doc, updateDoc} from 'firebase/firestore'
import React, { useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ButtonIcon from '../../components/Button/ButtonIcon/ButtonIcon'
import LetterAvatar from '../../components/LetterAvatar/LetterAvatar'
import ListGroupMember from '../../components/ListGroupAttendanceInformation/ListGroupMember'
import Modal from '../../components/Modal/Modal'
import SpinnerLoading from '../../components/SpinnerLoading/SpinnerLoading'
import useCheckGroup from '../../hooks/UseCheckGroup/useCheckGroup'
import { db } from '../../utils/Firebase/Firebase'

const initialState = {
    initializeChangeStatus: false,
    initializeChangeRoleUser: false,
    showModal: false,
    showModalDeleteUser: false,
    dropDown: false
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
        default:
            break;
    }
}

const DetailGroup = () => {
    const navgiate = useNavigate()
    const [initilaizingGroupInfo, groupInfo] = useCheckGroup()

    const [state, dispatch] = useReducer(reducer, initialState)

    const handleCopy = () => {
        navigator.clipboard.writeText(groupInfo.id)
    }

    const handleChangeStatus = async(userId, displayName, photoURL, status, roleUser, groupId) => {
        dispatch({type: "HANDLE SHOW MODAL", payload: false})
        dispatch({type: "LOADING CHANGE STATUS", payload: true})
        const memberRef = doc(db, 'groupInformation', groupId)
        await updateDoc(memberRef, {
            groupMember: arrayRemove({
                displayName: displayName,
                photoURL: photoURL,
                roleUser: roleUser,
                status: status,
                userId: userId
            })
        })
        await updateDoc(memberRef, {
            groupMember: arrayUnion({
                displayName: displayName,
                photoURL: photoURL,
                roleUser: roleUser,
                status: '01',
                userId: userId
            })
        })
        dispatch({type: "LOADING CHANGE STATUS", payload: false})
    }

    const handleDeleteUser =  async(userId, displayName, photoURL, status, roleUser, groupId) => {
        dispatch({type: "HANDLE DROPDOWN", payload: false})
        dispatch({type: "HANDLE SHOW MODAL DELETE USER", payload: false})
        dispatch({type: "LOADING CHANGE ROLE USER", payload: true})
        const memberRef = doc(db, 'groupInformation', groupId)
        await updateDoc(memberRef, {
            groupMember: arrayRemove({
                displayName: displayName,
                photoURL: photoURL,
                roleUser: roleUser,
                status: status,
                userId: userId
            })
        })

        const userRef = doc(db, 'users', userId)
        await updateDoc(userRef, {
            group: deleteField()
        })

        dispatch({type: "LOADING CHANGE ROLE USER", payload: false})
    }

  return (
    <div className='min-h-screen bg-gray-50'>
        <nav className='bg-blue-500 px-2 py-4 flex flex-row items-center drop-shadow'>
            <div className='basis-1/2 flex items-center'>
                <ButtonIcon 
                actionFunction={()=> navgiate(-1)} 
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>}/>
                <p className='text-md font-bold text-white flex ml-1'>Informasi Grup</p>
            </div>
        </nav>
        {initilaizingGroupInfo? <SpinnerLoading/> : 
        <div>
            <div className='flex flex-col gap-1 items-center p-10'>
                <LetterAvatar letter={groupInfo.data.groupName.split(" ").length > 1? groupInfo.data.groupName.split(" ").shift().charAt(0) + groupInfo.data.groupName.split(" ").pop().charAt(0) : groupInfo.data.groupName.split(" ").shift().charAt(0)}/>
                <p className='font-bold'>{groupInfo.data.groupName}</p>
                <div className='px-4 flex justify-center'>
                    <div className='flex w-fit p-2 items-center gap-2 bg-white rounded-lg'>
                        <div>
                            <span className='flex text-xs font-bold '>Kode Grup</span> 
                            <p className='text-sm'>{groupInfo.id}</p>
                            <div className='w-full border-t border-gray-300'></div>
                        </div>
                        <div className='flex items-center gap-1'>
                            <button onClick={handleCopy} className='bg-blue-500 text-white text-sm font-bold rounded px-2 py-1'>Salin</button>
                        </div>
                    </div> 
                </div>
            </div>
            <div className='py-2 px-4'>
                <p className='font-bold text-gray-500 mb-2'>Anggota Grup</p>
                    <ul className='relative p-0'>
                        {groupInfo.data.groupMember.map((val, index) => 
                            <li key={index}>
                                <ListGroupMember val={val} groupInfo={groupInfo} dispatch={dispatch} state={state}/>
                            </li>
                        )}
                    </ul>
            </div>
        </div>
        }
    </div>
  )
}

export default DetailGroup