import { collection, doc, getDoc, onSnapshot, query,  where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../../utils/Firebase/Firebase'
import useUserContext from '../UseUserContext/UseUserContext'

const UseCheckAllAttendance = () => {
    const userContext = useUserContext()
    const [allAttendance, setAllAttendance] = useState()
    const [initializeGetAllAttendance, setInitializeGetAllAttendance] = useState(false)
    const getAllAttendance = async() => {
        try{
            setInitializeGetAllAttendance(true)
            const queryGetGroupId = doc(db, 'users', userContext.currentUser.uid)
            const groupInfo = await getDoc(queryGetGroupId)
            if(groupInfo.exists()){
                console.log(groupInfo.data().group[0])
                const attendanceQuery = query(collection(db, 'attendanceInformation'), where('groupId', '==', groupInfo.data().group[0]))
                const unsubscribe = onSnapshot(attendanceQuery, (querySnapshot) => {
                    const attendances = []
                    querySnapshot.forEach((doc) => {
                        attendances.push(doc.data())
                    })
                    setAllAttendance(attendances)
                    setInitializeGetAllAttendance(false)
                })
            }

        }catch(e){
            console.log(e)
        }
    }
    
    useEffect(() => {
        getAllAttendance()
        return () => (
            getAllAttendance()
        )
    }, [])

  return [initializeGetAllAttendance, allAttendance]
}

export default UseCheckAllAttendance