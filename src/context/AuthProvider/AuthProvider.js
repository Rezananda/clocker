import { onAuthStateChanged } from 'firebase/auth'
import React, { createContext, useEffect, useState } from 'react'
import SpinnerLoading from '../../components/SpinnerLoading/SpinnerLoading'
import { auth } from '../../utils/Firebase/Firebase'

export const AuthContext = createContext() 

const AuthProvider = ({children}) => {
    const[currentUser, setCurrentUser] = useState({})
    const[userInitializing, setUserInitializing] = useState(true)

    useEffect(()=> {
        let isMounted = true;
        if(isMounted){
            onAuthStateChanged(auth, (user) => {
                if(user){
                    setCurrentUser(user)
                    setUserInitializing(false)
                }else{
                    setCurrentUser()
                    setUserInitializing(false)
                }
            });
        }
        return () => {
            isMounted = false
        }
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