import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useUserContext from '../../../hooks/UseUserContext/UseUserContext'

const PrivateRoute = () => {
    const userContext = useUserContext()
    if(!userContext.currentUser){
        return <Navigate to={'/get-started'} />
    }
    return <Outlet/>
    
}

export default PrivateRoute