import React from 'react'
import './DeliveryHome.css'
import img1 from '../Img/DeliveryReturn-box.webp'

function DeliveryHome() {
    return (
        <div className="container">
            <div className='our-store'>
                <div className="row p-5">
                    <div className="col-lg-8 pt-3">
                        <h1>Delivery & Return</h1>
                        <p>Free delivery available on 1000s of products over $100. Choose a specific delivery date & time that suits you for an additional fee.</p>
                    </div>
                    <div className="col-lg-4">
                        <img src={img1} className='box-img' alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeliveryHome
