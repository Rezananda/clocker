import React from 'react'

const ButtonLink = ({newProps, linkTo, label}) => {
  return (
    <button onClick={linkTo} className={`text-blue-600 underline underline-offset-2 hover:text-blue-700 ${newProps}`}>{label}</button>
  )
}

export default ButtonLink