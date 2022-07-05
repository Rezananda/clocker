import moment from 'moment'
import React from 'react'
import { useLocation } from 'react-router-dom'
import TopNavbar from '../../components/Navbar/TopNavbar'

const DetailTransaction = () => {
    const location = useLocation()
    const val = location.state
    
  return (
    <div className='flex flex-col h-screen'>
        <div className='flex sticky top-0 flex-col'>
            <TopNavbar navbarColor={'bg-blue-500'} label={'Detail Riwayat'} labelColor={'text-white'} back={true} navigateTo={'/transactions'}/>
        </div>
        <div className='px-4 py-4 flex overflow-y-auto flex-col'>
            <div className='bg-white rounded-lg p-4 flex flex-col border border-gray-200'>
                <ul className='flex flex-col gap-2'>
                    
                    <li className='flex justify-between items-center'>
                        {val.transaction === "attendance"&&<p className='font-bold text-lg'>Kehadiran</p>}
                        {val.transaction === "join group"&&<p className='font-bold text-lg'>Bergabung Grup</p>}
                        {val.transaction === "add group"&&<p className='font-bold text-lg'>Buat Grup</p>}
                        {val.transaction === "approve group"&&<p className='font-bold text-lg'>Menyetujui User</p>}
                        {val.transaction === "not approve grup"&&<p className='font-bold text-lg'>Ditolak Grup</p>}
                        {val.transaction === 'decline group'&&<p className='font-bold text-lg'>Menolak </p>}
                        {val.transactionType === "add"&&<div className='bg-blue-100 w-fit h-fit text-xs text-blue-500 rounded py-1 px-2'>Tambah</div>}
                        {val.transactionType === "update"&&<div className='bg-orange-100 w-fit text-xs text-orange-500 rounded py-1 px-2'>Ubah</div>}
                    </li>  
                    <div className='border-b border-gray-200'></div>  
                    <li className='flex justify-between items-center'>
                        <p className='text-sm'>{moment(val.date.seconds * 1000).format('DD/MM/YYYY')}</p>
                        <p className='text-sm'>{moment(val.date.seconds * 1000).format('HH:mm')}</p>
                    </li>            
                    {val.transaction !== "join group"&&<li className='bg-blue-50 rounded-lg px-4 py-2 flex flex-col divide-y'>
                        {val.transaction === "attendance"&&val.transactionType === 'add'&&
                        <>
                            <div>
                                <p>Status</p>
                                <p className='font-bold text-lg'>{val.data.status} </p>
                            </div>     
                            <div>
                                {val.data.status==='WFO'&&
                                <>
                                    <p>Lokasi WFO</p>
                                    <p className='font-bold text-lg'>{val.data.wfoLocation} </p>
                                </>
                                }
                                {val.data.status==='Sakit'&&
                                <>
                                    <p>Alasan Sakit</p>
                                    <p className='font-bold text-lg'>{val.data.sickReason} </p>
                                </>
                                }
                                {val.data.status==='Cuti'&&
                                <>
                                    <p>Lama Cuti</p>
                                    <p className='font-bold text-lg'>{val.data.startDate} - {val.data.endDate} </p>
                                </>
                                }
                            </div>
                        </>
                        }

                        {val.transaction === "approve group"&&val.transactionType === 'add'&&<p className='text-lg'>
                        <>
                            <p>Nama User</p>
                            <p className='font-bold text-lg'>{val.data.displayName} </p>
                        </>    
                        </p>}

                        {val.transaction === "not approve grup"&&val.transactionType === 'add'&&<p className='font-bold text-lg'>
                        <>
                            <p>Nama User</p>
                            <p className='font-bold text-lg'>{val.data.displayName} </p>
                        </>    
                        </p>}

                        {val.transaction === 'decline group'&&val.transactionType === 'add'&&
                        <>
                            <p>Nama User</p>
                            <p className='font-bold text-lg'>{val.data.displayName} </p>
                        </>
                        }
                        {val.transaction === "add group"&&val.transactionType === 'add'&&<p className='flex flex-col gap-2'>
                        <div>
                            <p>Nama Grup</p>
                            <p className='font-bold text-lg'>{val.data.groupName} </p>
                        </div>        
                        <div>
                            <p>Pemiliki Grup</p>
                            <p className='font-bold text-lg'>{val.data.groupOwnerName} </p>
                        </div>     
                        <div>
                            <p>Dibuat Pada</p>
                            <p className='font-bold text-lg'>{moment(val.data.timestamps.seconds * 1000).format('DD/MM/YYYY')} </p>
                        </div>   
                        </p>}
                    
                        {val.transaction === "attendance"&&val.transactionType === 'update'&&
                        <div className='flex flex-col gap-4'>
                            <div className='flex flex-col gap-2'>
                                <p>Sebelum</p>
                                <div className='border-t border-gray-200'></div>
                                <div>
                                    <p>Status</p>
                                    <p className='font-bold text-lg'>{val.data.before.status}</p>
                                </div>
                                {val.data.before.status === 'WFO'&&
                                <div>
                                    <p>Lokasi WFO</p>
                                    <p className='font-bold text-lg'>{val.data.before.wfoLocation}</p>
                                </div>
                                }
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p>Sesudah</p>
                                <div className='border-t border-gray-200'></div>
                                <div>
                                    <p>Status</p>
                                    <p className='font-bold text-lg'>{val.data.after.status}</p>
                                </div>
                                {val.data.after.status === 'WFO'&&
                                <div>
                                    <p>Lokasi WFO</p>
                                    <p className='font-bold text-lg'>{val.data.after.wfoLocation}</p>
                                </div>
                                }
                            </div>
                        </div>
                        }
                    </li>}
                </ul>
            </div>
        </div>
    </div>
  )
}

export default DetailTransaction