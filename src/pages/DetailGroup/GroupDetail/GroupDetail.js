import React from 'react'
import LetterAvatar from '../../../components/LetterAvatar/LetterAvatar'
import ListGroupMember from '../../../components/ListGroupAttendanceInformation/ListGroupMember'

const GroupDetail = ({groupInfo, handleCopy, dispatch, state, handleChangeStatus}) => {
  return (
    <div className='py-4 px-4 flex flex-col gap-3 h-screen'>
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