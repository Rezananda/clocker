import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ButtonFill from '../../components/Button/ButtonFill/ButtonFill'
import ButtonLink from '../../components/Button/ButtonLink/ButtonLink'
import ButtonOutline from '../../components/Button/ButtonOutline/ButtonOutline'
import Input from '../../components/Input/Input'
import LabelTypography from '../../components/Typography/LabelTypography'
import LargeTypography from '../../components/Typography/LargeTypography'
import { auth } from "../../utils/Firebase/Firebase"
import ButtonIcon from '../../components/Button/ButtonIcon/ButtonIcon'
import SpinnerLoading from '../../components/SpinnerLoading/SpinnerLoading'
import Alert from '../../components/Alert/Alert'
import validator from 'validator'

const Login = () => {
    // const history = useHistory()
    const navigate = useNavigate()
    const [login, setLogin] = useState({
        email: "",
        password:""
    })
    const [showPassword, setShowPassword] = useState(false)
    const [initializeLogin, setInitializeLogin] = useState(false)
    const [alert, setAlert] = useState(false)

    const validateForm = () => {
        return validator.isEmpty(login.email) || validator.isEmpty(login.password)
      }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLogin(prevState => ({
            ...prevState, [name]: value
        }))
    }

    const handleLogin = () => {
        setInitializeLogin(true)
        signInWithEmailAndPassword(auth, login.email, login.password)
        .then((userCredential) => {
          const user = userCredential.user;
          if(user.emailVerified){
                setInitializeLogin(false)
                // history.push('/dashboard')
                navigate('/')
          }else{
                setLogin({
                    email: "",
                    password:""
                })
                setInitializeLogin(false)
                setAlert(true)
          }
        })
        .catch((error) => {
            setInitializeLogin(false)
            setAlert(true)
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            setLogin({
                email: "",
                password:""
            })
        });
    }
    const handleKeyPress = (event) => {
      if(event.key === 'Enter'){
          handleLogin()
      }
    }

  return (
      <>
        <div className='flex justify-center min-h-screen bg-gray-50 md:items-center'>
            <div className='flex flex-col py-2 py-2 bg-white px-4 gap-2 rounded-xl w-full md:w-1/4'>
                <LargeTypography textValue="Login Clocker" additionalClass="flex justify-center"/>
                {alert&&
                    <Alert 
                    additionalClass="mt-2 mb-2" 
                    color="yellow" 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-yellow-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>} 
                    text="Kamu belum aktivasi email"
                />}
                <div>
                    <LabelTypography textValue="Email"/>
                    <Input handleChange={handleChange} type="email" name="email" value={login.email} placeholder="email@email.com" additionalClass='focus:outline-none focus:ring-blue-500 focus:ring-2'/>
                </div>
            
                <div>
                    <LabelTypography textValue="Password"/>
                    <div className='relative'>
                        <Input handleKeyPress={handleKeyPress} handleChange={handleChange} type={showPassword ? 'text' : 'password'} name="password" value={login.password} placeholder="Password." additionalClass='focus:outline-none focus:ring-blue-500 focus:ring-2'/>
                        
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <ButtonIcon actionFunction={() => setShowPassword(!showPassword)} icon={showPassword ? <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg> : <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                            </svg>}/>
                        </div>
                    </div>
                </div>

                <ButtonLink newProps="flex justify-end" linkTo={()=> navigate('/forget-password')} label="Lupa password?"/>
                <ButtonFill disabled={validateForm()} additionalClass={validateForm() ? 'bg-blue-200 border-blue-200' : ""} handleClick={handleLogin} label="Login"/>
                {/* <p className='flex justify-center mb-4'>- atau login lebih mudah dengan -</p>
                <ButtonFill label="Google"/> */}
                <div className='flex justify-center'>
                <p>Belum punya akun? registrasi</p>&nbsp;
                <ButtonLink linkTo={()=> navigate('/registration')} label="disini"/>
                </div>
            </div>
        </div>
        {initializeLogin&&<SpinnerLoading/>}
    </>
  )
}

export default Login