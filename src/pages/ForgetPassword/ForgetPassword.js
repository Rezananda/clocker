import React, { useState } from 'react'
import ButtonFill from '../../components/Button/ButtonFill/ButtonFill'
import Input from '../../components/Input/Input'
import LabelTypography from '../../components/Typography/LabelTypography'
import LargeTypography from '../../components/Typography/LargeTypography'

const ForgetPassword = () => {
    const [email, setEmail] = useState('')
  return (
    <div>
        <div className='flex justify-center min-h-screen bg-gray-50 md:items-center'>
            <div className='flex flex-col py-2 py-2 bg-white px-4 gap-2 rounded-xl w-full md:w-1/4'>
                <LargeTypography textValue="Lupa Password" additionalClass="flex justify-center"/>
                {/* {state.alert&&
                    <Alert 
                    additionalClass="mt-2 mb-2" 
                    color="yellow" 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-yellow-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>} 
                    text={state.alertMessage}
                />} */}
                <div>
                    <LabelTypography textValue="Email"/>
                    <Input handleChange={(e) => setEmail(e.target.value)} type="email" name="email" value={email} placeholder="email@email.com" additionalClass='focus:outline-none focus:ring-blue-500 focus:ring-2'/>
                </div>
            
                <ButtonFill additionalClass={"bg-blue-500 border-blue-500"} label={'Kirim Link'}/>
            </div>
        </div>
    </div>
  )
}

export default ForgetPassword