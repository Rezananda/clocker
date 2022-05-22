import React from 'react'
import ButtonLink from '../../components/Button/ButtonLink/ButtonLink'
import Chip from '../../components/Chip/Chip'
import useGetHistory from '../../hooks/UseGetHistory/useGetHistory'

const Transactions = () => {
  const [historyData, historyEmpty, initializeHistory, initializeHistoryMore, scroll] = useGetHistory()
  return (
    <>
        <nav className='py-3 px-2 bg-blue-500 drop-shadow mb-2'>
            <p className='text-lg font-bold text-white'>
                Transaksi
            </p>
        </nav>
        <div className='flex items-center gap-2 p-1'>
          <Chip text={"Tambah"} enable={true} /> 
          <Chip text={"Ubah"} enable={false} /> 
        </div>
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
                  {val.transactionType === "add"&&<div className='bg-blue-100 w-fit text-xs text-blue-500 rounded py-0.5 px-1'>Tambah</div>}
                  {val.transactionType === "update"&&<div className='bg-blue-100 border border-blue-500 text-blue-500 rounded p-1'>Ubah</div>}
               </div>
               <p className='text-xs'>{new Date(val.date.seconds * 1000).toLocaleDateString()}, {new Date(val.date.seconds * 1000).toTimeString().split(' ')[0].substring(0,5)} </p>
 
              </div>
            </div>
          ))}
          <div className='flex items-center justify-center'>
          {initializeHistoryMore&&
                <div className='flex justify-center items-center'>
                  <svg role="status" className="w-7 h-7 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
                </div>
            }
            {!initializeHistoryMore&&!historyEmpty&&<ButtonLink linkTo={scroll} newProps={'text-sm'} label={'Selanjutnya'}/>}
          </div>
        </div>
        }
    </>
  )
}

export default Transactions