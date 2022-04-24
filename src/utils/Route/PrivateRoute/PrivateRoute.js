import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthProvider/AuthProvider'

const PrivateRoute = () => {
    const user = useContext(AuthContext)
    if(!user.currentUser){
        return <Navigate to={'/login'} />
    }
    return <Outlet/>
    
}

export default PrivateRoute