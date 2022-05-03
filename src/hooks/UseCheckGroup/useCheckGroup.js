import { doc, onSnapshot } from 'firebase/firestore'
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
            const unsubGetUser = onSnapshot(doc(db, 'users', uid), (docAccountInfo)=> {
                if(docAccountInfo.data().group){
                    const unsubGetGroup = onSnapshot(doc(db, 'groupInformation', docAccountInfo.data().group[0]), (doc)=>{
                        const groupMember = doc.data().groupMember
                        const personalGroup = groupMember.find(o => o.userId === uid )
                        setGroupInfo({
                            status: personalGroup.status,
                            data: doc.data(),
                            id: doc.id,
                            roleUser: personalGroup.roleUser
                        })
                        setInitializingGroupInfo(false)
                    })
                    return unsubGetGroup
                }else{
                    setGroupInfo(false)
                    setInitializingGroupInfo(false)
                }
            })
            return unsubGetUser
        }catch (e){
            console.log(e)
        }
    }
    
    useEffect(()=> {
        const getGroup = checkGroup()
        return getGroup
    }, [])

  return [initilaizingGroupInfo, groupInfo]
}

export default useCheckGroup