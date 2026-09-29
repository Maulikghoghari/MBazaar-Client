import React from 'react'
import img1 from '../Img/Accessories-main.jpg'
import './Accessories.css'
import { FaKeyboard } from "react-icons/fa6";
import { FaPenAlt, FaMouse } from "react-icons/fa";
import { MdHeadsetMic } from "react-icons/md";
import Magnet from './Magnet'

function Accessories() {
    return (
        <div className='Accessories mt-5'>
            <div className="container Accessories-container pt-5 pb-5">
                <div className="row">
                    <div className="col-lg-5">
                        <Magnet padding={80} disabled={false} magnetStrength={80}>
                            <img src={img1} alt="" className='Accessories-img' />
                        </Magnet>
                    </div>
                    <div className="col-lg-7 Accessories-description">
                        <h2 className='Accessories-title'>Microsoft Accessories</h2>
                        <p className='Accessories-desc'>Personalize your Surface Pro with Microsoft branded accessories. In the presence of many colors for every taste.</p>
                        <a className='btn btn-light Accessories-button'><FaKeyboard className='me-2 mb-1' />Keyboards</a>
                        <a className='btn btn-light Accessories-button'><FaPenAlt className='me-2 mb-1' />Surface Pen</a>
                        <a className='btn btn-light Accessories-button'><FaMouse className='me-2 mb-1' />Mices</a>
                        <a className='btn btn-light Accessories-button'><MdHeadsetMic className='me-2 mb-1' />Headphones</a>
                    </div>
                </div>
            </div>
            <div className="container mt-3">
                <div className="row d-flex justify-content-evenly">
                    <div className="col-md-3 Xiaomi-card mt-1">
                        <h4>Xiaomi MI 11</h4>
                        <p>Discount up to 30%</p>
                        <a href="" className='btn btn-light'>View Details</a>
                    </div>
                    <div className="col-md-3 printer-card mt-1">
                        <h4>Xiaomi MI 11</h4>
                        <p>Discount up to 30%</p>
                        <a href="" className='btn btn-light'>View Details</a>
                    </div>
                    <div className="col-md-3 remote-card mt-1">
                        <h4>Xiaomi MI 11</h4>
                        <p>Discount up to 30%</p>
                        <a href="" className='btn btn-light'>View Details</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Accessories
