import React from 'react'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import DashboardSectionWithNavbar from './components/DashboardSection/DashboardSectionWithNavbar'
import DashboardSectionWithoutNavbar from './components/DashboardSection/DashboardSectionWithoutNavbar'
import AuthProvider from './context/AuthProvider/AuthProvider'
import RouteProvider from './context/RouteProvider/RouteProvider'
import Account from './pages/Account/Account'
import AddAttendace from './pages/AddAttendance/AddAttendace'
import AddGroup from './pages/AddGroup/AddGroup'
import DetailGroup from './pages/DetailGroup/DetailGroup'
import ForgetPassword from './pages/ForgetPassword/ForgetPassword'
import HandleUserStatus from './pages/HandleUserStatus/HandleUserStatus'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Notifications from './pages/Notifications/Notifications'
import Registration from './pages/Registration/Registration'
import Transactions from './pages/Transactions/Transactions'
import PrivateRoute from './utils/Route/PrivateRoute/PrivateRoute'
import PublicRoute from './utils/Route/PublicRoute/PublicRoute'

const App = () => {
  return (
    <AuthProvider>
      <RouteProvider>
        <Router>
          <Routes>
              <Route element={<PublicRoute/>}>
                <Route path="/login" element={<Login/>} />
                <Route path="/registration" element={<Registration/>} />
                <Route path="/forget-password" element={<ForgetPassword/>} />
              </Route>
              <Route element={<PrivateRoute/>}>
                <Route path="/" element={<DashboardSectionWithNavbar><Home/></DashboardSectionWithNavbar>} />
                <Route path="/transactions" element={<DashboardSectionWithNavbar><Transactions/></DashboardSectionWithNavbar>}/>
                <Route path="/notifications" element={<DashboardSectionWithNavbar> <Notifications/></DashboardSectionWithNavbar>}/>
                <Route path="/profile" element={<DashboardSectionWithNavbar><Account/></DashboardSectionWithNavbar>} />
                <Route path='/add-attendance' element={<DashboardSectionWithoutNavbar><AddAttendace/></DashboardSectionWithoutNavbar>}/>
                <Route path='/add-group' element={<DashboardSectionWithoutNavbar><AddGroup/></DashboardSectionWithoutNavbar>}/>
                <Route path='/detail-group' element={<DashboardSectionWithoutNavbar><DetailGroup/></DashboardSectionWithoutNavbar>}/>
                <Route path='/change-status' element={<DashboardSectionWithoutNavbar><HandleUserStatus/></DashboardSectionWithoutNavbar>}/>
              </Route>
              <Route path="*" element={<p>Page Not Found</p>}/>
          </Routes>
        </Router>
      </RouteProvider>
    </AuthProvider>
  )
}

export default App