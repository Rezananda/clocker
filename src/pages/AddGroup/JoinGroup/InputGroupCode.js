import React from 'react'
import Alert from '../../../components/Alert/Alert'
import ButtonFill from '../../../components/Button/ButtonFill/ButtonFill'
import Input from '../../../components/Input/Input'
import SpinnerLoading from '../../../components/SpinnerLoading/SpinnerLoading'
import LabelTypography from '../../../components/Typography/LabelTypography'
import validator from 'validator'

const InputGroupCode = ({setGroupCode, groupCode, handleCheckCodeGroup, initializingGroupCodeData, groupCodeData, setCloseAlert}) => {
  const validateForm = () => {
    return validator.isEmpty(groupCode)
  }
  return (
    <>
    {!groupCodeData ? 
    <Alert type={'warning'} text={'Kode Grup Salah'}/>
    :
    ""
    }
      <div className='flex flex-col gap-4'>
        <div>
          <LabelTypography textValue="Kode Grup"/>
          <Input maxLength={20} handleChange={setGroupCode} type="text" name="groupCode" placeholder="Input Kode Group" additionalClass={'focus:outline-none focus:ring-blue-500 focus:ring-2'}/>
          <Alert additionalClass="mt-2" color="yellow" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>} text="Dapatkan kode grup dari admin"/>
        </div>
        <ButtonFill label="Lanjut" handleClick={handleCheckCodeGroup} disabled={validateForm()} additionalClass={validateForm() ? 'bg-blue-200 border-blue-200' : "bg-blue-500 border-blue-500"}/>
        {initializingGroupCodeData&&<SpinnerLoading/>}
      </div>
    </>
  )
}

export default InputGroupCode