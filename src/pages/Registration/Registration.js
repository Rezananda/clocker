import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import React, { useReducer } from 'react'
import {auth, db} from "../../utils/Firebase/Firebase"
import validator from 'validator'
import SpinnerLoading from '../../components/SpinnerLoading/SpinnerLoading'
import useLetterAvatar from '../../hooks/UseLetterAvatar/UseLetterAvatar'
import LargeTypography from '../../components/Typography/LargeTypography'
import Alert from '../../components/Alert/Alert'
import LabelTypography from '../../components/Typography/LabelTypography'
import Input from '../../components/Input/Input'
import ButtonIcon from '../../components/Button/ButtonIcon/ButtonIcon'
import ButtonFill from '../../components/Button/ButtonFill/ButtonFill'
import { useNavigate } from 'react-router-dom'
import ButtonLink from '../../components/Button/ButtonLink/ButtonLink'

const initialState = {
    firstName: "",
    lastName: "",
    email:"",
    password: "",
    confirmPassword: "",
    initialize: false,
    tooltip: false,
    showPasswordToggle1: false,
    showPasswordToggle2: false,
    alert: false,
    alertMessage: "",
}

const reducer = (state, action) => {
    switch (action.type) {
        case "HANDLE INPUT TEXT":
            return {...state, [action.field] : action.payload}
        case "HANDLE RESET FIELD":
            return {
                ...state, 
                firstName: "",
                lastName: "",
                email:"",
                password:"",
                confirmPassword: ""
            }
        case "HANDLE SHOW PASSWORD 1":
            return {...state, showPasswordToggle1: action.payload}
        case "HANDLE SHOW PASSWORD 2":
            return {...state, showPasswordToggle2: action.payload}
        case "HANDLE INITIALIZE":
            return {...state, initialize: action.payload}
        case "HANDLE ALERT":
            return {...state, alert: true, alertMessage: action.payload}
        case "HANDLE TOOLTIP":
            return {...state, tooltip: action.payload}
        default:
            break;
    }
}

