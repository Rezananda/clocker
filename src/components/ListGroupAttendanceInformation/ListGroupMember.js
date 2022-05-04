import React from 'react'
import ButtonIcon from '../Button/ButtonIcon/ButtonIcon'
import LetterAvatar from '../LetterAvatar/LetterAvatar'

const ListGroupMember = ({val, groupInfo, dispatch, state}) => {
  return (
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
  )
}

export default ListGroupMember