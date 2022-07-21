import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import Chip from '../../components/Chip/Chip';
import LoadingChip from '../../components/LoadingPulse/LoadingChip';
import LoadingTransaction from '../../components/LoadingPulse/LoadingTransaction';
import TopNavbar from '../../components/Navbar/TopNavbar';
import useCheckGroup from '../../hooks/UseCheckGroup/useCheckGroup';
import UseCheckPersonalAttendance from '../../hooks/UseCheckPersonalAttendance/UseCheckPersonalAttendance';
import moment from 'moment';
import FloatingButton from '../../components/Button/FloatingButton/FloatingButton';
import { useNavigate } from 'react-router-dom';

const MyCalendar = () => {
  const navigate = useNavigate()
  const [calendar, setCalendar] = useState([])
  const [initilaizingGroupInfo, groupInfo] = useCheckGroup()
  const [initializePersonalAttendance, personalAttendance, attendanceEmpty, scroll, checkPersonalAttendance] = UseCheckPersonalAttendance()
  const [filter, setFilter] = useState('all')

  console.log(calendar)

  const getDateRange = (date) => {
    setCalendar(date)
    if(date.length === 2){
      navigate('/add-calendar', {state: {startDate: date[0], endDate: date[0]}})
    }
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const handleFilter = (type) => {
      if(type === 'all'){
        setFilter('all')
        checkPersonalAttendance('all')
      }else if(type === 'wfh'){
        setFilter('WFH')
        checkPersonalAttendance('wfh')
      }else if(type === 'wfo'){
        setFilter('WFO')
        checkPersonalAttendance('wfo')
      }else if(type === 'sakit'){
        setFilter('Sakit')
        checkPersonalAttendance('sakit')
      }else if(type === 'cuti'){
        setFilter('Cuti')
        checkPersonalAttendance('cuti')
      }
    }
  return (
    <div className='flex flex-col gap-4 h-screen overflow-y-auto scrollable'>
      <TopNavbar
        navbarColor={`bg-blue-500`}
        label={`Kalender`}
        labelColor={`text-white`}
        navigateTo={false}
        rightButton={true}
        rightIcon={
          <svg
            className={`h-6 w-6 text-white`}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />{" "}
            <polyline points="12 8 12 12 14 14" />{" "}
            <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" />
          </svg>
        }
        rightAction={() => navigate("/transactions")}
      />
      
      {initilaizingGroupInfo || initializePersonalAttendance ? 

      <div className='mt-4'>
        <LoadingChip/>
        <LoadingTransaction/>
      </div>
      :
      (groupInfo === false && personalAttendance === "noGroup") ?
        <p className='text-sm text-gray-500 text-center'>-Belum Ada Grup-</p>
      :
      (groupInfo.status === '02' && personalAttendance === 'noAttendance')?
        <p className='text-sm text-gray-500 text-center'>-Menunggu Persetujuan Admin-</p>
      :
      (groupInfo.groupStatus.length > 0 &&  groupInfo.status === '01') ?
      <div>
        <div className='flex w-full justify-center'>
        <style>
            {`
            .react-calendar {
              border-style: none
            }
            .wfo:disabled {
              background-color: #f59e0b;
              color: white;
            }
            .wfh:disabled {
              background-color: #22c55e;
              color: white;
            }
            .cuti:disabled {
              background-color: #6366f1;
              color: white;
            }
            .sakit:disabled {
              background-color: #ef4444;
              color: white;
            }
            `}
          </style>
          <Calendar 
            onChange={(date) => getDateRange(date)} 
            selectRange={true}
            value={new Date()} 
            className={`drop-shadow-lg rounded-md border-none`} 
            tileClassName={({date}) => {
              try{
                if(personalAttendance.find(x => x.addDate === moment(date).format('DD/MM/YYYY')&& x.status === 'WFO')){
                  return `wfo`
                }else if(personalAttendance.find(x => x.addDate === moment(date).format('DD/MM/YYYY')&& x.status === 'WFH')){
                  return 'wfh'
                }else if(personalAttendance.find(x => x.addDate === moment(date).format('DD/MM/YYYY')&& x.status === 'Cuti')){
                  return 'cuti'
                }else if(personalAttendance.find(x => x.addDate === moment(date).format('DD/MM/YYYY')&& x.status === 'Sakit')){
                  return 'sakit'
                }
              }catch(e){
                return ''
              }
            }}
            tileDisabled={({ date }) => personalAttendance.find(x => x.addDate === moment(date).format('DD/MM/YYYY'))}
            minDate={
              new Date()
            }
          />

        </div>
        <div className='flex w-full px-4 py-2 justify-between sticky top-0 bg-gray-100 z-50'>
            <Chip text={'Semua'} enable={filter === "all"} emoji={'📝'} handleClick={() => handleFilter('all')} color={'blue'}/>
            {groupInfo.groupStatus.map((val, index) => 
                <Chip key={index} text={val} enable={val === filter} emoji={val === "WFH"? '🏠': val === "WFO" ? '🏢' : val === 'Sakit' ? '😷' : val === 'Cuti' ? '🏖️' :''} handleClick={() => handleFilter(val === "WFH"? 'wfh': val === "WFO" ? 'wfo' : val === 'Sakit' ? 'sakit' : val === 'Cuti' ? 'cuti' :'')} color={val === "WFH"? 'green': val === "WFO" ? 'amber' : val === 'Sakit' ? 'red' : val === 'Cuti' ? 'indigo' :''}/>
                )}
        </div>     
        <div className='flex flex-col overflow-y-auto h-screen px-4 scrollable' id="scrollableDiv">
          {personalAttendance === 'noAttendance'&&<p className='text-sm text-gray-500 text-center'>-Belum Ada Kehadiran-</p>}
          <ul>
            {personalAttendance !== 'noAttendance'&&
            <InfiniteScroll
                className='dark:border-gray-600 flex flex-col gap-1'
                dataLength={personalAttendance.length}
                next={() => scroll(filter === 'all' ? 'all' : filter === 'WFO' ? 'wfo' : filter === 'WFH' ? 'wfh' : filter === 'Cuti' ? 'cuti' : '' )}
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
                {personalAttendance !== "noAttendance" && personalAttendance.map((val, index) => (
                  <li key={index} className='bg-white px-4 py-2 flex justify-between rounded-lg dark:bg-slate-800 dark:border-gray-600 dark:text-white'>
                      <div className='flex items-center'>                          
                        <div className='flex flex-col'>
                            <span className={`${val.status === 'WFO'? 'bg-amber-500' : val.status ==='WFH'? 'bg-green-500' : val.status === 'Cuti'? 'bg-indigo-500' : val.status === 'Sakit' ? 'bg-red-500': ''} flex justify-center items-center px-3 py-2 font-bold text-sm text-white rounded-full`}>{val.status}</span>
                        </div>
                      </div>
                      <div className='flex flex-col items-end'>
                          <p className='text-sm'>{val.addTime}</p>
                          <p className='text-sm'>{val.addDate}</p>
                      </div>
                  </li>
                ))}
              </InfiniteScroll>
              }
              <div className='h-64'></div>
          </ul>
          <FloatingButton
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            }
            action={'/add-calendar'}
          />
        </div> 
      </div>
      :
      null
      }
    </div>
  )
}

export default MyCalendar