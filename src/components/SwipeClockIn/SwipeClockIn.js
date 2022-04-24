import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useNavigate } from 'react-router-dom';

const SwipeClockIn = () => {
    const [swipeLoading, setSwipeLoading] = useState(false)
    // const history = useHistory()
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
                <div className='w-9 h-9 bg-blue-500 rounded-full drop-shadow-lg'></div>
            </SwiperSlide>
            <SwiperSlide>
                <div className='w-full h-9 flex justify-center items-center flex-row-reverse'>{swipeLoading? <p className='text-sm font-bold'>...Loading</p> : ""}</div>
            </SwiperSlide>
        </Swiper>
    </div>
  )
}

export default SwipeClockIn