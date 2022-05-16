import { collection, doc, getDoc, onSnapshot, query,  where } from 'firebase/firestore'
import  { useEffect, useState } from 'react'
import { db } from '../../utils/Firebase/Firebase'
import useUserContext from '../UseUserContext/UseUserContext'

const UseCheckAttendance = () => {
    const userContext = useUserContext()
    const uid = userContext.currentUser.uid
    const [initializeAttendance, setInitializeAttendance] = useState(true)
    const [attendanceInfo, setAttandanceInfo] = useState()
    const attendanceData = []

    const checkAttandance = async () => {
        try{
            const docRef = doc(db, "users", uid)
            const docSnap = await getDoc(docRef)
                if(docSnap.data().group){
                    const attendanceNowQuery = query(collection(db, 'attendanceInformation'), where('groupId', '==', docSnap.data().group[0]), where('addDate', '==', new Date(Date.now()).toLocaleDateString()))
                    const unsubGetAttendance = onSnapshot(attendanceNowQuery, (attendance)=> {
                            attendance.forEach((doc) => {
                                attendanceData.push(doc.data());
                            });
                            if(attendanceData.length > 0){
                                setAttandanceInfo(attendanceData)
                                setInitializeAttendance(false)
                            }else{
                                setAttandanceInfo('noAttendance')
                                setInitializeAttendance(false)
                            }
                        }

                    )
                    return unsubGetAttendance
                }else{
                    setAttandanceInfo('noGroup')
                    setInitializeAttendance(false)
                }
        }catch (e){
            console.log(e)
        }
    }
    
    useEffect(()=> {
        const getAttendance = checkAttandance()
        return getAttendance
    }, [])

  return [initializeAttendance, attendanceInfo]
}

export default UseCheckAttendance