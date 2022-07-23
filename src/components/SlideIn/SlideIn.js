import React from 'react'

const SlideIn = ({children, setSlideIn}) => {
  return (
    <div>
        <div className='flex fixed z-50'>
            <div className='flex flex-col fixed bottom-0 left-0 right-0 bg-white rounded-t-xl dark:bg-slate-800'>
                {children}
            </div>
        </div>
        <div className="opacity-20 fixed inset-0 z-40 bg-black" onClick={()=> setSlideIn(false)}></div>
    </div>
  )
}

export default SlideIn