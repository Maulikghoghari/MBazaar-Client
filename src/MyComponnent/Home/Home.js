import React from 'react'
import Carosel from './Carosel'
import PopularCategory from './PopularCategory'
import BestOffers from './BestOffers'
import NewGoods from './NewGoods'
import ShoppingEvent from './ShoppingEvent'
import HomeAppliance from './HomeAppliance'
import Accessories from './Accessories'
import Info from './Info'
import BackToTop from './BackToTop'
import MouseCurser from './MouseCurser'

function Home() {
  return (
    <div>
        <Carosel />
        <PopularCategory/>       
        <BestOffers/>
        <div id="new-goods-section"><NewGoods/></div>
        <ShoppingEvent/>
        <HomeAppliance/>
        <Accessories/>
        <Info/>
        <BackToTop/>
        <MouseCurser/>
    </div>
  )
}

export default Home
