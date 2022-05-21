import { collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../../utils/Firebase/Firebase'
import useUserContext from '../UseUserContext/UseUserContext'

const UseCheckPersonalAttendance = () => {
    const userContext = useUserContext()
    const uid = userContext.currentUser.uid
    const [initializePersonalAttendance, setInitializePersonalAttendance] = useState(true)
    const [personalAttendance, setPersonalAttendance] = useState()

    const checkPersonalAttendance = async() => {
        try{
            const docRef = doc(db, "users", uid)
            const docSnap = await getDoc(docRef)
            const q = query(collection(db, 'attendanceInformation'), where('groupId', '==', docSnap.data().group[0]), where('userId', '==', docSnap.id))
            const unsubGetAttendance = onSnapshot(q, (attendance)=> {
                const attendanceData = []
                attendance.forEach((doc) => {
                    attendanceData.push(doc.data());
                });
                setPersonalAttendance(attendanceData)
                setInitializePersonalAttendance(false)
                unsubGetAttendance()
            }, (error) => {
                setPersonalAttendance(false)
                setInitializePersonalAttendance(false)
                unsubGetAttendance()
            })
        }catch(e){
            setPersonalAttendance(false)
            setInitializePersonalAttendance(false)
        }
    }

    useEffect(()=> {
        let isMounted = true;
        if(isMounted){
            checkPersonalAttendance()
        }
        return () => {
            isMounted = false
        }
    }, [])

  return [initializePersonalAttendance, personalAttendance]
}

export default UseCheckPersonalAttendance