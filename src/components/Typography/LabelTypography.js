import React from 'react'

const LabelTypography = ({textValue, additionalClass}) => {
  return (
    <p className={`font-bold dark:text-white text-black ${additionalClass}`}>
        {textValue}
    </p>
  )
}

export default LabelTypography