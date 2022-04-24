import React from 'react'

const LargeTypography = ({textValue, additionalClass}) => {
  return (
      <p className={`text-3xl font-bold text-blue-500 ${additionalClass}`}>
          {textValue}
      </p>
  )
}

export default LargeTypography