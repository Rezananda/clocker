import React, { useState } from 'react'
import ButtonFill from '../Button/ButtonFill/ButtonFill'
import ButtonOutline from '../Button/ButtonOutline/ButtonOutline'
import SpinnerLoading from '../SpinnerLoading/SpinnerLoading'

const Modal = ({text, handleAction, handleClose, initializing}) => {
  return (
        <>
            <div className="flex px-4 justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-40 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className="p-4 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className='flex flex-col gap-4'>
                                <div className='flex justify-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p>{text}</p>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <ButtonFill label="Setuju" handleClick={handleAction} />
                                    <ButtonOutline label="Kembali" handleClick={handleClose}/>
                                </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-30 bg-black"></div>
            {initializing && <SpinnerLoading/>}
        </>
  )
}

export default Modal