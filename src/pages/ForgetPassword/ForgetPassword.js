import { sendPasswordResetEmail } from 'firebase/auth'
import React, { useReducer, useState } from 'react'
import SpinnerLoading from '../../components/SpinnerLoading/SpinnerLoading'
import { auth } from '../../utils/Firebase/Firebase'
import InputData from './InputData/InputData'
import ResultReset from './ResultReset/ResultReset'
import validator from 'validator'

const initialState = {
    email: "",
    step: 1,
    initialize: false
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'HANDLE EMAIL':
            return {...state, email: action.payload}
        case 'HANDLE STEP' :
            return {...state, step: state.step + 1}
        case 'HANDLE INITIALIZE':
            return {...state, initialize: action.payload}
        default:
            break;
    }
}

const ForgetPassword = () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const validateForm = () => {
        return validator.isEmpty(state.email) || !validator.isEmail(state.email)
      }

    function handleStep(statusStep){
        if(statusStep === "next"){
            dispatch({type: 'HANDLE STEP'})
        }else{
            console.log('error step')
        }
    }

    const handleEmailReset = () => {
        dispatch({type: 'HANDLE INITIALIZE', payload: true})
        sendPasswordResetEmail(auth, state.email).then(() => {
            dispatch({type: 'HANDLE INITIALIZE', payload: false})
            handleStep('next')
        })
    }
  return (
    <>
        <div className='flex justify-center min-h-screen bg-gray-100 md:items-center'>
            <div className='px-4 py-4 w-full'>
                {(state.step === 1)? <InputData dispatch={dispatch} email={state.email} handleEmailReset={handleEmailReset} validateForm={validateForm()}/> : (state.step === 2)? <ResultReset/> : ""}
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

export default ForgetPassword