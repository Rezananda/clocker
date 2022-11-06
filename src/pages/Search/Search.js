import React from 'react'
import TopNavbar from '../../components/Navbar/TopNavbar'

const Search = () => {

  return (
    <div>
        <TopNavbar navbarColor={'bg-blue-500'} label={'Cari Kehadiran'} labelColor={'text-white'} back={true} navigateTo={'/detail-group'}/>
    </div>
  )
}

export default Search