import React from 'react'
import { Link } from 'react-router-dom'
import useRouteContext from '../../hooks/UseRouteContext/UseRouteContext'

const Navbar = () => {
    const {navbar, handleRoute} = useRouteContext()

  return (
    <div className="relative z-10">
        <nav className="w-full fixed bottom-0 shadow bg-white rounded-t-xl border-t border-gray-200">
            <ul className="container mx-auto grid grid-cols-4 gap-3">
                <Link to={'/'} onClick={() => handleRoute(0)} className={navbar === 0 ? "flex flex-col justify-center items-center border-b-4 border-blue-500 py-2" : "flex flex-col justify-center items-center" }>
                    <svg className={`h-6 w-6 ${navbar === 0 ? `text-blue-500` : `text-gray-400`}`}  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                    </svg>
                    <p className={`text-sm ${navbar === 0 ? `text-blue-500 font-bold` : `text-gray-400`}`}>Beranda</p>
                </Link>
                <Link to={'/transactions'} onClick={() => handleRoute(1)} className={navbar === 1 ? "flex flex-col justify-center items-center border-b-4 border-blue-500 py-2" : "flex flex-col justify-center items-center" }>
                    <svg className={`h-6 w-6 ${navbar === 1 ? `text-blue-500` : `text-gray-400`}`}  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  
                        <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="12 8 12 12 14 14" />  <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" />
                    </svg>    
                    <p className={`text-sm ${navbar === 1 ? `text-blue-500 font-bold` : `text-gray-400`}`}>Riwayat</p>
                </Link>
                <Link to={'/notifications'} onClick={() => handleRoute(2)} className={navbar === 2 ? "flex flex-col justify-center items-center border-b-4 border-blue-500 py-2" : "flex flex-col justify-center items-center" }>
                    <svg className={`h-6 w-6 ${navbar === 2 ? `text-blue-500` : `text-gray-400`}`}  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />  
                        <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                    </svg>
                    <p className={`text-sm ${navbar === 2 ? `text-blue-500 font-bold` : `text-gray-400`}`}>Notifikasi</p>
                </Link>
                <Link to={'/profile'} onClick={() => handleRoute(3)} className={navbar === 3 ? "flex flex-col justify-center items-center border-b-4 border-blue-500 py-2" : "flex flex-col justify-center items-center" }>
                    <svg className={`h-6 w-6 ${navbar === 3 ? `text-blue-500` : `text-gray-400`}`}  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                    <p className={`text-sm ${navbar === 3 ? `text-blue-500 font-bold` : `text-gray-400`}`}>Akun</p>
                </Link>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar