import React from 'react'
import ButtonFill from "../../../components/Button/ButtonFill/ButtonFill"

const ChoosePackage = ({handleStepAddGroup, setPacket}) => {
  return (
    <div className='flex flex-col gap-4 px-4'>
        <div>
          <p className='text-lg font-bold mb-2 text-blue-500 text-center'>Pilih Paket</p>
          <input onChange={() => setPacket('standar')} className="sr-only peer" type="radio" value="standar" name="packet" id="GabungGrup"/>
          <label className="flex justify-center items-center p-8 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-blue-100 peer-checked:ring-blue-500 peer-checked:ring-2 peer-checked:border-transparent peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white" htmlFor="GabungGrup">Standar</label>
        </div>
        <div>
            <input onChange={() => setPacket('premium')} className="sr-only peer" type="radio" value="premium" name="packet" id="BuatGrup"/>
            <label className="flex justify-center items-center p-8 bg-white border border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:bg-blue-100 peer-checked:ring-blue-500 peer-checked:ring-2 peer-checked:border-transparent peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white" htmlFor="BuatGrup">Premium</label>
        </div>
        <div className='w-full border-t border-gray-300'></div>
        <ButtonFill handleClick={()=> handleStepAddGroup("next")} label="Lanjut"/>
    </div>
  )
}

export default ChoosePackage