import React from 'react'
import './OurStore.css'
import { MdOutlineShoppingCart } from "react-icons/md";
import { BsShop } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import img1 from '../Img/store-img.webp' 

function OurStore() {
    return (
        <div className="container">
            <div className='our-store'>
                <div className="row p-5">
                <div className="col-lg-6">
                    <h2>Visit Our Stores</h2>
                    <p>You can receive an order from us, find many products with unique discounts, and also, if necessary, contact the service center.</p>
                    <div className="store-service">
                        <div className="convenient-store">
                            <MdOutlineShoppingCart className='our-store-icon' /><br />
                            Convenient store
                        </div>
                        <div className="delivery-point">
                            <BsShop className='our-store-icon' /><br />
                            Delivery point
                        </div>
                        <div className="service-center">
                            <IoSettingsOutline className='our-store-icon' /><br />
                            Service center
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <img src={img1} className='store-img' alt="" />
                </div>
            </div>
            </div>
        </div>
    )
}

export default OurStore
