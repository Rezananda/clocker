import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../../utils/Firebase/Firebase'
import useUserContext from '../UseUserContext/UseUserContext'

const useCheckGroup = () => {
    const userContext = useUserContext()
    const uid = userContext.currentUser.uid
    const [initilaizingGroupInfo, setInitializingGroupInfo] = useState(true)
    const [groupInfo, setGroupInfo] = useState()

    const checkGroup = async() =>{
        try{
            const docRef = doc(db, "users", uid)
            // const docSnap = await getDoc(docRef)
            const unsubGetUser = onSnapshot(docRef, async(docSnap) => {
            if(docSnap.data().group){
                const unsubGetGroup = onSnapshot(doc(db, 'groupInformation', docSnap.data().group[0]), (doc)=>{
                    const groupMember = doc.data().groupMember
                    const personalGroup = groupMember.find(o => o.userId === uid )
                    setGroupInfo({
                        status: personalGroup.status,
                        id: doc.id,
                        roleUser: personalGroup.roleUser, 
                        ...doc.data()
                    })
                    setInitializingGroupInfo(false)
                    unsubGetGroup()
                })
            }else{
                setGroupInfo(false)
                setInitializingGroupInfo(false)
            }})
            return unsubGetUser
        }catch (e){
            console.log(e)
        }
    }
    useEffect(() => {
        checkGroup()
    
      return () => {
        checkGroup()
      }
    }, [])
    

  return [initilaizingGroupInfo, groupInfo]
}

export default useCheckGroup