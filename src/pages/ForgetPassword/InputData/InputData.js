import React from 'react'
import { useNavigate } from 'react-router-dom'
import ButtonFill from '../../../components/Button/ButtonFill/ButtonFill'
import ButtonOutline from '../../../components/Button/ButtonOutline/ButtonOutline'
import Input from '../../../components/Input/Input'
import LabelTypography from '../../../components/Typography/LabelTypography'
import LargeTypography from '../../../components/Typography/LargeTypography'

const InputData = ({dispatch, email, handleEmailReset, validateForm}) => {
    const navigate = useNavigate()
  return (
    <div className='flex flex-col py-2 py-2 bg-white px-4 gap-4 rounded-xl w-full md:w-1/4'>
        <LargeTypography textValue="Lupa Password" additionalClass="flex justify-center"/>
        <div>
            <LabelTypography textValue="Email"/>
            <Input handleChange={(e) => dispatch({type: "HANDLE EMAIL", payload: e.target.value})} type="email" name="email" value={email} placeholder="email@email.com" additionalClass='focus:outline-none focus:ring-blue-500 focus:ring-2'/>
        </div>
        <ButtonFill disabled={validateForm} handleClick={handleEmailReset} additionalClass={validateForm ? 'bg-blue-200 border-blue-200' : "border-blue-500 bg-blue-500"} label={'Kirim'}/>
        <ButtonOutline label={'Kembali'} handleClick={() => navigate(-1)} />
    </div>
  )
}

export default InputData