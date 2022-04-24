import React from 'react'
import ButtonFill from '../../components/Button/ButtonFill/ButtonFill'
import ButtonOutline from '../../components/Button/ButtonOutline/ButtonOutline'

const ApproveGroup = ({initializeUser, userData, initializeGroupMember, setGroupMember, groupMember, handleStepApprove, setStatus }) => {
  return (
    <div className='px-4'>
        <div className='bg-blue-50 py-1 px-4 rounded-lg mb-4'>
        {initializeUser ? <p className='text-center'>Loading...</p> : 
        <div>
            <p className='font-bold'>Nama</p>
            <p className=''>{userData.displayName}</p>
        </div>
        }
        </div>
        <div className='flex gap-4 px-4 justify-center'>
        <div>
          <input onChange={() => setStatus('setuju')} className="sr-only peer" type="radio" value="standar" name="packet" id="GabungGrup"/>
          <label className="flex w-full justify-center bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-blue-100 peer-checked:ring-blue-500 peer-checked:ring-2 peer-checked:border-transparent peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white" htmlFor="GabungGrup">Standar</label>
        </div>
        <div>
            <input onChange={() => setStatus('tolak')} className="sr-only peer" type="radio" value="premium" name="packet" id="BuatGrup"/>
            <label className="flex w-full justify-center bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-blue-100 peer-checked:ring-blue-500 peer-checked:ring-2 peer-checked:border-transparent peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white" htmlFor="BuatGrup">Premium</label>
        </div>
    </div>
        {/* <div className='flex flex-col gap-4'>
        <div>
            <p className='font-bold w-full'>Status :</p>
            {initializeGroupMember ? <p>Loading...</p> : 
            <>
                <select value={groupMember.status} onChange={(e) => setGroupMember({...groupMember, 'status': e.target.value})} className="w-full bg-white border border-blue-500 rounded-lg p-2">
                <option value="01">Aktif</option>
                <option value="02">Belum Aktif </option>
                </select>
            </>                
            }
        </div>
        <div>
            <p className='font-bold w-full'>Role :</p>
            {initializeGroupMember ? <p>Loading...</p> : 
            <>
                <select value={groupMember.roleUser} onChange={(e) => setGroupMember({...groupMember, 'roleUser': e.target.value})} className="w-full bg-white border border-blue-500 rounded-lg p-2">
                <option value="01">Admin</option>
                <option value="02">User </option>
                </select>
            </>                
            }
        </div>
        <div className='flex flex-col gap-4'>
            <div className='w-full border-t border-gray-300'></div>
            <ButtonFill label="Lanjut" handleClick={() => handleStepApprove('next')}/>
            <ButtonOutline label="Tolak" handleClick={() => handleStepApprove('next')}/>
        </div>
        </div> */}
    </div>
  )
}

export default ApproveGroup