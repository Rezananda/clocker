import { collection, doc, onSnapshot, orderBy, query, Timestamp, where } from 'firebase/firestore'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { db } from '../../utils/Firebase/Firebase'
import useUserContext from '../UseUserContext/UseUserContext'

const useGetCurrentAttendance = () => {
    const userContext = useUserContext()
    const uid = userContext.currentUser.uid
    const [initializeCurrentAttendance, setInitializeCurrentAttendance] = useState(false)
    const [currentAttendance, setCurrentAttendance] = useState()
    const attendances = []

    const getCurrentAttendance = () => {
        try {
            setInitializeCurrentAttendance(true)
            const docRef = doc(db, 'users', uid)
            const unsubscribe = onSnapshot(docRef, async(docSnap) => {
                if(docSnap.data().group){
                    const queryAttendance = query(collection(db, 'attendanceInformation'), where('groupId', '==', docSnap.data().group[0]), where('addDate', '==', moment(Timestamp.now().toDate()).format('DD/MM/YYYY'), orderBy('timestamp', 'desc')))
                    const unsubscribeCurrentAttendance = onSnapshot(queryAttendance, (querySnapShot) => {
                        querySnapShot.forEach((doc) => {
                            attendances.push({id: doc.id, ...doc.data()});
                        })
                    if(attendances.length > 0){
                        setCurrentAttendance(attendances)
                        setInitializeCurrentAttendance(false)
                    }else{
                        setCurrentAttendance('notAttendance')
                        setInitializeCurrentAttendance(false)
                    }
                    })
                }
            })
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCurrentAttendance()
        return () => (
            getCurrentAttendance()
        )
    }, [])

  return [initializeCurrentAttendance, currentAttendance]
}

export default useGetCurrentAttendance