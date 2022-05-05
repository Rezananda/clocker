import { collection, doc, onSnapshot, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../../utils/Firebase/Firebase'
import useUserContext from '../UseUserContext/UseUserContext'

const UseCheckPersonalAttendance = () => {
    const userContext = useUserContext()
    const uid = userContext.currentUser.uid
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
                    setPersonalAttendance(false)
                    setInitializePersonalAttendance(false)
                }
                
            })
            return unsubGetUser
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