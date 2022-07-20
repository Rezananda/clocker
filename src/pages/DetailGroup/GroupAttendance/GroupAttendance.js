import React from 'react'
import ListGroupAttendanceInformation from '../../../components/ListGroupAttendanceInformation/ListGroupAttendanceInformation'
import SpinnerLoading from '../../../components/SpinnerLoading/SpinnerLoading'

const GroupAttendance = ({initializeGetAllAttendance, allAttendance}) => {
  console.log(allAttendance)
  return (
    <div className='py-4 px-4'>
        {initializeGetAllAttendance? 
        <SpinnerLoading/>
        :
        <div className='flex flex-col gap-1'>
            {console.log(allAttendance.filter(item => item.status === 'WFO').length)}
            {allAttendance.map((val, index) => 
            <ListGroupAttendanceInformation val={val} key={index}/>
            )}
        </div>
        }
    </div>
  )
}

export default GroupAttendance