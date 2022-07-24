import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import accept from '../../assets/svg/undraw_accept_terms_re_lj38-2.svg'


const GetStarted = () => {
    const navigate = useNavigate()
    const myRef = useRef(null)

  return (
      <div className='flex flex-col bg-gray-100 scrollable'>
          <nav className='bg-white w-full p-2 md:px-0 md:py-2 md:flex md:justify-center sticky top-0 z-50'>
              <div className='flex items-center justify-between md:w-3/5'>
                  <div className='flex items-center gap-1 rounded border-b-4 border-blue-500'>
                    <svg className="h-10 w-10 text-blue-500"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  
                        <path stroke="none" d="M0 0h24v24H0z"/>  
                        <circle cx="12" cy="13" r="7" />  
                        <polyline points="12 10 12 13 14 13" />  
                        <line x1="7" y1="4" x2="4.25" y2="6" /> 
                        <line x1="17" y1="4" x2="19.75" y2="6" />
                    </svg>
                    <div>
                        <p className='font-bold text-lg text-blue-500'>CLOCKER</p>
                    </div>
                  </div>
                    <button className='flex items-center justify-end px-4 py-2 bg-blue-500 text-white font-bold rounded-full shadow-lg' onClick={() => navigate('/login')}>LOGIN</button>
              </div>
          </nav>

            <div className='flex p-4 dark:bg-black'>
                <div className='flex flex-col gap-4 h-full w-full md:w-3/5 bg-white m-auto rounded-xl p-4 dark:bg-slate-800'>
                    <div className='md:flex md:p-10'>
                        <div className='md:w-1/2'>
                            <img className='w-full h-full' src={accept} alt='reminder'/>
                        </div>
                        <div className='md:w-1/2 text-center md:text-right md:relative md:flex md:items-center md:justify-end'>
                            <div className='backdrop-blur-xs bg-white/30 rounded-lg flex flex-col gap-1'>
                                <p className='text-xl font-bold drop-shadow-xl italic'>Atur kehadiran <br/> Tim mu dengan </p>
                                <p className='text-3xl font-bold text-blue-500 drop-shadow-xl'>CLOCKER</p>
                                <div className='flex justify-center md:justify-end gap-2 md:mt-4 mt-2'>
                                    <button className='flex items-center justify-end px-4 py-2 bg-blue-500 border border-blue-500 text-white font-bold rounded-full drop-shadow-lg' onClick={() => navigate('/login')}>LOGIN</button>
                                    <button className='flex items-center justify-end px-4 py-2 bg-white border border-blue-500 text-blue-500 font-bold rounded-full drop-shadow-lg' onClick={() => myRef.current.scrollIntoView()}>PELAJARI</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='bg-blue-50 px-4 py-2 rounded-lg' ref={myRef}>
                        <p className='font-bold text-xl border-b-4 border-blue-500 w-fit rounded mb-2'>MULAI</p>

                        <div className='flex items-center gap-2 w-full'>
                            <div className='w-2/12 flex justify-center'>
                                <div className='w-10 h-10 bg-blue-500 rounded-full flex justify-center items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                                    </svg>
                                </div>
                            </div>
                            <div className='w-10/12'>
                                <p className='font-bold'>REGISTRASI</p>
                                <p className='text-xs italic'>Isi data Nama Depan, Nama Belakang, Email dan Password</p>
                            </div>
                        </div>
                        <div className='w-full'>
                            <div className='w-2/12 flex justify-center'>
                                <div className='flex h-10 border-l justify-center border-blue-500'></div>
                            </div>
                        </div>

                        <div className='flex items-center gap-2 w-full'>
                            <div className='w-2/12 flex justify-center'>
                                <div className='w-10 h-10 bg-blue-500 rounded-full flex justify-center items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            <div className='w-10/12'>
                                <p className='font-bold'>AKTIVASI AKUN</p>
                                <p className='text-xs italic'>Aktivasi akunmu dari link yang dikirim ke emailmu ya!</p>
                            </div>
                        </div>
                        <div className='w-full'>
                            <div className='w-2/12 flex justify-center'>
                                <div className='flex h-10 border-l justify-center border-blue-500'></div>
                            </div>
                        </div>

                        <div className='flex items-center gap-2 w-full'>
                            <div className='w-2/12 flex justify-center'>
                                <div className='w-10 h-10 bg-blue-500 rounded-full flex justify-center items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                                    </svg>
                                </div>
                            </div>
                            <div className='w-10/12'>
                                <p className='font-bold'>BUAT / GABUNG GRUP</p>
                                <p className='text-xs italic'>Jika kamu Admin, kamu dapat membuat grup. Jika kamu user, kamu dapat bergabung dengan grup</p>
                            </div>
                        </div>
                        <div className='w-full'>
                            <div className='w-2/12 flex justify-center'>
                                <div className='flex h-10 border-l justify-center border-blue-500'></div>
                            </div>
                        </div>

                        <div className='flex items-center gap-2 w-full'>
                            <div className='w-2/12 flex justify-center'>
                                <div className='w-10 h-10 bg-blue-500 rounded-full flex justify-center items-center'>
                                    <p className='text-xl text-white font-bold'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                                        </svg>
                                    </p>
                                </div>
                            </div>
                            <div className='w-10/12'>
                                <p className='font-bold'>ISI KEHADIRAN</p>
                                <p className='text-xs italic'>Mulai isi data kehadiranmu berdasarkan statusmu ya!</p>
                            </div>
                        </div>
                        <div className='w-full'>
                            <div className='w-2/12 flex justify-center'>
                                <div className='flex h-10 border-l justify-center border-blue-500'></div>
                            </div>
                        </div>

                        <div className='flex items-center gap-2 w-full'>
                            <div className='w-2/12 flex justify-center'>
                                <div className='w-10 h-10 bg-blue-500 rounded-full flex justify-center items-center'>
                                    <p className='text-xl text-white font-bold'>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </p>
                                </div>
                            </div>
                            <div className='w-10/12'>
                                <p className='font-bold'>SELESAI</p>
                                <p className='text-xs italic'>Yey, kamu sudah selesai mengisi kehadiran</p>
                            </div>
                        </div>

                    </div>

                    <div>
                        <p className='font-bold text-xl border-b-4 border-blue-500 w-fit rounded mb-2'>FITUR</p>
                        <div className='flex flex-col gap-4 md:flex-row'>
                            <div className='bg-white rounded-lg drop-shadow-xl flex flex-col items-center p-4 md:w-2/6 w-full'>
                                <p className='font-bold text-lg text-blue-500 px-2'>-GRUP-</p>
                                <img src="https://img.icons8.com/color/96/000000/group-foreground-selected.png" alt='group'/>    
                                <p className='text-xs text-center italic'>Membantumu mengetahui informasi seputar grup yang kamu miliki / ikuti.</p>                            
                            </div>
                            <div className='bg-white rounded-lg drop-shadow-xl flex flex-col items-center p-4 md:w-2/6 w-full'>
                                <p className='font-bold text-lg text-blue-500 px-2'>-KEHADIRAN-</p>
                                <img src="https://img.icons8.com/color/96/000000/attendance-mark.png" alt='attendance'/>    
                                <p className='text-xs text-center italic'>Membantumu mengisi kehadiran dengan mudah dan saling mengetahui status kehadiran antar member.</p>                            
                            </div>
                            <div className='bg-white rounded-lg drop-shadow-xl flex flex-col items-center p-4 md:w-2/6 w-full'>
                            <p className='font-bold text-lg text-blue-500 px-2'>-KALENDER-</p>
                            <img src="https://img.icons8.com/color/96/000000/calendar--v1.png" alt='calendar'/>                                
                            <p className='text-xs text-center italic'>Membantumu mengatur kehadiranmu dalam bentuk kalender.</p>                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className='w-full bg-black'>
                <div className='px-4 py-4'>
                        <p className='text-sm text-white text-center'>Made with ❤️ by Rezananda</p>
                        <p className='text-sm text-white text-center'>&copy; Copyright 2022</p>
                </div>
            </div>
      </div>
  )
}

export default GetStarted