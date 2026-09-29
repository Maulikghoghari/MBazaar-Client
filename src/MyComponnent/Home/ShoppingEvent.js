import React, { useEffect, useState } from 'react';
import img1 from '../Img/shopping-event.png'
import './ShoppingEvent.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Img1 from "../Img/shopping-event-1.jpg"
import Img2 from "../Img/shopping-event-2.jpg"
import Img3 from "../Img/shopping-event-3.jpg"
import Img4 from "../Img/shopping-event-4.jpg"
import Img5 from "../Img/shopping-event-5.jpg"
import Img6 from "../Img/shopping-event-6.jpg"
import Img7 from "../Img/shopping-event-7.jpg"

import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import Magnet from './Magnet';

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

function ShoppingEvent() {

    const [timeLeft, setTimeLeft] = useState(0);

    const initialSeconds = (3 * 24 * 60 * 60) + (20 * 60 * 60) + (21 * 60);

    useEffect(() => {
        setTimeLeft(initialSeconds);

        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (totalSeconds) => {
        const days = Math.floor(totalSeconds / (60 * 60 * 24));
        const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
        const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
        const seconds = totalSeconds % 60;

        return { days, hours, minutes, seconds };
    };

    const { days, hours, minutes, seconds } = formatTime(timeLeft);

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToScroll: 4,
        slidesToShow: 5,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };


    return (
        <div className='shopping-event'>
            <div className="container pt-4 pb-5">
                <div className="row">
                    <div className="col-md-5">
                        <Magnet padding={80} disabled={false} magnetStrength={80}>
                        <img src={img1} alt="" className='shopping-event-img' />
                        </Magnet>
                    </div>
                    <div className="col-md-7 shopping-event-description">
                        <h2 className='shopping-event-title'>Apple Shopping Event</h2>
                        <p className='shopping-event-desc'>Hurry and get discounts on all Apple devices up to 20%</p>
                        <div className="shopping-event-timer d-flex gap-2 mb-2">
                            <div><strong>{String(days).padStart(2, '0')}</strong><span>Days</span></div>
                            <div><strong>{String(hours).padStart(2, '0')}</strong><span>Hr</span></div>
                            <div><strong>{String(minutes).padStart(2, '0')}</strong><span>Min</span></div>
                            <div><strong>{String(seconds).padStart(2, '0')}</strong><span>Sec</span></div>
                        </div>
                        <a className='btn btn-primary shopping-event-button'>Go Shopping {`>`}</a>
                    </div>
                </div>
                <Slider {...settings}>
                    {[
                        { img: Img1, title: "iPad Mini", price: "$600.00" },
                        { img: Img2, title: "Apple Watch", price: "$799.00" },
                        { img: Img3, title: "Apple", price: "$999.00" },
                        { img: Img4, title: "iPhone 14", price: "$799.00" },
                        { img: Img5, title: "Apple iMac", price: "$1,299.00" },
                        { img: Img6, title: "Apple Drones", price: "$1,100.00" },
                        { img: Img7, title: "Apple iPad", price: "$650.00" },
                    ].map((item, index) => (
                        <div key={index} className="shopping-event-product-card">
                            <img src={item.img} alt={item.title} className="shopping-event-product-img"/>
                            <div className="shopping-event-card-text">
                                <h5 className="product-title">{item.title}</h5>
                                <div className="product-rating">
                                    {Array(5).fill().map((_, i) => (
                                        <i key={i} className="fa fa-star" style={{ color: '#FFD700' }}></i>
                                    ))}
                                </div>
                                <p className="product-price">{item.price}</p>
                            </div>
                        </div>
                    ))}
                </Slider>
                </div>
        </div>
    )
}

export default ShoppingEvent
