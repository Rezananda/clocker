import React, { createContext, useState } from 'react'

export const RouteContext = createContext()

const RouteProvider = ({children}) => {
    const [navbar, setNavbar] = useState(0)
    const handleRoute = (route) => {
        if(route === 0){
            console.log('home')
            setNavbar(0)
        }else if(route === 1){
            console.log('transaction')
            setNavbar(1)
        }else if(route === 2){
            setNavbar(2)
        }else if(route === 3){
            setNavbar(3)
        }
    }

  return (
    <RouteContext.Provider value={{navbar, handleRoute}}>
        {children}
    </RouteContext.Provider>
  )
}

export default RouteProvider