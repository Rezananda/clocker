import React, { useState } from 'react'
import ButtonFill from '../../../components/Button/ButtonFill/ButtonFill'
import Input from '../../../components/Input/Input'
import LabelTypography from '../../../components/Typography/LabelTypography'
import validator from 'validator'

const InputGroupName = ({handleStepAddGroup, handleGroupStatus, setGroupName, groupName, groupStatus, handleLocation, handleRemoveLocation, setLocation, locations, location}) => {
  const [showMultiPleInput, setShowMultipleInput] = useState(false)
  const validateForm = () => {
    return validator.isEmpty(groupName) || groupStatus.length === 0 || locations.length === 0
  }

  const checkLength = () => {
    return validator.isLength(groupName, {max: 19})
  }

  return (
      <div className='flex flex-col gap-4'>
        <div>
          <LabelTypography textValue="Nama Grup"/>
          <Input additionalClass={!checkLength() ? "focus:outline-none focus:ring-red-500 focus:ring-2" : ""} maxLength={20} type="text" name="groupName" handleChange={setGroupName} value={groupName} placeholder="Nama Grup"/>
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
                  <span>Work From Office (WFO)</span>
                  <input onClick={() => setShowMultipleInput(!showMultiPleInput)} onChange={handleGroupStatus} type="checkbox" className='w-4 h-4 text-indigo-500' name='WFO' value="WFO" checked={groupStatus.includes('WFO')}/>
              </li>
              
              <li className='flex items-center justify-between w-full'>
                  <span>Work From Home (WFH)</span>
                  <input onChange={handleGroupStatus} type="checkbox" className='w-4 h-4 text-indigo-500' name='WFH' value="WFH" checked={groupStatus.includes('WFH')}/>
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
        {showMultiPleInput&&        
        <div>
          <LabelTypography textValue="Lokasi WFO"/>
          <div className='flex flex-wrap mb-2 border-b border-gray-200 p-1 rounded-lg gap-1'>
            {locations.map((items, index) => (
              <div key={index} className='p-1 bg-blue-100 rounded text-blue-500 flex items-center gap-1 w-max'>
                <p className='text-sm'>{items}</p>
                <button onClick={() => handleRemoveLocation(items)} >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>  
                </button>
              </div>
            ))}
          </div>
          <div className='flex items-center gap-2'>
            <input onChange={setLocation} value={location} type='text' name='wfoLocation' className={`w-full rounded-lg bg-blue-50 px-4 py-3`} placeholder={'Lokasi WFO'}/> 
            <button disabled={location === ""} onClick={handleLocation} className={`${location === ""? "bg-blue-200" : "bg-blue-500" } flex items-center justify-center text-white text-sm rounded-lg p-1`}>Tambah</button>
          </div>
        </div>
        }
        <ButtonFill label="Lanjut" handleClick={() => handleStepAddGroup('next')} disabled={validateForm()} additionalClass={validateForm() ? 'bg-blue-200 border-blue-200' : "bg-blue-500 border-blue-500"} />
      </div>
  )
}

export default InputGroupName