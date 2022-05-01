import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider/AuthProvider'

const useUserContext = () => {
  return useContext(AuthContext)
}

export default useUserContext