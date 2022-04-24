import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import ButtonFill from '../../components/Button/ButtonFill/ButtonFill'
import ButtonLink from '../../components/Button/ButtonLink/ButtonLink'
import Input from '../../components/Input/Input'
import LabelTypography from '../../components/Typography/LabelTypography'
import LargeTypography from '../../components/Typography/LargeTypography'
import {auth, db} from "../../utils/Firebase/Firebase"
import validator from 'validator'
import Alert from '../../components/Alert/Alert'
import SpinnerLoading from '../../components/SpinnerLoading/SpinnerLoading'
import ButtonIcon from '../../components/Button/ButtonIcon/ButtonIcon'
import { useNavigate } from 'react-router-dom'

const Registration = () => {
    // const history = useHistory()
    const navigate = useNavigate()
    const errors = []
    const [handleError, setHandleError] = useState([])
    const [registration, setRegistration] = useState({
        firstName: "",
        lastName: "",
        email:"",
        password:"",
        confirmPassword: ""
    })
    const [alert, setAlert] = useState(false)
    const [showPassword, setShowPassword] = useState({
        toggle1: false,
        toggle2: false
    })
    const [initializeRegistration, setInitializeRegistration] = useState(false)

    const validateForm = () => {
        return validator.isEmpty(registration.firstName) || validator.isEmpty(registration.lastName) || validator.isEmpty(registration.email) || validator.isEmpty(registration.password) || validator.isEmpty(registration.confirmPassword)
      }

    const handleChange = (e) => {
        const {name, value} = e.target
        setRegistration(prevState => ({
            ...prevState, [name]: value
        }))
    }

    const handleRegister = () =>{
        for(const prop in registration){
            if(validator.isEmpty(registration[prop])){
                errors.push({
                    label: prop,
                    errorType: 'mandatory'
                })
            }
            if(prop === 'email'){
                if(!validator.isEmail(registration[prop])){
                    errors.push({
                        label: prop,
                        errorType: 'invalid',
                    })
                }
            }
            if(prop === 'password'){
                if(!validator.isStrongPassword(registration[prop])){
                    errors.push({
                        label: prop,
                        errorType: 'invalid'
                    })
                }
            }
            if(prop === 'confirmPassword'){
                if(registration[prop] !== registration.password){
                    errors.push({
                        label: 'confirmPassword',
                        errorType: 'invalid'
                    })
                }
            }
        }
        setHandleError(errors)

        if(handleError.length === 0){
            setInitializeRegistration(true)
            createUserWithEmailAndPassword(auth, registration.email, registration.password)
            .then((userCredential) => {
                const user = userCredential.user;
                const letterAvatar = registration.firstName.split(" ").shift().charAt(0) + registration.lastName.split(" ").pop().charAt(0)
                updateProfile(user, {
                    displayName: registration.firstName + " " + registration.lastName,
                    photoURL: letterAvatar

                }).then(async() => {
                    const userData = {
                        displayName: userCredential.user.displayName,
                        email: userCredential.user.email,
                        photoURL: userCredential.user.photoURL,
                        createdAt : userCredential.user.metadata.creationTime
                    }
                    await setDoc(doc(db, "users", userCredential.user.uid), userData)
                    sendEmailVerification(user).then(()=> {
                        setAlert(true)
                        setRegistration({
                            firstName: "",
                            lastName: "",
                            email:"",
                            password:"",
                            confirmPassword: ""
                        })
                    })
                    setInitializeRegistration(false)
                })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
                // ..
            });
        }else {
            console.log('Masih terdapat error')
            setRegistration({
                firstName: "",
                lastName: "",
                email:"",
                password:"",
                confirmPassword: ""
            })
        }
    }

    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            handleRegister()
        }
    }

  return (
    <>
        <div className='flex justify-center min-h-screen bg-gray-50 md:items-center'>
            <div className='flex flex-col gap-2 w-full py-2 bg-white px-4 rounded-xl md:w-1/4'>
                <LargeTypography textValue="Registrasi Clocker" additionalClass="flex justify-center"/>
                {alert ? 
                <Alert 
                    additionalClass="mt-2 mb-2" 
                    color="green" 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>} 
                    text="Berhasi registrasi. Lakukan aktivasi pada link yang dikirim pada email."
                    />
                :
                null
                }

                <div>
                    <LabelTypography textValue="Nama Depan"/>
                    <Input handleChange={handleChange} type="text" name="firstName" value={registration.firstName} placeholder="Maksimal 50 Karakter." additionalClass='focus:outline-none focus:ring-blue-500 focus:ring-2'/>
                    {handleError.length > 0 && handleError.filter(el => el.label === 'firstName' && el.errorType === "mandatory") && Object.keys(registration.firstName).length === 0 && <span className='text-sm text-red-500 italic'>Nama Depan harus diisi</span>}
                    {validator.isLength(registration.firstName, {min: 1, max: 50}) &&
                    <div className='flex items-center'>
                        <span className='text-sm text-green-500'>Sesuai</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                    }
                </div>
                <div>
                    <LabelTypography textValue="Nama Belakang"/>
                    <Input handleChange={handleChange} type="text" name="lastName" value={registration.lastName} placeholder="Maksimal 50 Karakter." additionalClass='focus:outline-none focus:ring-blue-500 focus:ring-2'/>
                    {handleError.length > 0 && handleError.filter(el => el.label === 'lastName' && el.errorType === "mandatory") && Object.keys(registration.lastName).length === 0 && <span className='text-sm text-red-500 italic'>Nama Belakang harus diisi</span>}
                    {validator.isLength(registration.lastName, {min: 1, max: 50}) &&
                    <div className='flex items-center'>
                        <span className='text-sm text-green-500'>Sesuai</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                    }
                </div>
                <div>
                    <LabelTypography textValue="Email"/>
                    <Input handleChange={handleChange} type="email" name="email" value={registration.email} placeholder="email@email.com" additionalClass='focus:outline-none focus:ring-blue-500 focus:ring-2'/>
                    {handleError.length > 0 && handleError.filter(el => el.label === 'email' && el.errorType === "mandatory") && Object.keys(registration.email).length === 0 && <span className='text-sm text-red-500 italic'>Email harus diisi</span>}
                    {handleError.length > 0 && handleError.find(el => el.label === 'email' && el.errorType === 'invalid') && Object.keys(registration.email).length > 0 && <span className='text-sm text-red-500 italic'>Format Email salah</span>}
                    {validator.isEmail(registration.email) &&
                    <div className='flex items-center'>
                        <span className='text-sm text-green-500'>Sesuai</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                    }

                </div>
                <div>
                    <LabelTypography textValue="Password"/>
                    <div className='relative'>
                        <Input handleChange={handleChange} type={showPassword.toggle1 ? 'text' : 'password'} name="password" value={registration.password} placeholder="Password." additionalClass='focus:outline-none focus:ring-blue-500 focus:ring-2'/>
                        
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <ButtonIcon actionFunction={() => setShowPassword({...showPassword, toggle1: !showPassword.toggle1})} icon={showPassword.toggle1 ? <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg> : <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                            </svg>}/>
                        </div>
                    </div>

                    {handleError.length > 0 && handleError.filter(el => el.label === 'password' && el.errorType === "mandatory") && Object.keys(registration.password).length === 0 && <span className='text-sm text-red-500 italic'>Password harus diisi</span>}
                    {handleError.length > 0 && handleError.find(el => el.label === 'password' && el.errorType === 'invalid') && Object.keys(registration.password).length > 0 && <span className='text-sm text-red-500 italic'>Password belum sesuai</span>}
                    {validator.isStrongPassword(registration.password) &&
                    <div className='flex items-center'>
                        <span className='text-sm text-green-500'>Sesuai</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                    }
                </div>

                <div>
                    <LabelTypography textValue="Konfirmasi Password"/>
                    <div className='relative'>
                        <Input handleChange={handleChange} handleKeyPress={handleKeyPress} type={showPassword.toggle2 ? 'text' : 'password'} name="confirmPassword" value={registration.confirmPassword} placeholder="Konfirmasi Password." additionalClass='focus:outline-none focus:ring-blue-500 focus:ring-2'/>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <ButtonIcon actionFunction={() => setShowPassword({...showPassword, toggle2: !showPassword.toggle2})} icon={showPassword.toggle2 ? <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg> : <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                            </svg>}/>
                        </div>
                    </div>
                    {handleError.length > 0 && handleError.filter(el => el.label === 'confirmPassword' && el.errorType === "mandatory") && Object.keys(registration.confirmPassword).length === 0 && <span className='text-sm text-red-500 italic'>Password Konfirmasi harus diisi</span>}
                    {handleError.length > 0 && handleError.find(el => el.label === 'confirmPassword' && el.errorType === 'invalid') && Object.keys(registration.confirmPassword).length > 0 && <span className='text-sm text-red-500 italic'>Password tidak sama</span>}
                    {registration.password === registration.confirmPassword && validator.isLength(registration.confirmPassword, {min: 1}) &&
                    <div className='flex items-center'>
                        <span className='text-sm text-green-500'>Password Sama</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                    }
                </div>
                
                <Alert 
                    additionalClass="mt-2 mb-2" 
                    color="yellow" 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>} 
                    text="Password harus terdiri dari minimal 8 huruf, 1 angka, 1 huruf kapital dan symbol"
                />
                
                <div>
                    <ButtonFill disabled={validateForm()} additionalClass={validateForm() ? 'bg-blue-200 border-blue-200' : ""} handleClick={handleRegister} label="Registrasi" />
                </div>
                <div className='flex justify-center'>
                    <p>Kembali ke halaman</p>&nbsp;
                    <ButtonLink linkTo={()=> navigate('/login')} label="Login"/>
                </div>
            </div>
        </div>
        {initializeRegistration ? 
        <SpinnerLoading/>
        :
        null
        }
    </>
  )
}

export default Registration