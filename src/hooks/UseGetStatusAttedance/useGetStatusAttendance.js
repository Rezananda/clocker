import { collection, doc, getDoc, getDocs, query, Timestamp, where } from 'firebase/firestore'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { db } from '../../utils/Firebase/Firebase'
import useUserContext from '../UseUserContext/UseUserContext'

const useGetStatusAttendance = () => {
    const userContext = useUserContext()
    const uid = userContext.currentUser.uid
    const [initializeGetStatusAttendance, setInitializeGetStatusAttendance] = useState(false)
    const [statusAttendance, setStatusAttendance] = useState()

    const getStatusAttendance = async() => {
       setInitializeGetStatusAttendance(true)
        try {
            const docRef = doc(db, "users", uid)
            const docSnap = await getDoc(docRef)
            if(docSnap.data().group[0]){
              const queryGetStatusAttendance = query(collection(db, 'attendanceInformation'), where('groupId', '==', docSnap.data().group[0]), where('userId', '==', docSnap.id), where('addDate', '==', moment(Timestamp.now().toDate()).format('DD/MM/YYYY')))
              const queryGetStatusAttendanceSnapshot = await getDocs(queryGetStatusAttendance)
  
              queryGetStatusAttendanceSnapshot.forEach((doc)=> (
                  setStatusAttendance({id: doc.id, ...doc.data()})
              ))
              setInitializeGetStatusAttendance(false)
            }else{
              setStatusAttendance('noGroup')
              setInitializeGetStatusAttendance(false)
            }
        } catch (error) {
          setStatusAttendance('noGroup')
          setInitializeGetStatusAttendance(false)
        }
    }

    useEffect(() => {
      getStatusAttendance()
    
      return () => {
        getStatusAttendance()
      }
    }, [])
    

  return [initializeGetStatusAttendance, statusAttendance]
}

export default useGetStatusAttendance