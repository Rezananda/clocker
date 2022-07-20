import { collection, doc, getDoc, limit, onSnapshot, orderBy, query,  startAfter,  where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../../utils/Firebase/Firebase'
import useUserContext from '../UseUserContext/UseUserContext'

const UseCheckAllAttendance = () => {
    const userContext = useUserContext()
    const [initializeGetAllAttendance, setInitializeGetAllAttendance] = useState(false)
    const [allAttendance, setAllAttendance] = useState([])
    const [attendanceEmpty, setAttendanceEmpty] = useState(false)
    const [lastvisibility, setlastvisibility] = useState();
    const attendances = []
    
    const getAllAttendance = async(type) => {
        try{
            setInitializeGetAllAttendance(true)
            const docRef = doc(db, 'users', userContext.currentUser.uid)
            const unsubGetGroup = onSnapshot(docRef, async(docSnap) => {
                if(docSnap.data().group){
                    let queryAttendance;
                    if(type === 'all'){
                        queryAttendance = query(collection(db, 'attendanceInformation'), where('groupId', '==', docSnap.data().group[0]), orderBy('timestamp', 'desc'), limit(10))
                    }
                    const unsubGetAttendance = onSnapshot(queryAttendance, (querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            attendances.push({id: doc.id, ...doc.data()})
                        })

                        if(attendances.length > 0){
                            setAllAttendance(attendances)
                            setlastvisibility(querySnapshot.docs[querySnapshot.docs.length-1])
                            setInitializeGetAllAttendance(false)
                            unsubGetAttendance()
                        }else {
                            setAllAttendance('noAttendance')
                            setInitializeGetAllAttendance(false)
                            unsubGetAttendance()
                        }
                    })
                }
            })

        }catch(e){
            console.log(e)
        }
    }
    
    useEffect(() => {
        getAllAttendance('all')
        return () => (
            getAllAttendance('all')
        )
    }, [])

    const updateData = (attendance) => {
        const isAttendanceEmpty = attendance.size === 0
        if(!isAttendanceEmpty){
            attendance.forEach((doc) => {
                attendances.push({id: doc.id, ...doc.data()});
            });
            setlastvisibility(attendance.docs[attendance.docs.length-1])
            setAllAttendance((listAttendance) => [...listAttendance, ...attendances])
        }else{
            setAttendanceEmpty(true)
        }
    }

    const scroll = async(type) => {
        try{
            const docRef = doc(db, "users", userContext.currentUser.uid)
            const docSnap = await getDoc(docRef)
            let queryAttendance;
            if(type === 'all'){
                queryAttendance = query(collection(db, 'attendanceInformation'), where('groupId', '==', docSnap.data().group[0]), orderBy('timestamp', 'desc'), startAfter(lastvisibility), limit(10))
            }
            const unsubGetAttendance = onSnapshot(queryAttendance, (attendance)=> {
                updateData(attendance)
                unsubGetAttendance()
            })
        }catch (e){
            console.log(e)
        }
    }

  return [initializeGetAllAttendance, allAttendance, attendanceEmpty, scroll, getAllAttendance]
}

export default UseCheckAllAttendance