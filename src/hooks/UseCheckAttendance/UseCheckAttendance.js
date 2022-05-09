import { collection, doc, onSnapshot, query,  where } from 'firebase/firestore'
import  { useEffect, useState } from 'react'
import { db } from '../../utils/Firebase/Firebase'
import useUserContext from '../UseUserContext/UseUserContext'

const UseCheckAttendance = (option) => {
    const userContext = useUserContext()
    const uid = userContext.currentUser.uid
    const [initializeAttendance, setInitializeAttendance] = useState(true)
    const [attendanceInfo, setAttandanceInfo] = useState()
    const attendanceData = []

    const checkAttandance = () => {
        try{
            const unsubGetUser = onSnapshot(doc(db, 'users', uid), (docAccountInfo)=> {
                if(docAccountInfo.data().group){
                    const unsubGetGroup = onSnapshot(doc(db, 'groupInformation', docAccountInfo.data().group[0]), (doc)=>{
                        const groupMember = doc.data().groupMember
                        const personalGroup = groupMember.find(o => o.userId === uid )
                        if(personalGroup.status === '01'){
                            if(option === 'now'){
                                const attendanceNowQuery = query(collection(db, 'attendanceInformation'), where('groupId', '==', docAccountInfo.data().group[0]), where('addDate', '==', new Date(Date.now()).toLocaleDateString()))
                                const unsubGetAttendance = onSnapshot(attendanceNowQuery, (attendance)=> {
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
                                return unsubGetAttendance
                            }else if(option === "all"){
                                const attendanceAllQuery = query(collection(db, 'attendanceInformation'), where('groupId', '==', docAccountInfo.data().group[0]))
                                const usubGetAttendance = onSnapshot(attendanceAllQuery, (attendance)=> {
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
                    return unsubGetGroup


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