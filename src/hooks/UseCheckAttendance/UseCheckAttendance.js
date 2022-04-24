import { collection, doc, limit, onSnapshot, query, Timestamp, where } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider/AuthProvider'
import { db } from '../../utils/Firebase/Firebase'

const UseCheckAttendance = (uid, option) => {
    const [initializeAttendance, setInitializeAttendance] = useState(true)
    const [attendanceInfo, setAttandanceInfo] = useState()

    const checkAttandance = () => {
        try{
            const unsubGetUser = onSnapshot(doc(db, 'users', uid), (docAccountInfo)=> {
                if(docAccountInfo.data().group){
                    if(option === 'now'){
                        const q = query(collection(db, 'attendanceInformation'), where('groupId', '==', docAccountInfo.data().group[0]), where('addDate', '==', new Date(Date.now()).toLocaleDateString()))
                        const usubGetAttendance = onSnapshot(q, (attendance)=> {
                                const attendanceData = []
                                attendance.forEach((doc) => {
                                    attendanceData.push(doc.data());
                                });
                                if(attendanceData.length > 0){
                                    setAttandanceInfo(attendanceData)
                                }else{
                                    setAttandanceInfo('noAttendance')
                                }
                                setInitializeAttendance(false)
                            }
    
                        )
                        return usubGetAttendance
                    }else if(option === "all"){
                        const q = query(collection(db, 'attendanceInformation'), where('groupId', '==', docAccountInfo.data().group[0]))
                        const usubGetAttendance = onSnapshot(q, (attendance)=> {
                                const attendanceData = []
                                attendance.forEach((doc) => {
                                    attendanceData.push(doc.data());
                                });
                                if(attendanceData.length > 0){
                                    setAttandanceInfo(attendanceData)
                                }else{
                                    setAttandanceInfo('noAttendance')
                                }
                                setInitializeAttendance(false)
                            }
    
                        )
                        return usubGetAttendance
                    }
                }else{
                    setAttandanceInfo('noGroup')
                    setInitializeAttendance(false)
                }
            })
            return unsubGetUser
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