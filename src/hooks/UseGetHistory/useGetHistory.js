import { collection, doc, getDoc, onSnapshot, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../utils/Firebase/Firebase'
import useUserContext from '../UseUserContext/UseUserContext'

const useGetHistory = () => {
    const userContext = useUserContext()
    const uid = userContext.currentUser.uid
    const [initializeHistory, setInitializeHistory] = useState(true)
    const [historyData, setHistoryData] = useState()
    const historys = []

    const getHistory = async() => {
        const historyQuery = query(collection(db, 'transactionInformation'), where('userId', '==', uid))
        const unsubGetAttendance = onSnapshot(historyQuery, (history)=> {
            history.forEach((doc) => {
                historys.push(doc.data());
            });
            if(historys.length > 0){
                setHistoryData(historys)
                setInitializeHistory(false)
            }else{
                setHistoryData('noHistory')
                setInitializeHistory(false)
            }
        }

        )
        return unsubGetAttendance

    }

    useEffect(() => {
        const getAttendance = getHistory()
        return getAttendance
    }, [])
    

  return [historyData, initializeHistory]
}

export default useGetHistory