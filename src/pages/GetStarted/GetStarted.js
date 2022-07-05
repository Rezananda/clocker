import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";
import ButtonFill from '../../components/Button/ButtonFill/ButtonFill';
import { useNavigate } from 'react-router-dom';


const GetStarted = () => {
    const navigate = useNavigate()
  return (
      <div className='flex flex-col overflow-y-auto min-h-screen justify-center'>
        <div className='flex h-96'>
            <Swiper pagination={{clickable: true}} modules={[Pagination]} autoHeight={true} className='flex flex-col justify-center h-full'>
                <SwiperSlide><p className='text-center font-bold'>Atur kehadiranmu dengan mudah</p></SwiperSlide>
                <SwiperSlide><p className='text-center font-bold'>Buat tim dengan mudah</p></SwiperSlide>
                <SwiperSlide><p className='text-center font-bold'>Update kehadiran antar member pada tim</p></SwiperSlide>
            </Swiper>
        </div>
        <div className='flex flex-col w-full px-4 justify-center'>
            <ButtonFill additionalClass={"border-blue-500 bg-blue-500"} label="Yuk Mulai" handleClick={() => navigate('/login')}/>
        </div>
      </div>
  )
}

export default GetStarted