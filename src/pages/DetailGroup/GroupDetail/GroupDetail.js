import React from 'react'
import LetterAvatar from '../../../components/LetterAvatar/LetterAvatar'
import ListGroupMember from '../../../components/ListGroupAttendanceInformation/ListGroupMember'

const GroupDetail = ({groupInfo, dispatch, state, handleChangeStatus}) => {
  return (
    <div className='py-4 px-4 flex flex-col gap-3'>
        <div className='flex flex-col gap-1 items-center'>
            <LetterAvatar letter={groupInfo.groupName.split(" ").length > 1? groupInfo.groupName.split(" ").shift().charAt(0) + groupInfo.groupName.split(" ").pop().charAt(0) : groupInfo.groupName.split(" ").shift().charAt(0)}/>
            <p className='text-xl font-bold dark:text-white'>{groupInfo.groupName}</p>
            <div className='flex justify-center'>
                <div className='flex p-2 items-center gap-2 bg-white rounded-lg dark:bg-slate-800 dark:border-gray-600 dark:text-white'>
                    <div className='flex flex-col'>
                        <span className='flex text-xs font-bold '>Kode Grup</span> 
                        <p className='text-sm'>{groupInfo.id}</p>
                    </div>
                    <div className='relative flex items-center gap-1 justify-center'>
                        <a href={`whatsapp://send?text=${groupInfo.id}`} data-action="share/whatsapp/share">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                            </svg>
                        </a>
                    </div>
                </div> 
            </div>
        </div>
        <div className='flex flex-col'>
            <p className='font-bold mb-2 dark:text-white'>Anggota Grup</p>
            <div className='flex flex-col gap-1'>
                {groupInfo.groupMember.map((val, index) => 
                    <ListGroupMember key={index} val={val} groupInfo={groupInfo} dispatch={dispatch} state={state} handleChangeStatus={handleChangeStatus}/>
                )}
            </div>
        </div>
    </div>
  )
}

export default GroupDetail