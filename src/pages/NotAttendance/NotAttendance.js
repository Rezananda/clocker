import React from 'react'
import { useLocation } from 'react-router-dom'
import TopNavbar from '../../components/Navbar/TopNavbar'

const NotAttendance = () => {
    const location = useLocation()
  return (
    <div className='flex flex-col h-screen overflow-y-auto'>
        <div className='sticky top-0'>
            <TopNavbar navbarColor={'bg-blue-500'} label={'Belum Hadir'} labelColor={'text-white'} back={true} navigateTo={'/'}/>
        </div>
        <div className='p-4'>
            {location.state.length === 0 ? 
            <p className='text-sm text-gray-500 text-center'>-Semua Sudah Hadir-</p>
            :
            <ul className='flex flex-col gap-1'>
                {location.state.map((val, index) => (
                    <li key={index} className='flex w-full items-center px-2 py-4 bg-white rounded-md'>
                        <p className='w-9/12 truncate'>{val}</p>
                        <a className='w-3/12 text-right text-sm text-blue-500 underline' href={`whatsapp://send?text=Hi ${val}, jangan lupa isi kehadiran di Clocker ya. Terima Kasih`} data-action="share/whatsapp/share">
                            Ingatkan 
                        </a>
                    </li>
                ))}
            </ul>
            }
        </div>
    </div>
  )
}

export default NotAttendance