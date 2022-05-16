import React from 'react'

const LargeTypography = ({textValue, additionalClass}) => {
  return (
      <p className={`text-2xl font-bold ${additionalClass}`}>
          {textValue}
      </p>
  )
}

export default LargeTypography