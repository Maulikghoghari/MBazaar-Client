import React from 'react'
import OutletStore from './OutletStore'
import Laptop from './Laptop'
import Tvs from './Tvs'
import SmartPhone from './SmartPhone'
import VacuumCleaners from './VacuumCleaners'
import Info from '../Home/Info'

function Outlet() {
  return (
    <div className='carouselcontainer'>
        <OutletStore/>
        <Laptop/>
        <Tvs/>
        <SmartPhone/>
        <VacuumCleaners/>
        <Info/>
    </div>
  )
}

export default Outlet
