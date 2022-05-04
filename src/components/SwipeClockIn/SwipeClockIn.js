import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useNavigate } from 'react-router-dom';

const SwipeClockIn = () => {
    const [swipeLoading, setSwipeLoading] = useState(false)
    const navigate = useNavigate()
    const SwipeClokcer = () => {
        setTimeout(()=> {
            setSwipeLoading(true)
        }, 500) 
        setTimeout(() => {
            navigate('/add-attendance')
        }, 2000)
    }
  return (
    <div className='bg-blue-100 h-10 flex items-center rounded-full shadow-xl'>
        <Swiper
            dir="rtl"
            slidesPerView={1}
            onSlideChange={() => SwipeClokcer()}
            style={{borderRadius: "9999px", marginLeft: "2px", display:'flex', justifyContent:"center"}}
            >
            <SwiperSlide style={{display:"flex", justifyContent:"flex-end"}}>
                <div className='w-9 h-9 bg-blue-500 rounded-full drop-shadow-lg flex items-center justify-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='w-full h-9 flex justify-center items-center flex-row-reverse'>{swipeLoading? <p className='text-sm font-bold'>...Loading</p> : ""}</div>
            </SwiperSlide>
        </Swiper>
    </div>
  )
}

export default SwipeClockIn