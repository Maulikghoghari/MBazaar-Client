import React from 'react'
import OurStore from './OurStore'
import OnlineStore from './OnlineStore'
import Info from '../Home/Info'

function Stores() {
  return (
    <div className='carouselcontainer'>
      <OurStore/>
      <OnlineStore/>
      <Info/>
    </div>
  )
}

export default Stores
