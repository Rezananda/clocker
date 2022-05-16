import React from 'react'
import useGetHistory from '../../hooks/UseGetHistory/useGetHistory'

const Transactions = () => {
  const [historyData, initializeHistory] = useGetHistory()
  return (
    <>
        <nav className='py-3 px-2 bg-blue-500'>
            <p className='text-lg font-bold text-white'>
                Transaksi
            </p>
        </nav>
        {initializeHistory? 
        <p>Loading...</p>
        :
        <div>
          {historyData === 'noHistory' ? 
          <p className='flex items-center justify-center font-bold text-gray-500 mt-4'>-Belum Ada Riwayat-</p>
          :
          historyData.map((val, index) => (
            <div key={index} className='bg-white border-b border-gray-200'>
              <div className='p-2 flex items-center justify-between'>
                <div className='flex flex-col'>
                    {val.transaction === "attendance"&&<p className='font-bold'>Kehadiran</p>}
                    {val.transaction === "join group"&&<p className='font-bold'>Bergabung Grup</p>}
                    {val.transaction === "add group"&&<p className='font-bold'>Tambah Grup</p>}
                    {val.transaction === "approve group"&&<p className='font-bold'>Menyetujui User</p>}
                    <p className='text-xs'>{new Date(val.date.seconds * 1000).toLocaleString()}</p>
                </div>
                <div className=''>
                    {val.transactionType === "add"&&<div className='bg-blue-100 w-fit border border-blue-500 text-sm text-blue-500 rounded-full py-0.5 px-1'>Tambah</div>}
                    {val.transactionType === "update"&&<div className='bg-blue-100 border border-blue-500 text-blue-500 rounded p-1'>Ubah</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
        }
    </>
  )
}

export default Transactions