import React, { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import ButtonIcon from '../Button/ButtonIcon/ButtonIcon'

const DropDown = ({menu}) => {
    const [dropDown, setDropDown] = useState(false)
  return (
    <>
        <ButtonIcon actionFunction={() => setDropDown(dropDown => !dropDown)} icon={<svg className="h-6 w-6 text-blue-500"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"> <path stroke="none" d="M0 0h24v24H0z"/>  <circle cx="12" cy="12" r="1" />  <circle cx="12" cy="19" r="1" />  <circle cx="12" cy="5" r="1" /></svg>}/>
        <div className='flex justify-end'>                            
            <ul className={`divide-y text-gray-700 absolute z-40 bg-white rounded px-4 py-2 shadow-md ${dropDown? 'block' : 'hidden'} `}>
              {menu.map((val, index) => 
                <li onClick={() => val.action} key={index} className="text-center cursor-pointer">{val.label}</li> 
              )}
            </ul>
        </div>
    </>
  )
}

export default DropDown