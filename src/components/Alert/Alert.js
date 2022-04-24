import React from 'react'

const Alert = ({color, icon, text, additionalClass}) => {
  return (
        <div className={`bg-${color}-50 w-full flex justify-center items-center p-2 rounded border-l-4 border-${color}-500 drop-shadow ${additionalClass}`}>
            {icon}
            <p className={`text-sm font-bold text-${color}-500 ml-1`}>{text}</p>
        </div>
  )
}

export default Alert