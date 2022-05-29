import { collection, doc, getDoc, limit, onSnapshot, query,  where, startAfter, orderBy } from 'firebase/firestore'
import  { useEffect, useState } from 'react'
import { db } from '../../utils/Firebase/Firebase'
import useUserContext from '../UseUserContext/UseUserContext'

const UseCheckAttendance = () => {
    const userContext = useUserContext()
    const uid = userContext.currentUser.uid
    const [initializeAttendance, setInitializeAttendance] = useState(false)
    const [initializeAttendanceMore, setInitializeAttendanceMore] = useState(false)
    const [attendanceInfo, setAttandanceInfo] = useState([])
    const [lastvisibility, setlastvisibility] = useState();
    const [attendanceEmpty, setAttendanceEmpty] = useState(false)
    const attendanceData = []

    const checkAttandance = async (type) => {
        try{
            setInitializeAttendance(true)
            const docRef = doc(db, "users", uid)
            const docSnap = await getDoc(docRef)
            let attendanceNowQuery;
                if(docSnap.data().group){
                    if(type === 'all'){
                        attendanceNowQuery = query(collection(db, 'attendanceInformation'), where('groupId', '==', docSnap.data().group[0]), where('addDate', '==', new Date(Date.now()).toLocaleDateString()), orderBy('timestamp', 'desc'), limit(10))
                    }else if(type === 'wfh'){
                        attendanceNowQuery = query(collection(db, 'attendanceInformation'), where('groupId', '==', docSnap.data().group[0]), where('addDate', '==', new Date(Date.now()).toLocaleDateString()), where('status', '==', 'WFH'), orderBy('timestamp', 'desc'), limit(10))
                    }else if(type === 'wfo'){
                        attendanceNowQuery = query(collection(db, 'attendanceInformation'), where('groupId', '==', docSnap.data().group[0]), where('addDate', '==', new Date(Date.now()).toLocaleDateString()), where('status', '==', 'WFO'), orderBy('timestamp', 'desc'), limit(10))
                    }else if(type === 'cuti'){
                        attendanceNowQuery = query(collection(db, 'attendanceInformation'), where('groupId', '==', docSnap.data().group[0]), where('addDate', '==', new Date(Date.now()).toLocaleDateString()), where('status', '==', 'Cuti'), orderBy('timestamp', 'desc'), limit(10))
                    }else if(type === 'sakit'){
                        attendanceNowQuery = query(collection(db, 'attendanceInformation'), where('groupId', '==', docSnap.data().group[0]), where('addDate', '==', new Date(Date.now()).toLocaleDateString()), where('status', '==', 'Sakit'), orderBy('timestamp', 'desc'), limit(10))
                    }
                    const unsubGetAttendance = onSnapshot(attendanceNowQuery, (attendance)=> {
                        attendance.forEach((doc) => {
                            attendanceData.push({id: doc.id, ...doc.data()});
                        });
                        if(attendanceData.length > 0){
                            setAttandanceInfo(attendanceData)
                            setlastvisibility(attendance.docs[attendance.docs.length-1])
                            setInitializeAttendance(false)
                            unsubGetAttendance()
                        }else{
                            setAttandanceInfo('noAttendance')
                            setInitializeAttendance(false)
                            unsubGetAttendance()
                        }
                    }, (error) => {
                        console.log(error)
                    }
                )                       
                }else{
                    setAttandanceInfo('noGroup')
                    setInitializeAttendance(false)
                }
        }catch (e){
            console.log(e)
        }
    }
    
    useEffect(()=> {
        checkAttandance('all')
        return () => (
            checkAttandance('all')
        )
    }, [])

const updateData = (attendance) => {
    const isAttendanceEmpty = attendance.size === 0
    if(!isAttendanceEmpty){
        attendance.forEach((doc) => {
            attendanceData.push({id: doc.id, ...doc.data()});
        });
        setlastvisibility(attendance.docs[attendance.docs.length-1])
        setAttandanceInfo((listAttendance) => [...listAttendance, ...attendanceData])
    }else{
        setAttendanceEmpty(true)
    }
}

const scroll = async(type) => {
    try{
        setInitializeAttendanceMore(true)
        const docRef = doc(db, "users", uid)
        const docSnap = await getDoc(docRef)
        let attendanceNowQuery;
        if(type === 'all'){
            attendanceNowQuery = query(collection(db, 'attendanceInformation'), where('groupId', '==', docSnap.data().group[0]), where('addDate', '==', new Date(Date.now()).toLocaleDateString()), orderBy('timestamp', 'desc'), startAfter(lastvisibility), limit(1))
        }else if(type === 'wfo'){
            attendanceNowQuery = query(collection(db, 'attendanceInformation'), where('groupId', '==', docSnap.data().group[0]), where('addDate', '==', new Date(Date.now()).toLocaleDateString()), where('status', '==', 'WFO'), orderBy('timestamp', 'desc'), startAfter(lastvisibility), limit(1))
        }else if(type === 'wfh'){
            attendanceNowQuery = query(collection(db, 'attendanceInformation'), where('groupId', '==', docSnap.data().group[0]), where('addDate', '==', new Date(Date.now()).toLocaleDateString()), where('status', '==', 'WFH'), orderBy('timestamp', 'desc'), startAfter(lastvisibility), limit(1))
        }else if(type === 'cuti'){
            attendanceNowQuery = query(collection(db, 'attendanceInformation'), where('groupId', '==', docSnap.data().group[0]), where('addDate', '==', new Date(Date.now()).toLocaleDateString()), where('status', '==', 'Cuti'), orderBy('timestamp', 'desc'), startAfter(lastvisibility), limit(1))
        }else if(type === 'sakit'){
            attendanceNowQuery = query(collection(db, 'attendanceInformation'), where('groupId', '==', docSnap.data().group[0]), where('addDate', '==', new Date(Date.now()).toLocaleDateString()), where('status', '==', 'Sakit'), orderBy('timestamp', 'desc'), startAfter(lastvisibility), limit(1))           
        }
        const unsubGetAttendance = onSnapshot(attendanceNowQuery, (attendance)=> {
            updateData(attendance)
            setInitializeAttendanceMore(false)
            unsubGetAttendance()

        }, (error) => {
            console.log(error)
        })
    }catch (e){
        console.log(e)
    }
}

  return [initializeAttendance, initializeAttendanceMore, attendanceInfo, attendanceEmpty, scroll, checkAttandance]
}

export default UseCheckAttendance