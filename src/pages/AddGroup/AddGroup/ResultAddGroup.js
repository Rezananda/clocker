import React from 'react'
import { useNavigate } from 'react-router-dom'
import ButtonOutline from '../../../components/Button/ButtonOutline/ButtonOutline'

const ResultAddGroup = ({groupId}) => {
    const navigate = useNavigate()

  return (
    <div className='flex flex-col gap-4'>
        <div className='flex flex-col items-center justify-center gap-1'>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-green-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </span>
          <p className='text-lg font-bold text-center'>BERHASIL TAMBAH GRUP</p>
          <p className='text-sm text-center'>Salin atau bagikan Kode Grup agar User dapat masuk ke grupmu. </p>
          <div className='flex items-center justify-between bg-blue-50 w-full px-4 py-2 rounded-lg'>
            <div>
              <p className='text-sm'>Kode Grup</p>
              <p className='text-lg font-bold '>{groupId}</p>
            </div>
            <div className='flex items-center gap-1'>
              <a href={`whatsapp://send?text=${groupId}`} data-action="share/whatsapp/share">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
              </a>
            </div>
          </div>
        </div>
        <ButtonOutline handleClick={() => navigate('/')} label="Kembali ke Beranda"/>
    </div>
  )
}

export default ResultAddGroup