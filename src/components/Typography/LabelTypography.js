import React from 'react'

const LabelTypography = ({textValue, additionalClass}) => {
  return (
    <p className={`text-blue-500 font-bold ${additionalClass}`}>
        {textValue}
    </p>
  )
}

export default LabelTypography