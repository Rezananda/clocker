import { arrayRemove, arrayUnion, deleteField, doc, updateDoc} from 'firebase/firestore'
import React, { useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ButtonIcon from '../../components/Button/ButtonIcon/ButtonIcon'
import LetterAvatar from '../../components/LetterAvatar/LetterAvatar'
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

    // const [dropDown, setDropDown] = useState(false)

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
        <nav className='bg-white px-2 py-4 flex flex-row items-center drop-shadow'>
            <div className='basis-1/2 flex items-center'>
                <ButtonIcon 
                actionFunction={()=> navgiate(-1)} 
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>}/>
                <p className='text-md font-bold text-blue-500 flex ml-1'>Informasi Grup</p>
            </div>
        </nav>
        {initilaizingGroupInfo? <SpinnerLoading/> : 
        <div>
            <div className='flex flex-col gap-1 items-center p-10'>
                {console.log(groupInfo.data.groupName.split(" ").length)}
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
                <p className='font-bold text-gray-500 mb-2'>Member Grup</p>
                    <ul className='relative p-0'>
                        {groupInfo.data.groupMember.map((val, index) => 
                            <li key={index}>
                                <div className='flex gap-2 flex-row items-center bg-white w-full border-l-4 border-blue-500 rounded px-2 py-2 mb-1'>
                                    <div className=''>
                                        <LetterAvatar letter={val.photoURL}/>   
                                    </div>
                                    <div className='flex flex-col basis-2/3'>
                                        <span className='text-sm flex items-center text-gray-600'>
                                        {val.displayName}
                                        </span>
                                        <span className='text-xs font-bold text-blue-500 flex items-center bg-blue-100 rounded w-fit px-1 py-0.5'>
                                            {val.roleUser === '01' ? 'Admin' : 'User'}
                                        </span>
                                    </div>
                                    <div className='flex justify-end gap-2 basis-1/4'>
                                        {(groupInfo.roleUser === '01' && val.status === '01' && val.roleUser === '01') ? 
                                        null
                                            :
                                        (groupInfo.roleUser === '01' && val.status === '02' && val.roleUser === '02') ?
                                        <>                                    
                                            <span className='bg-blue-100 rounded-lg cursor-pointer' onClick={() => dispatch({type: "HANDLE SHOW MODAL DELETE USER", payload: true})}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </span>
                                            <span className='bg-blue-100 rounded-lg cursor-pointer' onClick={() => dispatch({type: "HANDLE SHOW MODAL", payload: true})}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </span>
                                        </>
                                        :
                                        (groupInfo.roleUser === '01' && val.status === '01' && val.roleUser === '02') ?
                                        <div>
                                            <ButtonIcon actionFunction={() => dispatch({type: "HANDLE DROPDOWN", payload: !state.dropDown})} icon={<svg className="h-6 w-6 text-blue-500"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"> <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="12" r="1" />  <circle cx="12" cy="19" r="1" />  <circle cx="12" cy="5" r="1" /></svg>}/>
                                            <div className='flex justify-end'>                            
                                                <ul className={`divide-y text-gray-700 absolute z-40 bg-white rounded px-4 py-2 shadow-md ${state.dropDown? 'block' : 'hidden'} `}>
                                                    <li onClick={() => dispatch({type: "HANDLE SHOW MODAL DELETE USER", payload: !state.showModalDeleteUser})} className="text-center cursor-pointer">Hapus User</li> 
                                                </ul>
                                            </div>

                                        </div> 
                                        :
                                        null
                                        }
                                    </div>
                                </div>
                                {state.showModal ? 
                                    <Modal text={`Apakah kamu ingin menyetujui user ${val.displayName}?`} handleAction={() => handleChangeStatus(val.userId, val.displayName, val.photoURL, val.status, val.roleUser, groupInfo.id)} handleClose={() => dispatch({type: "HANDLE SHOW MODAL", payload: false})} initializing={state.initializeChangeStatus}/>
                                    :
                                    ""
                                }
                                {state.showModalDeleteUser ? 
                                    <Modal text={`Apakah kamu ingin menghapus user ${val.displayName}?`} handleAction={() => handleDeleteUser(val.userId, val.displayName, val.photoURL, val.status, val.roleUser, groupInfo.id)} handleClose={() => {dispatch({type: "HANDLE SHOW MODAL DELETE USER", payload: false}); dispatch({type: "HANDLE DROPDOWN", payload: false})}} initializing={state.initializeChangeRoleUser}/>
                                    :
                                    ""
                                }
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