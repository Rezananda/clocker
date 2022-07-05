import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import { useNavigate } from 'react-router-dom'
import 'react-datepicker/dist/react-datepicker.css'
import {addDays, getDay, parseISO} from 'date-fns'
import useGetCalender from '../../hooks/UseGetCalender/useGetCalender'
import LoadingListAttendance from '../../components/LoadingPulse/LoadingListAttendance'
import TopNavbar from '../../components/Navbar/TopNavbar'
import moment from 'moment'
import InfiniteScroll from 'react-infinite-scroll-component'

const MyDate = () => {
    const navigate = useNavigate()
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [calenderData, initializeCalenderData, attendanceEmpty, scroll] = useGetCalender()

    const onChange = (dates) => {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
      if(start&&end){
        navigate('/add-my-date', {state: {startDate: start, endDate: end}})
      }
    };
    
    const isWeekday = (date) => {
      const day = getDay(date);
      return day !== 0 && day !== 6;
    };
  

  return (
    <div className='flex flex-col h-screen'>
        <TopNavbar navbarColor={`bg-blue-500`} label={'Kalender Saya'} back={true} labelColor={`text-white`} navigateTo={'/'}/>
        <div className='px-4 py-4'>
        <div className='flex items-center justify-center'>
          <style>
            {`.react-datepicker__month-container{
              width: 90vw;
            }
            .react-datepicker__day--highlighted{
              background-color: rgb(59 130 246);
              color: white;
            }
            `}
          </style>
          <DatePicker
              selected={startDate}
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}      
              minDate={new Date()}
              filterDate={isWeekday}
              excludeDates={calenderData === 'noCalender' ? '' : calenderData.map((val) => (
                addDays(parseISO(moment(val.addDate, 'DD/MM/YYYY').format('YYYY-MM-DD')), 0)
                ))}
                selectsRange
                selectsEnd
                inline
                highlightDates={calenderData === 'noCalender' ? '' : calenderData.map((val) => (
                  addDays(parseISO(moment(val.addDate, 'DD/MM/YYYY').format('YYYY-MM-DD')), 0)
                  ))}
                  />
          </div>
          <div className='py-2 flex flex-col gap-1'>
            <p className='font-bold'>Agenda</p>
            {initializeCalenderData? <LoadingListAttendance/>:
            <>
              {calenderData === 'noCalender'? <p className='text-sm text-gray-500 text-center'>-Belum ada agenda-</p>
              :
              <div className='flex flex-col overflow-y-auto' id="scrollableDiv" style={{height: '40vh'}}>
                <InfiniteScroll
                dataLength={calenderData.length}
                next={() => scroll()}
                hasMore={!attendanceEmpty}
                loader={
                  <div className='flex justify-center items-center p-1'>
                    <svg role="status" className="w-6 h-6 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                </div>
                }
                scrollableTarget={'scrollableDiv'}
                >              
                  {calenderData !== 'noCalender'&&calenderData.map((val, index) => (
                    <div key={index} className='w-full flex items-center justify-between px-3 py-4 bg-blue-100 border-l-4 border-blue-500 rounded mb-1'>
                      <div className='flex'>
                        <p>🏖️</p>
                        <p className='font-bold'>{val.status}</p>
                      </div>
                      <p>{val.addDate}</p>
                    </div>
                  ))
                  }
                </InfiniteScroll>
              </div>
              }
            </>
            } 
          </div>
          </div>
    </div>
  )
}

export default MyDate