import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useUserContext from '../../../hooks/UseUserContext/UseUserContext'

const PublicRoute = () => {
    const userContext = useUserContext()
    if(userContext.currentUser&&userContext.currentUser.emailVerified){
        return <Navigate to={'/'} />
    }
    return <Outlet/>
}

export default PublicRoute