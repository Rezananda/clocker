import React from 'react'
import { Link } from 'react-router-dom'
import useRouteContext from '../../hooks/UseRouteContext/UseRouteContext'

const Navbar = () => {
    const {navbar, handleRoute} = useRouteContext()

  return (
            <ul className="w-full grid grid-cols-3 gap-4 py-2 h-18 fixed bottom-0 bg-white rounded-t-xl md:w-1/4 dark:bg-slate-800">
                <Link to={'/'} onClick={() => handleRoute(0)} className={"flex flex-col justify-center items-center"}>
                    {/* <svg className={`h-6 w-6 ${navbar === 0 ? `text-blue-500` : `text-gray-400`}`}  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                    </svg> */}
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-7 w-7 ${navbar === 0 ? `text-blue-500` : `text-gray-400`}`} viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                    <p className={`text-xs ${navbar === 0 ? `text-blue-500` : `text-gray-400`}`}>Beranda</p>
                </Link>
                {/* <Link to={'/transactions'} onClick={() => handleRoute(1)} className={"flex flex-col justify-center items-center"}>
                    <svg className={`h-6 w-6 ${navbar === 1 ? `text-blue-500` : `text-gray-400`}`}  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  
                        <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="12 8 12 12 14 14" />  <path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" />
                    </svg>    
                    <p className={`text-sm ${navbar === 1 ? `text-blue-500` : `text-gray-400`}`}>Riwayat</p>
                </Link> */}
                <Link to={'/calendar'} onClick={() => handleRoute(1)} className={"flex flex-col justify-center items-center"}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-7 w-7 ${navbar === 1 ? `text-blue-500` : `text-gray-400`}`} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <p className={`text-xs ${navbar === 1 ? `text-blue-500` : `text-gray-400`}`}>Kalender Saya</p>
                </Link>
                {/* <Link to={'/notifications'} onClick={() => handleRoute(2)} className={"flex flex-col justify-center items-center"}>
                    <svg className={`h-6 w-6 ${navbar === 2 ? `text-blue-500` : `text-gray-400`}`}  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />  
                        <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                    </svg>
                    <p className={`text-sm ${navbar === 2 ? `text-blue-500` : `text-gray-400`}`}>Notifikasi</p>
                </Link> */}
                <Link to={'/profile'} onClick={() => handleRoute(3)} className={"flex flex-col justify-center items-center" }>
                    {/* <svg className={}  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg> */}
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-7 w-7 ${navbar === 3 ? `text-blue-500` : `text-gray-400`}`} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                    </svg>
                    <p className={`text-xs ${navbar === 3 ? `text-blue-500` : `text-gray-400`}`}>Akun</p>
                </Link>
            </ul>
  )
}

export default Navbar