const Registration = () => {
    const errors = []
    const [state, dispatch] = useReducer(reducer, initialState)
    const navigate = useNavigate()
    const letterAvatar = useLetterAvatar(state.firstName, state.lastName)

    const validateForm = () => {
        return validator.isEmpty(state.firstName) || validator.isEmpty(state.lastName) || validator.isEmpty(state.email) || validator.isEmpty(state.password) || validator.isEmpty(state.confirmPassword)
      }


    const handleRegister = () =>{
        for(const prop in state){
            if(prop === 'email'){
                if(!validator.isEmail(state[prop])){
                    errors.push({
                        label: prop,
                        errorType: 'invalid',
                    })
                }
            }
            if(prop === 'password'){
                if(!validator.isStrongPassword(state[prop])){
                    errors.push({
                        label: prop,
                        errorType: 'invalid'
                    })
                }
            }
            if(prop === 'confirmPassword'){
                if(state[prop] !== state.password){
                    errors.push({
                        label: 'confirmPassword',
                        errorType: 'invalid'
                    })
                }
            }
        }

        if(errors.length === 0){
            dispatch({type: "HANDLE INITIALIZE", payload: true})
            createUserWithEmailAndPassword(auth, state.email, state.password)
            .then((userCredential) => {
                const user = userCredential.user;
                updateProfile(user, {
                    displayName: state.firstName + " " + state.lastName,
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
                        dispatch({type: "HANDLE ALERT", payload: "Lakukan aktivasi pada link yang dikirim pada emailmu."})
                        dispatch({type: "HANDLE RESET FIELD"})
                        dispatch({type: "HANDLE INITIALIZE", payload: false})
                    })
                })
            })
            .catch((error) => {
                const errorCode = error.code;
                dispatch({type: "HANDLE ALERT", payload: errorCode})
                dispatch({type: "HANDLE INITIALIZE", payload: false})
            });
        }
    }

    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            handleRegister()
        }
    }

  return (
    <>
        <div className='flex justify-center min-h-screen bg-gray-100 md:items-center'>
            <div className='flex flex-col gap-4 w-full py-2 bg-white px-4 rounded-xl md:w-1/4'>
                <LargeTypography textValue="Registrasi Clocker" additionalClass="flex justify-center"/>

                {state.alert&&state.alertMessage === "auth/email-already-in-use" ? 
                <Alert 
                additionalClass="mt-2 mb-2" 
                type={'warning'}
                text={state.alertMessage}
                />
                :
                state.alert?
                <Alert 
                additionalClass="mt-2 mb-2" 
                type={'info'}
                text={state.alertMessage}
                />
                : 
                null
                }

                <div>
                    <LabelTypography textValue="Nama Depan*"/>
                    <div className='relative'>
                        <Input handleChange={(e) => dispatch({type: "HANDLE INPUT TEXT", field: e.target.name, payload: e.target.value})} type="text" name="firstName" value={state.firstName} placeholder="Maksimal 50 Karakter." additionalClass='focus:outline-none focus:ring-blue-500 focus:ring-2'/>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            {validator.isLength(state.firstName, {min: 1, max: 50}) &&
                            <div className='flex items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            }
                        </div>
                        {errors.length > 0 && errors.filter(el => el.label === 'firstName' && el.errorType === "mandatory") && Object.keys(state.firstName).length === 0 && <span className='text-sm text-red-500 italic'>Nama Depan harus diisi</span>}
                    </div>
                </div>
                <div>
                    <LabelTypography textValue="Nama Belakang*"/>
                    <div className='relative'>
                        <Input handleChange={(e) => dispatch({type: "HANDLE INPUT TEXT", field: e.target.name, payload: e.target.value})} type="text" name="lastName" value={state.lastName} placeholder="Maksimal 50 Karakter." additionalClass='focus:outline-none focus:ring-blue-500 focus:ring-2'/>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            {validator.isLength(state.lastName, {min: 1, max: 50}) &&
                            <div className='flex items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            }
                        </div>
                        {errors.length > 0 && errors.filter(el => el.label === 'lastName' && el.errorType === "mandatory") && Object.keys(state.lastName).length === 0 && <span className='text-sm text-red-500 italic'>Nama Belakang harus diisi</span>}
                    </div>
                </div>
                <div>
                    <LabelTypography textValue="Email*"/>
                    <div className='relative'>
                        <Input  handleChange={(e) => dispatch({type: "HANDLE INPUT TEXT", field: e.target.name, payload: e.target.value})} type="email" name="email" value={state.email} placeholder="email@email.com" additionalClass='focus:outline-none focus:ring-blue-500 focus:ring-2'/>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            {validator.isEmail(state.email) &&
                            <div className='flex items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            }
                        </div>
                        {errors.length > 0 && errors.filter(el => el.label === 'email' && el.errorType === "mandatory") && Object.keys(state.email).length === 0 && <span className='text-sm text-red-500 italic'>Email harus diisi</span>}
                        {errors.length > 0 && errors.find(el => el.label === 'email' && el.errorType === 'invalid') && Object.keys(state.email).length > 0 && <span className='text-sm text-red-500 italic'>Format Email salah</span>}
                    </div>

                </div>
                <div>
                    <div className='flex items-center'>
                        <LabelTypography textValue="Password*"/>
                        <div className='relative flex flex-col items-center'>
                            <ButtonIcon actionFunction={()=> dispatch({type: "HANDLE TOOLTIP", payload: !state.tooltip})} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>}/>
                            {state.tooltip ?                   
                            <div className="absolute flex bottom-0 flex-col items-center mb-6">
                                <span className="relative z-10 p-2 text-xs w-44 leading-none text-white bg-black rounded-lg shadow-lg">Password harus terdiri dari minimal 8 huruf, 1 angka, 1 huruf kapital dan symbol</span>
                                <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                            </div>
                            :
                            ""
                            }
                        </div>
                    </div>
                    <div className='relative'>
                        <Input handleChange={(e) => dispatch({type: "HANDLE INPUT TEXT", field: e.target.name, payload: e.target.value})} type={state.showPasswordToggle1 ? 'text' : 'password'} name="password" value={state.password} placeholder="Password." additionalClass='focus:outline-none focus:ring-blue-500 focus:ring-2'/>
                        
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            {validator.isStrongPassword(state.password) &&
                            <div className='flex items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            }
                            <ButtonIcon actionFunction={() => dispatch({type: "HANDLE SHOW PASSWORD 1",  payload: !state.showPasswordToggle1})} icon={state.showPasswordToggle1 ? <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg> : <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                            </svg>}/>
                        </div>
                    </div>

                    {errors.length > 0 && errors.filter(el => el.label === 'password' && el.errorType === "mandatory") && Object.keys(state.password).length === 0 && <span className='text-sm text-red-500 italic'>Password harus diisi</span>}
                    {errors.length > 0 && errors.find(el => el.label === 'password' && el.errorType === 'invalid') && Object.keys(state.password).length > 0 && <span className='text-sm text-red-500 italic'>Password belum sesuai</span>}
                </div>

                <div className='mb-4'>
                    <LabelTypography textValue="Konfirmasi Password*"/>
                    <div className='relative'>
                        <Input handleChange={(e) => dispatch({type: "HANDLE INPUT TEXT", field: e.target.name, payload: e.target.value})} handleKeyPress={handleKeyPress} type={state.showPasswordToggle2 ? 'text' : 'password'} name="confirmPassword" value={state.confirmPassword} placeholder="Konfirmasi Password." additionalClass='focus:outline-none focus:ring-blue-500 focus:ring-2'/>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            {state.password === state.confirmPassword && validator.isLength(state.confirmPassword, {min: 1}) &&
                            <div className='flex items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            }
                            <ButtonIcon actionFunction={() => dispatch({type: "HANDLE SHOW PASSWORD 2", payload: !state.showPasswordToggle2})} icon={state.showPasswordToggle2 ? <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg> : <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                            <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                            </svg>}/>
                        </div>
                    </div>
                    {errors.length > 0 && errors.filter(el => el.label === 'confirmPassword' && el.errorType === "mandatory") && Object.keys(state.confirmPassword).length === 0 && <span className='text-sm text-red-500 italic'>Password Konfirmasi harus diisi</span>}
                    {errors.length > 0 && errors.find(el => el.label === 'confirmPassword' && el.errorType === 'invalid') && Object.keys(state.confirmPassword).length > 0 && <span className='text-sm text-red-500 italic'>Password tidak sama</span>}
                </div>
                <div>
                    <ButtonFill disabled={validateForm()} additionalClass={validateForm() ? 'bg-blue-200 border-blue-200' : "border-blue-500 bg-blue-500"} handleClick={handleRegister} label="Registrasi" />
                </div>
                <div className='flex justify-center'>
                    <p>Kembali ke halaman</p>&nbsp;
                    <ButtonLink linkTo={()=> navigate('/login')} label="Login"/>
                </div>
            </div>
        </div>
        {state.initialize ? 
        <SpinnerLoading/>
        :
        null
        }
    </>
  )
}

export default Registration