import React from 'react'
import TopNavbar from '../../components/Navbar/TopNavbar'
import useDarkMode from '../../hooks/UseDarkMode/useDarkMode'

const Settings = () => {
    const [colorTheme, setTheme] = useDarkMode()
    console.log(colorTheme)
  return (
    <div>
        <TopNavbar navbarColor={'bg-blue-500'} label={'Pengaturan'} labelColor={'text-white'} back={true} navigateTo={-1}/>
        <div className='px-4 py-4'>
          <ul className='flex flex-col divide-y bg-white rounded-lg border border-gray-200 dark:bg-slate-800 dark:border-gray-600 dark:divide-gray-600'>
              <li className='py-3 px-4 flex items-center justify-between'>
                  <p className='text-gray-500 font-bold text-sm dark:text-white'>Mode Gelap</p>
                  <button onClick={() => setTheme(colorTheme)} className='bg-blue-500 px-2 py-1 rounded-lg'>{colorTheme === 'dark'? 
                    <p className='text-xl'>
                      🌙
                    </p>
                  :
                    <p className='text-xl'>
                      ☀️
                    </p>
                }</button>
              </li>
          </ul>
        </div>
    </div>
  )
}

export default Settings