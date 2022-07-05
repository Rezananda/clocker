import React from 'react'
import Alert from '../../components/Alert/Alert'
import ButtonFill from '../../components/Button/ButtonFill/ButtonFill'
import ButtonIcon from '../../components/Button/ButtonIcon/ButtonIcon'
import ButtonOutline from '../../components/Button/ButtonOutline/ButtonOutline'
import Input from '../../components/Input/Input'
import SpinnerLoading from '../../components/SpinnerLoading/SpinnerLoading'
import LabelTypography from '../../components/Typography/LabelTypography'

const InputNewPassword = ({alert, setAlert, password, setPassword, handleChangePassword, handleStepChangePassword, initializeChangePassword, showPassword, setShowPassword}) => {
  return (
    <div className='flex flex-col gap-3'>
        {initializeChangePassword&& <SpinnerLoading/>}
        {alert.show&&<Alert type={'warning'} text={alert.message} handleClose={() => setAlert(prev => ({...prev, show: false}))}/>}
        <div>
            <LabelTypography textValue="Password Baru*"/>
            <div className='relative'>
                <Input type={showPassword.showNewPassword ? 'text' : 'password'} value={password.newPassword} placeholder="Masukkan Password Baru" additionalClass='focus:outline-none focus:ring-blue-500 focus:ring-2' handleChange={(e) => setPassword(prev => ({...prev, newPassword: e.target.value}))}/>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <ButtonIcon icon={showPassword.showNewPassword ? 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg> 
                    : 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>} actionFunction={() => setShowPassword(prev => ({...prev, showNewPassword: !showPassword.showNewPassword}))}/>
                </div>
            </div>
        </div>
        <div>
            <LabelTypography textValue="Konfirmasi Password Baru*"/>
            <div className='relative'>
                <Input type={showPassword.showConfirmationPassword ? 'text' : 'password'} name="confirmationNewPassword" value={password.confirmationNewPassword} placeholder="Masukkan Konfirmasi Password Baru" additionalClass='focus:outline-none focus:ring-blue-500 focus:ring-2' handleChange={(e) => setPassword(prev => ({...prev, confirmationNewPassword: e.target.value}))}/>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <ButtonIcon icon={showPassword.showConfirmationPassword ? 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg> 
                    : 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>} actionFunction={() => setShowPassword(prev => ({...prev, showConfirmationPassword: !showPassword.showConfirmationPassword}))}/>
                </div>
            </div>
        </div>
        <div className='flex flex-col gap-2'>
            <ButtonFill additionalClass={"border-blue-500 bg-blue-500"} label="Ubah Password" handleClick={handleChangePassword} />
            <ButtonOutline label="Kembali" handleClick={() => handleStepChangePassword('prev')}/>
        </div>
    </div>
  )
}

export default InputNewPassword