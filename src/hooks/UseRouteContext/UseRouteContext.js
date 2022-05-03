import React, { useContext } from 'react'
import { RouteContext } from '../../context/RouteProvider/RouteProvider'

const useRouteContext = () => {
  return useContext(RouteContext)
}

export default useRouteContext