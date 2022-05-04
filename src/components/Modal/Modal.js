import React, { useState } from 'react'
import ButtonFill from '../Button/ButtonFill/ButtonFill'
import ButtonOutline from '../Button/ButtonOutline/ButtonOutline'
import SpinnerLoading from '../SpinnerLoading/SpinnerLoading'

const Modal = ({name, question, handleAction, handleClose, initializing}) => {
  return (
        <>
            <div className="flex px-4 justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-40 outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className="p-4 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white w-80 outline-none">
                        <div className='flex flex-col gap-4'>
                            <div className='flex justify-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className='text-center'>
                                <p className='text-lg'>{question}</p>
                                <p className='font-bold text-xl'>{name}</p>
                            </div>
                            <div className='border-t border-gray-200'></div>
                            <div className='flex flex-col gap-2'>
                                <ButtonFill additionalClass={'bg-blue-500 border-blue-500'} label="OK" handleClick={handleAction} />
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