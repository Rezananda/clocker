import { doc, getDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { db } from '../../utils/Firebase/Firebase'

const useCheckGroupCode = async (groupId) => {
    const [groupCodeData, setGroupCodeData] = useState({})
    const [initializingGroupCodeData, setInitializingGroupCodeData] = useState(false)


    setInitializingGroupCodeData(true)
    const docRefGetGroup = doc(db, "groupInformation", groupId);
    const docSnapGetGroup = await getDoc(docRefGetGroup)
    if(docSnapGetGroup.exists()){
        setGroupCodeData(docSnapGetGroup.data())
        setInitializingGroupCodeData(false)
    }else{
        setGroupCodeData(false)
        setInitializingGroupCodeData(false)
    }

  return [initializingGroupCodeData, groupCodeData]
}

export default useCheckGroupCode