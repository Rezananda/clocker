import React from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from '../../../components/Alert/Alert'
import ButtonOutline from '../../../components/Button/ButtonOutline/ButtonOutline'

const Result = () => {
    const navigate = useNavigate()
  return (
    <div className='flex flex-col gap-4'>
        <Alert type={'success'} text="Berhasil menambah kehadiran"/>
        <ButtonOutline label="Kembali ke Kalender" handleClick={() => navigate('/my-date')}/>
    </div>
  )
}

export default Result