import { collection, limit, onSnapshot, orderBy, query, startAfter, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../utils/Firebase/Firebase'
import useUserContext from '../UseUserContext/UseUserContext'

const useGetCalender = () => {
    const userContext = useUserContext()
    const uid = userContext.currentUser.uid
    const [calenderData, getCalenderData] = useState([])
    const [initializeCalenderData, getInitializeCalenderData] = useState(false)
    const [initializeAttendanceMore, setInitializeAttendanceMore] = useState(false)
    const [lastvisibility, setlastvisibility] = useState();
    const [attendanceEmpty, setAttendanceEmpty] = useState(false)
    const calenders = []

    const handleGetCalenderData = () => {
        getInitializeCalenderData(true)
        const calenderQuery = query(collection(db, 'attendanceInformation'), where('status', '==', 'Cuti'), where('userId', '==', uid), orderBy('timestamp', 'desc'), limit(2))
        const unsubGetCalenderData = onSnapshot(calenderQuery, (calender)=> {
            calender.forEach((doc) => {
                calenders.push({id: doc.id, ...doc.data()});
            });
            if(calenders.length > 0){
                getCalenderData(calenders)
                setlastvisibility(calender.docs[calender.docs.length-1])
                getInitializeCalenderData(false)
                unsubGetCalenderData()
            }else{
                getCalenderData('noCalender')
                getInitializeCalenderData(false)
                unsubGetCalenderData()
            }
        })
    }

    useEffect(() => {
        handleGetCalenderData()
      return () => {
        handleGetCalenderData()
      }
    }, [])

    const updateData = (calender) => {
      const isAttendanceEmpty = calender.size === 0
      if(!isAttendanceEmpty){
          calender.forEach((doc) => {
              calenders.push({id: doc.id, ...doc.data()});
          });
          setlastvisibility(calender.docs[calender.docs.length-1])
          getCalenderData((listAttendance) => [...listAttendance, ...calenders])
      }else{
          setAttendanceEmpty(true)
      }
  }

    const scroll = async() => {
      try{
          setInitializeAttendanceMore(true)
          const calenderQuery = query(collection(db, 'attendanceInformation'), where('status', '==', 'Cuti'), where('userId', '==', uid), orderBy('timestamp', 'desc'),startAfter(lastvisibility), limit(2))
          const unsubGetAttendance = onSnapshot(calenderQuery, (calender)=> {
              updateData(calender)
              setInitializeAttendanceMore(false)
              unsubGetAttendance()
          })
      }catch (e){
          console.log(e)
      }
  }
    
  return [calenderData, initializeCalenderData, initializeAttendanceMore, attendanceEmpty, scroll]
}

export default useGetCalender