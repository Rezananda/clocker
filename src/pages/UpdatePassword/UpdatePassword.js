import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth'
import React, { useState } from 'react'
import TopNavbar from '../../components/Navbar/TopNavbar'
import SpinnerLoading from '../../components/SpinnerLoading/SpinnerLoading'
import useUserContext from '../../hooks/UseUserContext/UseUserContext'
import InputNewPassword from './InputNewPassword'
import InputOldPassowrd from './InputOldPassword'
import ResultChangePassword from './ResultChangePassword'

const UpdatePassword = () => {
    const userContext = useUserContext()
    const user = userContext.currentUser
    const [password, setPassword] = useState({
        oldPassword:"",
        newPassword:"",
        confirmationNewPassword:""
    })
    const [initializeOldPassword, setInitializeOldPassword] = useState(false)
    const [initializeChangePassword, setInitializeChangePassword] = useState(false)
    const [alert, setAlert] = useState({
        show: false,
        message: ""
    })
    const [stepPassword, setStepPassword] = useState(1)
    const [showPassword, setShowPassword] = useState({
        showOldPassword: false,
        showNewPassword: false,
        showConfirmationPassword: false
    })



    function handleStepChangePassword(stepHandleChangePassword){
        if(stepHandleChangePassword === "prev"){
            setStepPassword(stepPassword - 1)
        }else if(stepHandleChangePassword === "next"){
            setStepPassword(stepPassword + 1)
        }else{
            console.log('error step')
        }
      }

    const handleVerifyPassword = () => {
        setInitializeOldPassword(true)
        const credential =   EmailAuthProvider.credential(user.email, password.oldPassword)

        reauthenticateWithCredential(user, credential).then(() => {
            setAlert(prev => ({...prev, show: false}))
            setPassword(prev => ({...prev, oldPassword: ""}))
            handleStepChangePassword('next')
            setInitializeOldPassword(false)
        }).catch((error) => {
            setAlert(prev => ({...prev, show: true, message: "Password Salah"}))
            setPassword(prev => ({...prev, oldPassword: ""}))
            setInitializeOldPassword(false)
        })
    }
    
    const handleChangePassword = () => {
        setInitializeChangePassword(true)
        if(password.newPassword === password.confirmationNewPassword){
            updatePassword(user, password.newPassword).then(() => {
                setPassword(prev => ({...prev, newPassword: ""}))
                setPassword(prev => ({...prev, confirmationNewPassword: ""}))
                handleStepChangePassword('next')
                setInitializeChangePassword(false)
            }).catch((error) => {
                setAlert(prev => ({...prev, show: true, message: "Terjadi Kesalahan"}))
                setPassword(prev => ({...prev, newPassword: ""}))
                setPassword(prev => ({...prev, confirmationNewPassword: ""}))
                setInitializeChangePassword(false)
            })
        }else {
            setAlert(prev => ({...prev, show: true, message: "Password Tidak Sama"}))
            setPassword(prev => ({...prev, newPassword: ""}))
            setPassword(prev => ({...prev, confirmationNewPassword: ""}))
            setInitializeChangePassword(false)
        }
    }
  return (
    <div>
        {initializeOldPassword&&<SpinnerLoading/>}
        <TopNavbar navbarColor={'bg-blue-500'} label={'Ubah Password'} labelColor={'text-white'} back={true} navigateTo={-1}/>
        <div className='px-4 py-4'>
            <div className='bg-white rounded-lg px-4 py-4 dark:bg-slate-800'>
                {stepPassword === 1 ?
                <InputOldPassowrd alert={alert} setAlert={setAlert} password={password} setPassword={setPassword} handleVerifyPassword={handleVerifyPassword} showPassword={showPassword} setShowPassword={setShowPassword}/>
                :
                stepPassword === 2 ?
                <InputNewPassword alert={alert} setAlert={setAlert} password={password} setPassword={setPassword} handleChangePassword={handleChangePassword} handleStepChangePassword={handleStepChangePassword} initializeChangePassword={initializeChangePassword} showPassword={showPassword} setShowPassword={setShowPassword} />
                :
                stepPassword === 3 ?
                <ResultChangePassword/>
                :
                null
                }
            </div>
        </div>
    </div>
  )
}

export default UpdatePassword