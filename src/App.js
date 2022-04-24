import React from 'react'
// import {BrowserRouter as Router, Redirect, Route} from "react-router-dom"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import DashboardSectionWithNavbar from './components/DashboardSection/DashboardSectionWithNavbar'
import DashboardSectionWithoutNavbar from './components/DashboardSection/DashboardSectionWithoutNavbar'
import AuthProvider from './context/AuthProvider/AuthProvider'
import Account from './pages/Account/Account'
import AddAttendace from './pages/AddAttendance/AddAttendace'
import AddGroup from './pages/AddGroup/AddGroup'
import DetailGroup from './pages/DetailGroup/DetailGroup'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Notifications from './pages/Notifications/Notifications'
import Registration from './pages/Registration/Registration'
import Transactions from './pages/Transactions/Transactions'
import PrivateRoute from './utils/Route/PrivateRoute/PrivateRoute'
import PublicRoute from './utils/Route/PublicRoute/PublicRoute'

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route element={<PublicRoute/>}>
            <Route path="/login" element={<Login/>} />
            <Route path="/registration" element={<Registration/>} />
          </Route>
          <Route element={<PrivateRoute/>}>
            <Route path="/" element={<DashboardSectionWithNavbar><Home/></DashboardSectionWithNavbar>} />
            <Route path="/transactions" element={<DashboardSectionWithNavbar><Transactions/></DashboardSectionWithNavbar>}/>
            <Route path="/notifications" element={<DashboardSectionWithNavbar> <Notifications/></DashboardSectionWithNavbar>}/>
            <Route path="/profile" element={<DashboardSectionWithNavbar><Account/></DashboardSectionWithNavbar>} />
            <Route path='/add-attendance' element={<DashboardSectionWithoutNavbar><AddAttendace/></DashboardSectionWithoutNavbar>}/>
            <Route path='/add-group' element={<DashboardSectionWithoutNavbar><AddGroup/></DashboardSectionWithoutNavbar>}/>
            <Route path='/detail-group' element={<DashboardSectionWithoutNavbar><DetailGroup/></DashboardSectionWithoutNavbar>}/>
          </Route>
          <Route path="*" element={<p>Page Not Found</p>}/>
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App