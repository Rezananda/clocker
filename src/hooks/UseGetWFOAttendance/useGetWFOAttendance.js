import { collection, doc, getDoc, getDocs, limit, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../utils/Firebase/Firebase'
import useUserContext from '../UseUserContext/UseUserContext'

const useGetWFOAttendance = () => {
    const userContext = useUserContext()
    const uid = userContext.currentUser.uid
    const [initializeGetWFOAttendance, setInitializeGetWFOAttendance] = useState(false)
    const [wfoAttendance, setWfoAttendance] = useState([])
    const attendances = []

    const getWFOAttendance = async() => {
        try {          
            setInitializeGetWFOAttendance(true)  
            const docRef = doc(db, "users", uid)
            const docSnap = await getDoc(docRef)
            if(docSnap.data().group[0]){
                const queryGetAttendance = query(collection(db, 'attendanceInformation'), where('groupId', '==', docSnap.data().group[0]), where('userId', '==', docSnap.id), where('status', '==', 'WFO'), orderBy('timestamp', 'desc'), limit(1))
                const attendance = await getDocs(queryGetAttendance)
    
                attendance.forEach((doc) => {
                    attendances.push({id: doc.id, ...doc.data()})
                })
                if(attendances.length === 1){
                    setWfoAttendance(attendances)
                    setInitializeGetWFOAttendance(false)
                }else{
                    setWfoAttendance('noAttendance')
                    setInitializeGetWFOAttendance(false)
                }
            }else{
                setWfoAttendance('noGroup')
                setInitializeGetWFOAttendance(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getWFOAttendance()
    }, [])

  return [initializeGetWFOAttendance, wfoAttendance]
}

export default useGetWFOAttendance