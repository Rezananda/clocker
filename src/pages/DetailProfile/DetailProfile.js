import React from 'react'
import TopNavbar from '../../components/Navbar/TopNavbar'
import useUserContext from '../../hooks/UseUserContext/UseUserContext'

const DetailProfile = () => {
    const userContext = useUserContext()
    const user = userContext.currentUser

  return (
    <div>
        <TopNavbar navbarColor={'bg-blue-500'} label={'Profil'} labelColor={'text-white'} back={true} navigateTo={-1}/>
        <div className='px-4 py-4'>
            <ul className='flex flex-col divide-y bg-white dark:bg-slate-800 dark:divide-gray-600 rounded-lg'>
                <li className='py-3 px-4 flex items-center justify-between'>
                    <div>
                        <p className='text-gray-500 text-sm font-bold dark:text-white'>Nama</p>
                        <p className='text-gray-500 dark:text-white'>{user.displayName}</p>
                    </div>
                </li>
                <li className='py-3 px-4 flex items-center justify-between'>
                    <div>
                        <p className='text-gray-500 text-sm font-bold dark:text-white'>Email</p>
                        <p className='text-gray-500 dark:text-white'>{user.email}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default DetailProfile