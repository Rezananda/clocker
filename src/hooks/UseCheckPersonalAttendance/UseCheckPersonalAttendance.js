import { collection, doc, getDoc, limit, onSnapshot, orderBy, query, startAfter, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../../utils/Firebase/Firebase'
import useUserContext from '../UseUserContext/UseUserContext'

const UseCheckPersonalAttendance = () => {
    const userContext = useUserContext()
    const uid = userContext.currentUser.uid
    const [initializePersonalAttendance, setInitializePersonalAttendance] = useState(false)
    const [lastvisibility, setlastvisibility] = useState();
    const [attendanceEmpty, setAttendanceEmpty] = useState(false)
    const [personalAttendance, setPersonalAttendance] = useState([])
    const attendanceData = []

    const checkPersonalAttendance = async(type) => {
        try{
            setInitializePersonalAttendance(true)
            const docRef = doc(db, "users", uid)
            // const docSnap = await getDoc(docRef)
            const unsubGetUser = onSnapshot(docRef, async(docSnap) => {
            let queryAttendance;
            if(docSnap.data().group){                
                if(type === 'all'){
                    queryAttendance = query(collection(db, 'attendanceInformation'), where('groupId', '==', docSnap.data().group[0]), where('userId', '==', docSnap.id), orderBy('timestamp', 'desc'), limit(15))
                }else if(type === 'wfo'){
                    queryAttendance = query(collection(db, 'attendanceInformation'), where('groupId', '==', docSnap.data().group[0]), where('userId', '==', docSnap.id), where('status', '==', 'WFO'), orderBy('timestamp', 'desc'), limit(10))
                }else if(type === 'wfh'){
                    queryAttendance = query(collection(db, 'attendanceInformation'), where('groupId', '==', docSnap.data().group[0]), where('userId', '==', docSnap.id), where('status', '==', 'WFH'), orderBy('timestamp', 'desc'), limit(10))
                }else if(type === 'cuti'){
                    queryAttendance = query(collection(db, 'attendanceInformation'), where('groupId', '==', docSnap.data().group[0]), where('userId', '==', docSnap.id), where('status', '==', 'Cuti'), orderBy('timestamp', 'desc'), limit(10))
                }else if(type === 'sakit'){
                    queryAttendance = query(collection(db, 'attendanceInformation'), where('groupId', '==', docSnap.data().group[0]), where('userId', '==', docSnap.id), where('status', '==', 'Sakit'), orderBy('timestamp', 'desc'), limit(10))
                }
                const unsubGetAttendance = onSnapshot(queryAttendance, (attendance)=> {
                    attendance.forEach((doc) => {
                        attendanceData.push({id: doc.id, ...doc.data()});
                    });
                    if(attendanceData.length > 0){
                        setPersonalAttendance(attendanceData)
                        setlastvisibility(attendance.docs[attendance.docs.length-1])
                        setInitializePersonalAttendance(false)
                        unsubGetAttendance()
                    }else {
                        setPersonalAttendance('noAttendance')
                        setInitializePersonalAttendance(false)
                        unsubGetAttendance()
                    }
                })
            }else {
                setPersonalAttendance('noGroup')
                setInitializePersonalAttendance(false)
            }})
            return unsubGetUser
        }catch(e){
            console.log(e)
            setPersonalAttendance(false)
            setInitializePersonalAttendance(false)
        }
    }

    useEffect(()=> {
        checkPersonalAttendance('all')
        return () => (
            checkPersonalAttendance('all')
        )
    }, [])
    
    const updateData = (attendance) => {
        const isAttendanceEmpty = attendance.size === 0
        if(!isAttendanceEmpty){
            attendance.forEach((doc) => {
                attendanceData.push({id: doc.id, ...doc.data()});
            });
            setlastvisibility(attendance.docs[attendance.docs.length-1])
            setPersonalAttendance((listAttendance) => [...listAttendance, ...attendanceData])
        }else{
            setAttendanceEmpty(true)
        }
    }
    
    const scroll = async(type) => {
        try{
            const docRef = doc(db, "users", uid)
            const docSnap = await getDoc(docRef)
            let queryAttendance;
            if(type === 'all'){
                queryAttendance = query(collection(db, 'attendanceInformation'), where('groupId', '==', docSnap.data().group[0]), where('userId', '==', docSnap.id), orderBy('timestamp', 'desc'), startAfter(lastvisibility), limit(15))
            }else if(type === 'wfo'){
                queryAttendance = query(collection(db, 'attendanceInformation'), where('groupId', '==', docSnap.data().group[0]), where('userId', '==', docSnap.id), where('status', '==', 'WFO'), orderBy('timestamp', 'desc'), startAfter(lastvisibility), limit(10))
            }else if(type === 'wfh'){
                queryAttendance = query(collection(db, 'attendanceInformation'), where('groupId', '==', docSnap.data().group[0]), where('userId', '==', docSnap.id), where('status', '==', 'WFH'), orderBy('timestamp', 'desc'), startAfter(lastvisibility), limit(10))
            }else if(type === 'cuti'){
                queryAttendance = query(collection(db, 'attendanceInformation'), where('groupId', '==', docSnap.data().group[0]), where('userId', '==', docSnap.id), where('status', '==', 'Cuti'), orderBy('timestamp', 'desc'), startAfter(lastvisibility), limit(10))
            }else if(type === 'sakit'){
                queryAttendance = query(collection(db, 'attendanceInformation'), where('groupId', '==', docSnap.data().group[0]), where('userId', '==', docSnap.id), where('status', '==', 'Sakit'), orderBy('timestamp', 'desc'), startAfter(lastvisibility), limit(10))
            }
            const unsubGetAttendance = onSnapshot(queryAttendance, (attendance)=> {
                updateData(attendance)
                unsubGetAttendance()
            })
        }catch (e){
            console.log(e)
        }
    }

  return [initializePersonalAttendance, personalAttendance, attendanceEmpty, scroll, checkPersonalAttendance]
}

export default UseCheckPersonalAttendance