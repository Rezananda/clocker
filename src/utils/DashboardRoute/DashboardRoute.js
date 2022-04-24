import { doc, getDoc, setDoc } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min'
import Navbar from '../../components/Navbar/Navbar'
import { onMessageListener } from '../../components/Notification/Notifications'
import { AuthContext } from '../../context/AuthProvider/AuthProvider'
import Account from '../../pages/Account/Account'
import AddAttendace from '../../pages/AddAttendance/AddAttendace'
import AddGroup from '../../pages/AddGroup/AddGroup'
import DetailGroup from '../../pages/DetailGroup/DetailGroup'
import GroupApproval from '../../pages/HandleNotification/HandleNotification'
import Home from '../../pages/Home/Home'
import Notifications from '../../pages/Notifications/Notifications'
import { db, fetchToken } from '../Firebase/Firebase'

const DashboardRoute = () => {
    let {path, url} = useRouteMatch()
    const [token, setToken] = useState("")
    const [show, setShow] = useState(false);
    const [notification, setNotification] = useState({});
    const [initializeToken, setInitializeToken] = useState(false)
    const authContext = useContext(AuthContext)

    const saveToken = async () => {
      const docRefPersonalGroup = doc(db, "personalAdditionalInformation", authContext.currentUser.uid)
      const docSnapPersonalGroup = await getDoc(docRefPersonalGroup)
      if(docSnapPersonalGroup.exists()){
        await setDoc(doc(db, "groupInformation", docSnapPersonalGroup.data().group[0].groupId), {
          groupToken: [
            {
              token: token,
              user: authContext.currentUser.uid
            }
          ]
        }, { merge: true });
      }else{
        console.log("data tidak ada")
      }
    }
  
    // useEffect(() => {
    //   setInitializeToken(true)
    //   const getToken = fetchToken(setToken)
    //   setInitializeToken(false)
    //   saveToken()
    //   return getToken
    // }, [])
    
    function handleNotification(){
      fetchToken(setToken)
      saveToken()
    }
    
    onMessageListener().then(payload => {
      setShow(true);
      setNotification({title: payload.notification.title, body: payload.notification.body})
      console.log(payload);
    }).catch((err)=>{
      console.log('failed: ', err);
    })
  return (
    <div>
      {initializeToken ? <p>Loading...</p>
      :
      <>
      {show ? 
      <div className='absolute top-10 w-full z-50 flex justify-center'>
        <div id="toast-default" className="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow" role="alert">
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          </div>
          <div className='ml-3'>
            <p className="text-sm font-normal">{notification.title}</p>
            <p className="text-xs font-normal">{notification.body}</p>
          </div>
          <button onClick={() => setShow(false)} type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700">
            <span className="sr-only">Close</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </button>
        </div>
      </div>
        :
        <></>
      }
      <Router>
          <Route exact path={`${path}/add-group`}>
            <AddGroup/>
          </Route>
          <Route exact path={`${path}/add-attendance`}>
            <AddAttendace/>
          </Route>
          <Route exact path={`${path}/notifications/approval-group`}>
            <GroupApproval/>
          </Route>
          <Route exact path={`${path}/group/:groupId`}>
            <DetailGroup/>
          </Route>
          <Navbar url={url}/>
          <Switch>
              <Route exact path={path}>
                  <Home/>
              </Route>
              <Route exact path={`${path}/notifications`}>
                <Notifications/>
              </Route>
              <Route exact path={`${path}/account`}>
                  <Account/>
              </Route>
          </Switch>
      </Router>
      </>
    }
    </div>
  )
}

export default DashboardRoute