import { arrayRemove, arrayUnion, collection, deleteField, doc, serverTimestamp, updateDoc, writeBatch } from 'firebase/firestore'
import React, { useReducer } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ButtonFill from '../../components/Button/ButtonFill/ButtonFill'
import ButtonIcon from '../../components/Button/ButtonIcon/ButtonIcon'
import ButtonOutline from '../../components/Button/ButtonOutline/ButtonOutline'
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
  const [state, dispatch] = useReducer(reducer, initialState)

  console.log(location.state)

  const handleChangeStatus = async(userId, displayName, photoURL, status, roleUser, groupId, userStatus) => {
    dispatch({type: "LOADING CHANGE STATUS", payload: true})
    const batch = writeBatch(db)
    const memberRef = doc(db, 'groupInformation', groupId)
    const transacrionRef = doc(collection(db, "transactionInformation"))
    const userRef = doc(db, 'users', userId)

    const transactions = {
      userId: userContext.currentUser.uid,
      transaction: "approve group",
      transactionType: 'add',
      date: serverTimestamp()
    }

    batch.update(memberRef, {
      groupMember: arrayRemove({
        displayName: displayName,
        photoURL: photoURL,
        roleUser: roleUser,
        status: status,
        userId: userId
      })
    })

    batch.set(transacrionRef, transactions)

    // await updateDoc(memberRef, {
    //     groupMember: arrayRemove({
    //         displayName: displayName,
    //         photoURL: photoURL,
    //         roleUser: roleUser,
    //         status: status,
    //         userId: userId
    //     })
    // })
    if(userStatus === 'approve'){
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
      // await updateDoc(memberRef, {
      //     groupMember: arrayUnion({
      //         displayName: displayName,
      //         photoURL: photoURL,
      //         roleUser: roleUser,
      //         status: '01',
      //         userId: userId
      //     })
      // })
      dispatch({type: "LOADING CHANGE STATUS", payload: false})
      navigate('/detail-group')
    } else if(userStatus === 'reject'){
      batch.update(userRef, {
        group: deleteField()
      })
      await batch.commit()
      dispatch({type: "LOADING CHANGE STATUS", payload: false})
    }
}

  return (
    <div className='min-h-screen bg-gray-50'>
      <nav className='bg-blue-500 px-2 py-4 flex flex-row items-center drop-shadow'>
        <div className='basis-1/2 flex items-center'>
            <ButtonIcon 
            actionFunction={()=> navigate(-1)} 
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>}/>
            <p className='text-md font-bold text-white flex ml-1'>Ubah Status User</p>
        </div>
      </nav>
      {state.initializeChangeStatus ? <SpinnerLoading/>
      :
      <div className='p-2'>
        <div className='bg-white rounded-lg p-4'> 
          <div className='flex flex-col gap-4'>
            <div className='flex items-center'>
              <p className='text-lg'>Nama: </p><p className='font-bold ml-1 text-lg'>{location.state.displayName}</p>
            </div>
            <div className='border-t border-gray-100'></div>
            <ButtonFill additionalClass={'bg-blue-500 border-blue-500'} label={'Setuju'} handleClick={() => handleChangeStatus(location.state.userId, location.state.displayName, location.state.photoURL, location.state.status, location.state.roleUser, location.state.groupInfoId, 'approve')}/>
            <ButtonOutline label={'Tolak'}/>
          </div>
        </div>
      </div>
      }
    </div>
  )
}

export default HandleUserStatus