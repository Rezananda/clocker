import { collection, doc, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../utils/Firebase/Firebase'
import useUserContext from '../UseUserContext/UseUserContext'

const useSearch = (userName) => {
    const userContext = useUserContext()
    const uid = userContext.currentUser.uid
    const [initializeSearch, setInitializeSearc] = useState(false)
    const [search, setSearch] = useState([])
    const searchValue = []

    const getSearchValue = () => {
        try {
            setInitializeSearc(false)
            const docRef = doc(db, 'users', uid)
            const unsubscribe = onSnapshot(docRef, async(docSnap) => {
                if(docSnap.data().group){
                    const queryAttendance = query(collection(db, 'attendanceInformation'), where('groupId', '==', docSnap.data().group[0]), where('userName', '==', userName), orderBy('timestamp', 'desc'))
                    const unsubscribeCurrentAttendance = onSnapshot(queryAttendance, (querySnapShot) => {
                        querySnapShot.forEach((doc) => {
                            searchValue.push({id: doc.id, ...doc.data()});
                        })
                    if(searchValue.length > 0){
                        setSearch(searchValue)
                        setInitializeSearc(false)
                    }else{
                        setSearch('notAttendance')
                        setInitializeSearc(false)
                    }
                    })
                }
            })
            
        } catch (error) {
            console.log(error)
        }
    }

  return [search, initializeSearch, getSearchValue]
}

export default useSearch