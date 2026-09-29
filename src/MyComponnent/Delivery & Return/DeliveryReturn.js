import React from 'react'
import DeliveryHome from './DeliveryHome'
import DeliveryOption from './DeliveryOption'
import DeliveryPricing from './DeliveryPricing'
import ExchangeAndReturn from './ExchangeAndReturn'
import FaqsAccodian from './FaqsAccodian'
import Info from '../Home/Info'

function DeliveryReturn() {
  return (
    <div className='carouselcontainer'>
      <DeliveryHome/>
      <DeliveryOption/>
      <DeliveryPricing/>
      <ExchangeAndReturn/>
      <FaqsAccodian/>
      <Info/>
    </div>
  )
}

export default DeliveryReturn
