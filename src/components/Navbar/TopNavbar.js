import React from 'react'
import { useNavigate } from 'react-router-dom'
import ButtonIcon from '../Button/ButtonIcon/ButtonIcon'

const TopNavbar = ({navbarColor, label, labelColor, back, navigateTo}) => {
    const navigate = useNavigate()
  return (
    <nav className={`${navbarColor} px-2 py-4 flex flex-row items-center drop-shadow`}>
        <div className='flex items-center'>
            {back?                 
                <ButtonIcon 
                actionFunction={()=> navigate(navigateTo)} 
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>}/>
                :
                null
            }
            <p className={`text-md font-bold ${labelColor} flex ml-1`}>{label}</p>
        </div>
    </nav>
  )
}

export default TopNavbar