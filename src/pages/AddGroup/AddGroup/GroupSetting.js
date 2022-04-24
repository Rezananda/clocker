import React from 'react'
import ButtonFill from '../../../components/Button/ButtonFill/ButtonFill'
import ButtonOutline from '../../../components/Button/ButtonOutline/ButtonOutline'

const GroupSetting = ({handleStepAddGroup, setStandardGroupSetting}) => {
  return (
    <div className='flex flex-col px-4'>
        <p className='text-lg font-bold text-blue-500 mb-2 text-center'>Pilih Status</p>
        <ul className='flex flex-col mb-4 divide-y gap-1'>
            <li className='flex items-center justify-between w-full'>
                <span>Work From Home (WFH)</span>
                <input onChange={setStandardGroupSetting} type="checkbox" className='w-4 h-4 text-indigo-500' name='wfh' value="wfh"/>
            </li>
            <li className='flex items-center justify-between w-full'>
                <span>Work From Office (WFO)</span>
                <input onChange={setStandardGroupSetting} type="checkbox" className='w-4 h-4 text-indigo-500' name='wfo' value="wfo"/>
            </li>
            <li className='flex items-center justify-between w-full'>
                <span>Sakit</span>
                <input onChange={setStandardGroupSetting} type="checkbox" className='w-4 h-4 text-indigo-500' name='sakit' value="sakit"/>
            </li>
            <li className='flex items-center justify-between w-full'>
                <span>Cuti</span>
                <input onChange={setStandardGroupSetting} type="checkbox" className='w-4 h-4 text-indigo-500' name='cuti' value="cuti"/>
            </li>
        </ul>
        <div className='flex flex-col gap-4'>
        <div className='w-full border-t border-gray-300'></div>
        <ButtonFill label="Lanjut" handleClick={()=> handleStepAddGroup('next')}/>
        <ButtonOutline label="Kembali" handleClick={()=> handleStepAddGroup('prev')}/>
        </div>
    </div>
  )
}

export default GroupSetting