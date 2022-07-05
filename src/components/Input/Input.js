import React from 'react'

const Input = ({handleChange, handleKeyPress, maxLength, type, name, value, placeholder, additionalClass, disabled, readOnly}) => {
  return (
        <input maxLength={maxLength} onChange={handleChange} onKeyPress={handleKeyPress} type={type} value={value} name={name} className={`w-full rounded-lg bg-blue-50 px-4 py-3 dark:bg-black dark:text-white  ${additionalClass}`} placeholder={placeholder} disabled={disabled} readOnly={readOnly} />
  )
}

export default Input