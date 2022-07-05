import { collection, limit, onSnapshot, orderBy, query, startAfter, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../utils/Firebase/Firebase'
import useUserContext from '../UseUserContext/UseUserContext'

const useGetHistory = () => {
    const userContext = useUserContext()
    const uid = userContext.currentUser.uid
    const [initializeHistory, setInitializeHistory] = useState(false)
    const [historyEmpty, setHistoryEmpty] = useState(false)
    const [lastvisibility, setlastvisibility] = useState();
    const [historyData, setHistoryData] = useState([])
    const historys = []

    const getHistory = async(type) => {
        setInitializeHistory(true)
        let historyQuery;
        if(type === 'all'){
            historyQuery = query(collection(db, 'transactionInformation'), where('userId', '==', uid), orderBy('date', 'desc'), limit(15))
        }else if(type === 'tambah'){
            historyQuery = query(collection(db, 'transactionInformation'), where('userId', '==', uid), where('transactionType', '==', 'add'), orderBy('date', 'desc'), limit(15))
        }else if(type === 'ubah'){
            historyQuery = query(collection(db, 'transactionInformation'), where('userId', '==', uid), where('transactionType', '==', 'update'), orderBy('date', 'desc'), limit(15))
        }else if(type === 'join group'){
            historyQuery = query(collection(db, 'transactionInformation'), where('userId', '==', uid), where('transaction', '==', 'join group'), orderBy('date', 'desc'), limit(15))
        }else if(type === 'add group'){
            historyQuery = query(collection(db, 'transactionInformation'), where('userId', '==', uid), where('transaction', '==', 'add group'), orderBy('date', 'desc'), limit(15))
        }else if(type === 'attendance'){
            historyQuery = query(collection(db, 'transactionInformation'), where('userId', '==', uid), where('transaction', '==', 'attendance'), orderBy('date', 'desc'), limit(15))
        }else if(type === 'approve group'){
            historyQuery = query(collection(db, 'transactionInformation'), where('userId', '==', uid), where('transaction', '==', 'approve group'), orderBy('date', 'desc'), limit(15))
        }
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
        const getAttendance = getHistory('all')
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

    const scroll = async(type) => {
        try{
            let historyQuery;
            if(type === 'all'){
                historyQuery = query(collection(db, 'transactionInformation'), where('userId', '==', uid), orderBy('date', 'desc'), startAfter(lastvisibility), limit(15))
            }else if(type === 'tambah'){
                historyQuery = query(collection(db, 'transactionInformation'), where('userId', '==', uid), where('transactionType', '==', 'add'), orderBy('date', 'desc'), startAfter(lastvisibility), limit(15))               
            }else if(type === 'ubah'){
                historyQuery = query(collection(db, 'transactionInformation'), where('userId', '==', uid), where('transactionType', '==', 'update'), orderBy('date', 'desc'), startAfter(lastvisibility), limit(15))               
            }else if(type === 'join group'){
                historyQuery = query(collection(db, 'transactionInformation'), where('userId', '==', uid), where('transaction', '==', 'join group'), orderBy('date', 'desc'), startAfter(lastvisibility), limit(15))
            }else if(type === 'add group'){
                historyQuery = query(collection(db, 'transactionInformation'), where('userId', '==', uid), where('transaction', '==', 'add group'), orderBy('date', 'desc'), startAfter(lastvisibility), limit(15))
            }else if(type === 'attendance'){
                historyQuery = query(collection(db, 'transactionInformation'), where('userId', '==', uid), where('transaction', '==', 'attendance'), orderBy('date', 'desc'), startAfter(lastvisibility), limit(15))
            }else if(type === 'approve group'){
                historyQuery = query(collection(db, 'transactionInformation'), where('userId', '==', uid), where('transaction', '==', 'approve group'), orderBy('date', 'desc'), startAfter(lastvisibility), limit(15))
            }            
            const unsubGetAttendance = onSnapshot(historyQuery, (history)=> {
                updateData(history)
                unsubGetAttendance()
            }, (error) => {
                console.log(error)
            })
        }catch (e){
            console.log(e)
        }
    }

  return [historyData, historyEmpty, initializeHistory,  scroll, getHistory]
}

export default useGetHistory