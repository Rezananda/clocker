import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useUserContext from '../../../hooks/UseUserContext/UseUserContext'

const PublicRoute = () => {
    const userContext = useUserContext()
    if(userContext.currentUser){
        return <Navigate to={'/'} />
    }
    return <Outlet/>
}

export default PublicRoute