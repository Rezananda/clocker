import React from 'react'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import DashboardSectionWithNavbar from './components/DashboardSection/DashboardSectionWithNavbar'
import DashboardSectionWithoutNavbar from './components/DashboardSection/DashboardSectionWithoutNavbar'
import AuthProvider from './context/AuthProvider/AuthProvider'
import RouteProvider from './context/RouteProvider/RouteProvider'
import About from './pages/About/About'
import Account from './pages/Account/Account'
import AddAttendace from './pages/AddAttendance/AddAttendace'
import AddFromMyDate from './pages/AddFromMyDate/AddFromMyDate'
import AddGroup from './pages/AddGroup/AddGroup'
import DetailGroup from './pages/DetailGroup/DetailGroup'
import DetailProfile from './pages/DetailProfile/DetailProfile'
import DetailTransaction from './pages/DetailTransaction/DetailTransaction'
import ForgetPassword from './pages/ForgetPassword/ForgetPassword'
import GetStarted from './pages/GetStarted/GetStarted'
import HandleUserStatus from './pages/HandleUserStatus/HandleUserStatus'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import MyAttendance from './pages/MyAttendance/MyAttendance'
import MyDate from './pages/MyDate/MyDate'
import Notifications from './pages/Notifications/Notifications'
import Registration from './pages/Registration/Registration'
import Settings from './pages/Settings/Settings'
import Transactions from './pages/Transactions/Transactions'
import UpdateAttendance from './pages/UpdateAttendance/UpdateAttendance'
import UpdatePassword from './pages/UpdatePassword/UpdatePassword'
import PrivateRoute from './utils/Route/PrivateRoute/PrivateRoute'
import PublicRoute from './utils/Route/PublicRoute/PublicRoute'

const App = () => {
  return (
    <AuthProvider>
      <RouteProvider>
        <Router>
          <Routes>
              <Route element={<PublicRoute/>}>
                {/* <Route path="/get-started" element={<GetStarted/>}/> */}
                <Route path="/login" element={<Login/>} />
                <Route path="/registration" element={<Registration/>} />
                <Route path="/forget-password" element={<ForgetPassword/>} />
              </Route>
              <Route element={<PrivateRoute/>}>
                <Route path="/" element={<DashboardSectionWithNavbar><Home/></DashboardSectionWithNavbar>} />
                <Route path="/transactions" element={<DashboardSectionWithNavbar><Transactions/></DashboardSectionWithNavbar>}/>
                <Route path="/notifications" element={<DashboardSectionWithNavbar> <Notifications/></DashboardSectionWithNavbar>}/>
                <Route path="/profile" element={<DashboardSectionWithNavbar><Account/></DashboardSectionWithNavbar>} />
                <Route path="/detail-profile" element={<DashboardSectionWithoutNavbar><DetailProfile/></DashboardSectionWithoutNavbar>} />
                <Route path="/update-password" element={<DashboardSectionWithoutNavbar><UpdatePassword/></DashboardSectionWithoutNavbar>} />
                <Route path="/settings" element={<DashboardSectionWithoutNavbar><Settings/></DashboardSectionWithoutNavbar>} />
                <Route path="/about" element={<DashboardSectionWithoutNavbar><About/></DashboardSectionWithoutNavbar>} />
                <Route path='/add-attendance' element={<DashboardSectionWithoutNavbar><AddAttendace/></DashboardSectionWithoutNavbar>}/>
                <Route path='/update-attendance' element={<DashboardSectionWithoutNavbar><UpdateAttendance/></DashboardSectionWithoutNavbar>}/>
                <Route path='/add-group' element={<DashboardSectionWithoutNavbar><AddGroup/></DashboardSectionWithoutNavbar>}/>
                <Route path='/detail-group' element={<DashboardSectionWithoutNavbar><DetailGroup/></DashboardSectionWithoutNavbar>}/>
                <Route path='/change-status' element={<DashboardSectionWithoutNavbar><HandleUserStatus/></DashboardSectionWithoutNavbar>}/>
                <Route path='/my-date' element={<DashboardSectionWithoutNavbar><MyDate/></DashboardSectionWithoutNavbar>}/>
                <Route path='/add-my-date' element={<DashboardSectionWithoutNavbar><AddFromMyDate/></DashboardSectionWithoutNavbar>}/>
                <Route path='/my-attendance' element={<DashboardSectionWithoutNavbar><MyAttendance/></DashboardSectionWithoutNavbar>}/>
                <Route path='/detail-transaction' element={<DashboardSectionWithoutNavbar><DetailTransaction/></DashboardSectionWithoutNavbar>}/>
              </Route>
              <Route path="*" element={<p>Page Not Found</p>}/>
          </Routes>
        </Router>
      </RouteProvider>
    </AuthProvider>
  )
}

export default App