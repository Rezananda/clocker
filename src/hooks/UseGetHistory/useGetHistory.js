import { collection, limit, onSnapshot, orderBy, query, startAfter, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../utils/Firebase/Firebase'
import useUserContext from '../UseUserContext/UseUserContext'

const useGetHistory = () => {
    const userContext = useUserContext()
    const uid = userContext.currentUser.uid
    const [initializeHistory, setInitializeHistory] = useState(false)
    const [initializeHistoryMore, setInitializeHistoryMore] = useState(false)
    const [historyEmpty, setHistoryEmpty] = useState(false)
    const [lastvisibility, setlastvisibility] = useState();
    const [historyData, setHistoryData] = useState([])
    const historys = []

    const getHistory = async() => {
        setInitializeHistory(true)
        const historyQuery = query(collection(db, 'transactionInformation'), where('userId', '==', uid), orderBy('date'), limit(5))
        const unsubGetAttendance = onSnapshot(historyQuery, (history)=> {
            history.forEach((doc) => {
                historys.push({id: doc.id, ...doc.data()});
            });
            if(historys.length > 0){
                setHistoryData(historys)
                setlastvisibility(history.docs[history.docs.length-1])
                setInitializeHistory(false)
                unsubGetAttendance()
            }else{
                setHistoryData('noHistory')
                setInitializeHistory(false)
                unsubGetAttendance()
            }
        }
        )
    }

    useEffect(() => {
        const getAttendance = getHistory()
        return getAttendance
    }, [])
    
    const updateData = (history) => {
        const isHistoryEmpty = history.size === 0
        if(!isHistoryEmpty){
            history.forEach((doc) => {
                historys.push({id: doc.id, ...doc.data()});
            });
            setlastvisibility(history.docs[history.docs.length-1])
            setHistoryData((listHistory) => [...listHistory, ...historys])
        }else{
            setHistoryEmpty(true)
        }
    }

    const scroll = async() => {
        try{
            setInitializeHistoryMore(true)
            const historyQuery = query(collection(db, 'transactionInformation'), where('userId', '==', uid), orderBy('date'), startAfter(lastvisibility), limit(5))
            const unsubGetAttendance = onSnapshot(historyQuery, (history)=> {
                updateData(history)
                setInitializeHistoryMore(false)
                unsubGetAttendance()
            }, (error) => {
                console.log(error)
            })
        }catch (e){
            console.log(e)
        }
    }

  return [historyData, historyEmpty, initializeHistory, initializeHistoryMore, scroll]
}

export default useGetHistory