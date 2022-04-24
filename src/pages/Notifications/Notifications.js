import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthProvider/AuthProvider'
import { db } from '../../utils/Firebase/Firebase'

const Notifications = () => {
    const user = useContext(AuthContext)
    const [notificationData, setNotificationData] = useState([])
    const [initializeNotification, setInitializeNotification] = useState(false)
    const navigate = useNavigate()

    const handleGetNotification = async () => {
        setInitializeNotification(true)
        try {
            const notificationRef = collection(db, "personalNotifications")
            const queryRequestGroup = query(notificationRef, where("typeNotification", "==", "approval-group"))
            const queryInfoGroup = query(notificationRef, where("typeNotification", "==", "info-group"))
    
            const getNotificationRequestGroup = await getDocs(queryRequestGroup)
            const getNotificationInfoGroup = await getDocs(queryInfoGroup)
    
            const getPersonalGroup = await getDoc(doc(db, "users", user.currentUser.uid))
            const getGroupInfo = await getDoc(doc(db, "groupInformation", getPersonalGroup.data().group[0]))
            const notificationDatas = []
    
            getNotificationRequestGroup.forEach((doc) => {
                if(doc.data().destination === user.currentUser.uid){
                    const data = {
                        id : doc.id,
                        data : doc.data()
                    }
                    notificationDatas.push(data)
                }
            })
            
            getNotificationInfoGroup.forEach((doc) => {
                if(doc.data().destination === getPersonalGroup.data().group[0]){
                    getGroupInfo.data().groupMember.map((value) => {
                        if(value.userId === user.currentUser.uid && value.status === '01'){
                            const data = {
                                id : doc.id,
                                data : doc.data()
                            }
                            notificationDatas.push(data)
                        }
                        console.log('tidak dapat')
                        return value
                    })
                }
            })
            setNotificationData(notificationDatas)
            setInitializeNotification(false)
        } catch (error) {
            console.log(error)
            setInitializeNotification(false)
        }

    }

    useEffect(() => {
        const unsubscirbe = handleGetNotification()
        return unsubscirbe
    }, [])

    const handleOpenDetailNotification = async (id, data) => {
        updateDoc(doc(db, 'personalNotifications', id), {opened: true})
        navigate({pathname: `/dashboard/notifications/${data.typeNotification}`, state:{data}})
    }


  return (
    <div>
        <nav className='py-3 px-2 bg-blue-500'>
            <p className='text-lg font-bold text-white'>
                Notifikasi
            </p>
        </nav>
        {initializeNotification ? 
        <p>Loading...</p>
        :
        <ul className='divide-y'>
            {notificationData.map((element, i) => (
            <li key={i} onClick={() => handleOpenDetailNotification(element.id, element.data)} className={`p-2 ${element.data.opened ? 'bg-white' : 'bg-blue-50'} flex items-center gap-2 cursor-pointer`}>
                <div>
                    {element.data.opened ? 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M2.94 6.412A2 2 0 002 8.108V16a2 2 0 002 2h12a2 2 0 002-2V8.108a2 2 0 00-.94-1.696l-6-3.75a2 2 0 00-2.12 0l-6 3.75zm2.615 2.423a1 1 0 10-1.11 1.664l5 3.333a1 1 0 001.11 0l5-3.333a1 1 0 00-1.11-1.664L10 11.798 5.555 8.835z" clipRule="evenodd" />
                  </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    }
                </div>
                <div>
                    <span className='text-xs text-gray-500'>{element.data.timestamps.toDate().toDateString()}</span>
                    <p className='font-bold text-md text-gray-500'>{element.title}</p>
                    <span className='text-sm text-gray-500'>{element.data.message}</span>
                </div>
            </li>
            ) 
            )}
        </ul>
        }
    </div>
  )
}

export default Notifications