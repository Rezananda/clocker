import React from 'react'

const LabelTypography = ({textValue, additionalClass}) => {
  return (
    <p className={`font-bold ${additionalClass}`}>
        {textValue}
    </p>
  )
}

export default LabelTypography