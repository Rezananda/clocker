import React from 'react'
import ButtonFill from '../../../components/Button/ButtonFill/ButtonFill'
import Input from '../../../components/Input/Input'
import LabelTypography from '../../../components/Typography/LabelTypography'
import validator from 'validator'

const InputGroupName = ({handleStepAddGroup, handleGroupStatus, setGroupName, groupName, groupStatus}) => {

  const validateForm = () => {
    return validator.isEmpty(groupName) || groupStatus.length === 0
  }

  const checkLength = () => {
    return validator.isLength(groupName, {max: 19})
  }

  return (
      <div className='flex flex-col gap-4'>
        <div>
          <LabelTypography textValue="Nama Grup"/>
          <Input additionalClass={!checkLength() ? "focus:outline-none focus:ring-red-500 focus:ring-2" : ""} maxLength={20} type="text" name="groupName" handleChange={setGroupName} value={groupName} placeholder="Nama Grup..."/>
          {!checkLength() ? <span className='text-xs text-red-500'>Maksimal 20 karakter</span> : ""}
          
        </div>
        <div>
          <LabelTypography textValue="Kapasitas"/>
          <Input type="number" name="capacity" value="50" disabled={true} additionalClass="text-gray-400"/>
        </div>
        <div>
          <LabelTypography textValue="Status Kehadiran"/>
          <ul className='flex flex-col gap-1'>
              <li className='flex items-center justify-between w-full'>
                  <span>Work From Home (WFH)</span>
                  <input onChange={handleGroupStatus} type="checkbox" className='w-4 h-4 text-indigo-500' name='WFH' value="WFH" checked={groupStatus.includes('WFH')}/>
              </li>

              <li className='flex items-center justify-between w-full'>
                  <span>Work From Office (WFO)</span>
                  <input onChange={handleGroupStatus} type="checkbox" className='w-4 h-4 text-indigo-500' name='WFO' value="WFO" checked={groupStatus.includes('WFO')}/>
              </li>

              <li className='flex items-center justify-between w-full'>
                  <span>Sakit</span>
                  <input onChange={handleGroupStatus} type="checkbox" className='w-4 h-4 text-indigo-500' name='Sakit' value="Sakit" checked={groupStatus.includes('Sakit')}/>
              </li>
              
              <li className='flex items-center justify-between w-full'>
                  <span>Cuti</span>
                  <input onChange={handleGroupStatus} type="checkbox" className='w-4 h-4 text-indigo-500' name='Cuti' value="Cuti" checked={groupStatus.includes('Cuti')}/>
              </li>
          </ul>
        </div>
        <ButtonFill label="Lanjut" handleClick={() => handleStepAddGroup('next')} disabled={validateForm()} additionalClass={validateForm() ? 'bg-blue-200 border-blue-200' : "bg-blue-500 border-blue-500"} />
      </div>
  )
}

export default InputGroupName