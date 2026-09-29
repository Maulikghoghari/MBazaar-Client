import React from 'react'
import './PopularCategory.css'
import Img1 from "../Img/I-phone-removebg-preview.png"
import Img2 from "../Img/Laptops.jpg"
import Img3 from "../Img/motherboard.jpg"
import Img4 from "../Img/camera.jpg"
import Img5 from "../Img/headsets.jpg"
import Img6 from "../Img/drones.jpg"
import Img7 from "../Img/Apple-Ipad.jpg"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Magnet from './Magnet'

import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

function NextArrow(props) {
    const { className, onClick } = props;
    return (
        <div className={className} onClick={onClick}>
            <BiChevronRight size={30} color="black" />
        </div>
    );
}

function PrevArrow(props) {
    const { className, onClick } = props;
    return (
        <div className={className} onClick={onClick}>
            <BiChevronLeft size={30} color="black" />
        </div>
    );
}


function PopularCategory() {
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToScroll: 4,
        slidesToShow: 4,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };
    return (
        <div className="container">
            <div className="slider-container">
                <h2 className='category-title'>Popular Categories</h2>
                <Slider {...settings}>
                    <div>
                        <div className="card">
                            <div className="card-img">
                                <Magnet padding={80} disabled={false} magnetStrength={80}>
                                    <img src={Img1} alt="" />
                                </Magnet>
                            </div>
                            <h5 className="card-title">Iphone</h5>
                            <p className="card-desc">8 Product</p>
                        </div>
                    </div>
                    <div>
                        <div className="card">
                            <div className="card-img">
                                <Magnet padding={80} disabled={false} magnetStrength={80}>
                                    <img src={Img2} alt="" />
                                </Magnet>
                            </div>
                            <h5 className="card-title">Apple MacBook</h5>
                            <p className="card-desc">8 Product</p>
                        </div>
                    </div>
                    <div>
                        <div className="card">
                            <div className="card-img">
                                <Magnet padding={80} disabled={false} magnetStrength={80}>
                                    <img src={Img3} alt="" />
                                </Magnet>
                            </div>
                            <h5 className="card-title">Motherboards</h5>
                            <p className="card-desc">8 Product</p>
                        </div>
                    </div>
                    <div>
                        <div className="card">
                            <div className="card-img">
                                <Magnet padding={80} disabled={false} magnetStrength={80}>
                                    <img src={Img4} alt="" />
                                </Magnet>
                            </div>
                            <h5 className="card-title">Mirrorless Cameras</h5>
                            <p className="card-desc">8 Product</p>
                        </div>
                    </div>
                    <div>
                        <div className="card">
                            <div className="card-img">
                                <Magnet padding={80} disabled={false} magnetStrength={80}>
                                    <img src={Img5} alt="" />
                                </Magnet>
                            </div>
                            <h5 className="card-title">headsets</h5>
                            <p className="card-desc">8 Product</p>
                        </div>
                    </div>
                    <div>
                        <div className="card">
                            <div className="card-img">
                                <Magnet padding={80} disabled={false} magnetStrength={80}>
                                    <img src={Img6} alt="" />
                                </Magnet>
                            </div>

                            <h5 className="card-title">Drones</h5>
                            <p className="card-desc">8 Product</p>
                        </div>
                    </div>
                    <div>
                        <div className="card">
                            <div className="card-img">
                                <Magnet padding={80} disabled={false} magnetStrength={80}>
                                    <img src={Img7} alt="" />
                                </Magnet>
                            </div>
                            <h5 className="card-title">Apple Ipad</h5>
                            <p className="card-desc">8 Product</p>
                        </div>
                    </div>
                </Slider>
            </div>
        </div>
    )
}

export default PopularCategory
