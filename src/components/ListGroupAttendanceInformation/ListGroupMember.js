import React from 'react'
import { useNavigate } from 'react-router-dom'
import ButtonFill from '../Button/ButtonFill/ButtonFill'
import ButtonIcon from '../Button/ButtonIcon/ButtonIcon'
import LetterAvatar from '../LetterAvatar/LetterAvatar'

const ListGroupMember = ({val, groupInfo, dispatch, state, handleChangeStatus}) => {
    const navigate = useNavigate()
  return (
    <div className='flex justify-between items-center bg-white border-b border-gray-200 px-4 py-2 dark:bg-slate-800 dark:border-gray-600'>
        <div className='flex items-center gap-2 w-full'>
        <LetterAvatar letter={val.photoURL}/>   
        <div className='flex flex-col basis-2/3'>
            <span className='font-bold flex items-center text-gray-600 dark:text-white'>
            {val.displayName}
            </span>

            <div className='flex items-center gap-1'>
                {val.hasOwnProperty('roleUser')&&val.roleUser.includes('01')&&
                <span className='text-xs font-bold text-blue-500 flex items-center bg-blue-100 rounded w-fit px-1 py-0.5'>
                    Admin
                </span>                
                }

                {val.hasOwnProperty('roleUser')&&val.roleUser.includes('03')&&
                <span className='text-xs font-bold text-blue-500 flex items-center bg-blue-100 rounded w-fit px-1 py-0.5'>
                    User
                </span>
                }   
                
                {val.hasOwnProperty('roleUser')&&val.roleUser.includes('02')&&
                <span className='text-xs font-bold text-blue-500 flex items-center bg-blue-100 rounded w-fit px-1 py-0.5'>
                    Manajer
                </span>
                }

                {!val.hasOwnProperty('roleUser')&&
                <span className='text-xs font-bold text-yellow-500 flex items-center bg-yellow-100 rounded w-fit px-1 py-0.5'>
                    Permohonan User
                </span>
                }       
            </div>
            
        </div>
        </div>
        <div className='flex flex-end'>
            {(groupInfo.roleUser.includes('01') && val.status === '01' && val.roleUser.includes('01')) ? 
            null
                :
            ((groupInfo.roleUser.includes('01') || groupInfo.roleUser.includes('02')) && val.status === '02') ?
            <>                                    
                <button onClick={() => navigate('/change-status', {state:{userId: val.userId, displayName:val.displayName, photoURL:val.photoURL, status:val.status, roleUser:val.roleUser, groupInfoId: groupInfo.id}})} className='bg-blue-500 rounded-full text-xs text-white font-bold px-2 py-1 flex gap-1 items-center'>Ubah 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 dark:text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                </button>
            </>
            :
            (groupInfo.roleUser.includes('01') && val.status === '01' && val.roleUser.includes('02')) ?
            <div>
                <ButtonIcon actionFunction={() => dispatch({type: "HANDLE DROPDOWN", payload: !state.dropDown})} icon={<svg className="h-6 w-6 dark:text-white"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"> <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="12" r="1" />  <circle cx="12" cy="19" r="1" />  <circle cx="12" cy="5" r="1" /></svg>}/>
                {state.dropDown&&<div onClick={() => dispatch({type: "HANDLE DROPDOWN", payload: !state.dropDown})} className='fixed inset-0 z-40'></div>}
                <div className='flex justify-end'>                            
                    <ul className={`divide-y text-gray-700 absolute z-40 bg-white rounded px-4 py-2 shadow-md w-fit dark:bg-black text-white ${state.dropDown? 'block' : 'hidden'} `}>
                        <li onClick={() => {dispatch({type: "HANDLE SHOW MODAL DELETE USER", payload: !state.showModalDeleteUser}); dispatch({type: "HANDLE DROPDOWN", payload: !state.dropDown})}} className="cursor-pointer">Hapus User</li> 
                    </ul>
                </div>

                {state.showModalDeleteUser&&                
                    <>
                        <div className="flex justify-center items-center fixed inset-0 z-50 px-4">
                            <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-white p-3 gap-3">
                                <button className="flex justify-end" onClick={() => dispatch({type: "HANDLE SHOW MODAL DELETE USER", payload: !state.showModalDeleteUser})}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-500 dark:text-white" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                <p className='text-center flex'>Apakah kamu yakin menghapus User ini?</p>
                                <ul className='flex flex-col divide-y p-2 bg-blue-50 rounded-lg'>
                                    <li className='flex flex-col'><p className='text-sm'>Nama</p><p className='font-bold'>{val.displayName}</p></li>
                                </ul>
                                
                                <ButtonFill additionalClass={`bg-blue-500 border-blue-500`} label="Hapus" handleClick={() => handleChangeStatus(val.userId, val.displayName, val.photoURL, val.status, groupInfo.id, val.roleUser)}/>
                            </div>
                        </div>
                        <div className="opacity-20 fixed inset-0 z-40 bg-black"></div>
                    </>
                }


            </div> 
            :
            null
            }
        </div>
    </div>
  )
}

export default ListGroupMember