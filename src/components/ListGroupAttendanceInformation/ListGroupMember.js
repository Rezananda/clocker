import React from 'react'
import { useNavigate } from 'react-router-dom'
import ButtonIcon from '../Button/ButtonIcon/ButtonIcon'
import LetterAvatar from '../LetterAvatar/LetterAvatar'

const ListGroupMember = ({val, groupInfo, dispatch, state}) => {
    const navigate = useNavigate()
  return (
    <div className='flex justify-between items-center bg-white border-b border-gray-200 px-2 py-2'>
        <div className='flex items-center gap-2 w-full'>
        <LetterAvatar letter={val.photoURL}/>   
        <div className='flex flex-col basis-2/3'>
            <span className='text-sm flex items-center text-gray-600'>
            {val.displayName}
            </span>
            
            {val.roleUser === '01' ? 
                <span className='text-xs font-bold text-blue-500 flex items-center bg-blue-100 rounded w-fit px-1 py-0.5'>
                    Admin
                </span>
            : val.roleUser === '02' &&  val.status === '01' ? 
                <span className='text-xs font-bold text-blue-500 flex items-center bg-blue-100 rounded w-fit px-1 py-0.5'>
                    User
                </span>
            : 
                <span className='text-xs font-bold text-yellow-500 flex items-center bg-yellow-100 rounded w-fit px-1 py-0.5'>
                    Permohonan User
                </span>
            }
            
        </div>
        </div>
        <div className='flex flex-end'>
            {(groupInfo.roleUser === '01' && val.status === '01' && val.roleUser === '01') ? 
            null
                :
            (groupInfo.roleUser === '01' && val.status === '02' && val.roleUser === '02') ?
            <>                                    
                <button onClick={() => navigate('/change-status', {state:{userId: val.userId, displayName:val.displayName, photoURL:val.photoURL, status:val.status, roleUser:val.roleUser, groupInfoId: groupInfo.id}})} className='bg-blue-500 rounded-full text-xs text-white font-bold px-2 py-1 flex gap-1 items-center'>Ubah 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                </button>
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
  )
}

export default ListGroupMember