import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthProvider/AuthProvider'

const PublicRoute = () => {
    const user = useContext(AuthContext)
    if(user.currentUser){
        return <Navigate to={'/'} />
    }
    return <Outlet/>
}

export default PublicRoute