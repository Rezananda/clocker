import { collection, doc, onSnapshot, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../utils/Firebase/Firebase'

const UseCheckPersonalAttendance = (uid) => {
    const [initializePersonalAttendance, setInitializePersonalAttendance] = useState(true)
    const [personalAttendance, setPersonalAttendance] = useState()

    const checkPersonalAttendance = () => {
            const unsubGetUser = onSnapshot(doc(db, 'users', uid), (docAccountInfo)=> {
                try{
                    const q = query(collection(db, 'attendanceInformation'), where('groupId', '==', docAccountInfo.data().group[0]), where('userId', '==', docAccountInfo.id))
                    const usubGetAttendance = onSnapshot(q, (attendance)=> {
                            const attendanceData = []
                            attendance.forEach((doc) => {
                                attendanceData.push(doc.data());
                            });
                            setPersonalAttendance(attendanceData)
                            setInitializePersonalAttendance(false)
                        }
                    )
                    return usubGetAttendance
                }catch(e){
                    console.log(e)
                }
                
            })
            return unsubGetUser
    }

    useEffect(()=> {
        const getAttendance = checkPersonalAttendance()
        return getAttendance
    }, [])

  return [initializePersonalAttendance, personalAttendance]
}

export default UseCheckPersonalAttendance