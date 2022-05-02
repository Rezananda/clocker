import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import React, { useReducer } from 'react'
import {auth, db} from "../../utils/Firebase/Firebase"
import validator from 'validator'
import SpinnerLoading from '../../components/SpinnerLoading/SpinnerLoading'
import useLetterAvatar from '../../hooks/UseLetterAvatar/UseLetterAvatar'
import StepInputData from './StepInputData/StepInputData'
import StepConfirmation from './StepConfirmation/StepConfirmation'

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
    step: 1
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
        case "HANDLE STEP NEXT":
            return {...state, step: state.step + 1}
        case "HANDLE STEP PREV":
            return {...state, step: state.step - 1}
        default:
            break;
    }
}

const Registration = () => {
    const errors = []
    const [state, dispatch] = useReducer(reducer, initialState)
    const letterAvatar = useLetterAvatar(state.firstName, state.lastName)

    const validateForm = () => {
        return validator.isEmpty(state.firstName) || validator.isEmpty(state.lastName) || validator.isEmpty(state.email) || validator.isEmpty(state.password) || validator.isEmpty(state.confirmPassword)
      }

    function handleStepRegistration(statusStepJoinGroup){
        if(statusStepJoinGroup === "prev"){
            dispatch({type: "HANDLE STEP PREV"})
        }else if(statusStepJoinGroup === "next"){
            dispatch({type: "HANDLE STEP NEXT"})
        }else{
            console.log('error step')
        }
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
                        handleStepRegistration('next')
                        dispatch({type: "HANDLE RESET FIELD"})
                        dispatch({type: "HANDLE INITIALIZE", payload: false})
                    })
                })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
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
            {(state.step === 1)? <StepInputData state={state} dispatch={dispatch} errors={errors} validateForm={validateForm()} handleKeyPress={handleKeyPress} handleRegister={handleRegister}/> : (state.step === 2)? <StepConfirmation/> : ""}
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