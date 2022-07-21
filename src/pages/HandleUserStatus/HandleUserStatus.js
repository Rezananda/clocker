import { arrayRemove, arrayUnion, collection, deleteField, doc, serverTimestamp, Timestamp, writeBatch } from 'firebase/firestore'
import React, { useReducer, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ButtonFill from '../../components/Button/ButtonFill/ButtonFill'
import ButtonOutline from '../../components/Button/ButtonOutline/ButtonOutline'
import TopNavbar from '../../components/Navbar/TopNavbar'
import SpinnerLoading from '../../components/SpinnerLoading/SpinnerLoading'
import useUserContext from '../../hooks/UseUserContext/UseUserContext'
import { db } from '../../utils/Firebase/Firebase'

const initialState = {
  initializeChangeStatus: false,
}

const reducer = (state, action) => {
  switch (action.type) {
      case "LOADING CHANGE STATUS":
          return {...state, initializeChangeStatus: action.payload}
      default:
          break;
  }
}

const HandleUserStatus = () => {
  const userContext = useUserContext()
  const location = useLocation()
  const navigate = useNavigate()
  const [roleUser, setRoleUser] = useState([])
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleRoleUser = (event) => {
    var updatedList = [...roleUser];
    if (event.target.checked) {
      updatedList = [...roleUser, event.target.value];
    } else {
      updatedList.splice(roleUser.indexOf(event.target.value), 1);
    }
    setRoleUser(updatedList);
  };

  const handleChangeStatus = async(userId, displayName, photoURL, status,  groupId, userStatus) => {
    dispatch({type: "LOADING CHANGE STATUS", payload: true})
    const batch = writeBatch(db)
    const memberRef = doc(db, 'groupInformation', groupId)
    const transacrionRef = doc(collection(db, "transactionInformation"))
    const transacrionDeclineRef = doc(collection(db, "transactionInformation"))
    const userRef = doc(db, 'users', userId)

    batch.update(memberRef, {
      groupMember: arrayRemove({
        displayName: displayName,
        photoURL: photoURL,
        status: status,
        userId: userId
      })
    })

    if(userStatus === 'approve'){
      const transactions = {
        userId: userContext.currentUser.uid,
        transaction: "approve group",
        transactionType: 'add',
        data: {
          displayName: displayName,
          photoURL: photoURL,
          roleUser: roleUser,
          userId: userId
        },
        date: Timestamp.now()
      }

      batch.set(transacrionRef, transactions)

      batch.update(memberRef, {
        groupMember: arrayUnion({
          displayName: displayName,
          photoURL: photoURL,
          roleUser: roleUser,
          status: '01',
          userId: userId
        })
      })
      await batch.commit()
      dispatch({type: "LOADING CHANGE STATUS", payload: false})
      navigate('/detail-group')

    } else if(userStatus === 'decline'){
      const transactions = {
        userId: userContext.currentUser.uid,
        transaction: "decline group",
        transactionType: 'add',
        data: {
          displayName: displayName,
          photoURL: photoURL,
          roleUser: roleUser,
          userId: userId
        },
        date: Timestamp.now()
      }
      const transactionUser = {
        userId: userId,
        transaction: "not approve grup",
        transactionType: 'update',
        data: {
          groupId: groupId
        },
        date: Timestamp.now()
      }

      batch.set(transacrionDeclineRef, transactions)
      batch.set(transacrionRef, transactionUser)

      batch.update(userRef, {
        group: deleteField()
      })
      
      await batch.commit()

      console.log(transacrionDeclineRef.id)
      console.log(transacrionRef.id)
      dispatch({type: "LOADING CHANGE STATUS", payload: false})
      navigate('/detail-group')
    }
}

  return (
    <div className='min-h-screen bg-gray-100'>
      <TopNavbar navbarColor={`bg-blue-500`} back={true} label={`Ubah Status User`} labelColor={`text-white`} navigateTo={-1}/>
      {state.initializeChangeStatus ? <SpinnerLoading/>
      :
      <div className='px-4 py-4'>
        <div className='bg-white rounded-lg p-4'> 
          <div className='flex flex-col gap-2'>
            <div className=''>
              <p className='text-sm'>Nama User</p>
              <p className='font-bold text-lg'>{location.state.displayName}</p>
            </div>
            <div>
              <p className='text-sm'>Status</p>
              <div className='flex items-center gap-1'>
                <input type={'checkbox'} value={'03'} onChange={handleRoleUser}/>
                <span className='text-lg font-bold'>User</span>
              </div>
              <div className='flex items-center gap-1'>
                <input type={'checkbox'} value={'02'} onChange={handleRoleUser} disabled={!roleUser.includes('03')}/>
                <span className='text-lg font-bold'>Manajer</span>
              </div>
            </div>
            <ButtonFill disabled={!roleUser.includes('03')} additionalClass={!roleUser.includes('03') ?'bg-blue-200 border-blue-200' : 'bg-blue-500 border-blue-500'} label={'Setuju'} handleClick={() => handleChangeStatus(location.state.userId, location.state.displayName, location.state.photoURL, location.state.status, location.state.groupInfoId, 'approve')}/>
            <ButtonOutline label={'Tolak'} handleClick={() => handleChangeStatus(location.state.userId, location.state.displayName, location.state.photoURL, location.state.status, location.state.groupInfoId, 'decline')}/>
          </div>
        </div>
      </div>
      }
    </div>
  )
}

export default HandleUserStatus