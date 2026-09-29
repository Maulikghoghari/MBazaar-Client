import './Carosel.css';
import React, { useEffect, useState } from 'react';
import { Carousel } from 'antd';
import img1 from '../Img/home-carosel-1.jpg';
import img2 from '../Img/home-carosel-2.jpg';
import img3 from '../Img/home-carosel-3.jpg';
import headsetImg from '../Img/headset-card.jpg';
import gameImg from '../Img/game-card.jpg';
import cameraImg from '../Img/camera-card.jpg';

function Carosel() {
    const [timeLeft, setTimeLeft] = useState(0);

    const scrollToNewGoods = () => {
        const section = document.getElementById('new-goods-section');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

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

    return (
        <div className="carouselcontainer">
            <div className="container">

                <div className="row">
                    <div className="col-lg-6">

                        <Carousel autoplay className="custom-carousel">
                            <div className="carousel-slide-1">
                                <div className="slide-content-1">
                                    <div className="slide-text-1">
                                        <h1>The new Google Pixel 7</h1>
                                        <p>Shop great deals on MacBook, iPad, iPhone and more.</p>
                                        <a className="btn btn-primary fw-bold px-2 py-1" onClick={scrollToNewGoods} style={{cursor:'pointer'}}>Shop Now</a>
                                    </div>
                                        <img
                                            src={img1} className='carousel-image'
                                            alt="Pixel 7"
                                        />
                                </div>
                            </div>
                            <div className="carousel-slide-2">
                                <div className="slide-content-2">
                                    <div className="slide-text-2">
                                        <h1>The new Google Pixel 7</h1>
                                        <p>Shop great deals on MacBook, iPad, iPhone and more.</p>
                                        <a className="btn btn-primary fw-bold px-2 py-1" onClick={scrollToNewGoods} style={{cursor:'pointer'}}>Pre-Order Now</a>
                                    </div>
                                    <img
                                        src={img2} className='carousel-image'
                                        alt="Pixel 7"
                                    />
                                </div>
                            </div>
                            <div className="carousel-slide-3">
                                <div className="slide-content-3">
                                    <div className="slide-text-3">
                                        <h1>The new Google Pixel 7</h1>
                                        <p>Shop great deals on MacBook, iPad, iPhone and more.</p>
                                        <a className="btn btn-primary fw-bold px-2 py-1" onClick={scrollToNewGoods} style={{cursor:'pointer'}}>Shop Now</a>
                                    </div>
                                    
                                    <img
                                        src={img3} className='carousel-image'
                                        alt="Pixel 7"
                                    />
                                </div>
                            </div>
                        </Carousel>
                    </div>
                    <div className="col-lg-6">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-12 rigth-block">
                                    <div className="bg-no-overlay"
                                        style={{
                                            backgroundImage: `url(${headsetImg})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                        }}
                                    >
                                        <h2 className='text-dark'>Aurora Headset</h2>
                                        <div className="timer d-flex gap-2 mb-2">
                                            <div><strong>{String(days).padStart(2, '0')}</strong><span>Days</span></div>
                                            <div><strong>{String(hours).padStart(2, '0')}</strong><span>Hr</span></div>
                                            <div><strong>{String(minutes).padStart(2, '0')}</strong><span>Min</span></div>
                                            <div><strong>{String(seconds).padStart(2, '0')}</strong><span>Sec</span></div>
                                        </div>
                                        <a className='btn btn-primary' onClick={scrollToNewGoods} style={{cursor:'pointer'}}>Buy Now</a>
                                    </div>
                                </div>
                                <div className="container-fluid ps-0 pe-0">
                                    <div className="row mt-3">
                                        <div className="col-lg-6">
                                            <div
                                                className="text-white bg-cover"
                                                style={{
                                                    backgroundImage: `url(${gameImg})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center'
                                                }}
                                            >
                                                <h5>New Dual Sense</h5>
                                                <p>For PlayStation 5</p>
                                                <a className="btn btn-light" onClick={scrollToNewGoods} style={{cursor:'pointer'}}>View Details</a>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 camera-box">
                                            <div
                                                className="text-white bg-cover"
                                                style={{
                                                    backgroundImage: `url(${cameraImg})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                }}
                                            >
                                                <h5>Instant Cameras</h5>
                                                <p>Get photo paper as a gift</p>
                                                <a className="btn btn-light" onClick={scrollToNewGoods} style={{cursor:'pointer'}}>View Details</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Carosel;
