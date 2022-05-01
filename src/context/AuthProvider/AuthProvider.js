import { onAuthStateChanged } from 'firebase/auth'
import React, { createContext, useEffect, useState } from 'react'
import SpinnerLoading from '../../components/SpinnerLoading/SpinnerLoading'
import { auth } from '../../utils/Firebase/Firebase'

export const AuthContext = createContext() 

const AuthProvider = ({children}) => {
    const[currentUser, setCurrentUser] = useState({})
    const[userInitializing, setUserInitializing] = useState(true)

    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user&&user.emailVerified){
                setCurrentUser(user)
                setUserInitializing(false)
            }else{
                setCurrentUser()
                setUserInitializing(false)
            }
        });
        return unsubscribe
    },[])

    if(userInitializing){
        return <SpinnerLoading/>
    }

  return (
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
  )
}

export default AuthProvider