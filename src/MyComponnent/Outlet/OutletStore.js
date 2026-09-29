import React, { useEffect, useState } from 'react';
import './OutletStore.css'
import outletimg from '../Img/outlet.png'

function OutletStore() {
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
    
    
    return (
        <div className='container'>
            <div className='our-store'>
                <div className="row p-5">
                    <div className="col-lg-7">
                        <h1>Outlet Store</h1>
                        <p>Here you will find discounted products that have been found to have minor damage that does not affect performance.</p>
                        <div className="outlet-timer d-flex gap-2 mb-2">
                            <div><strong>{String(days).padStart(2, '0')}</strong><span>Days</span></div>
                            <div><strong>{String(hours).padStart(2, '0')}</strong><span>Hr</span></div>
                            <div><strong>{String(minutes).padStart(2, '0')}</strong><span>Min</span></div>
                            <div><strong>{String(seconds).padStart(2, '0')}</strong><span>Sec</span></div>
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <img src={outletimg} className='box-img' alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OutletStore
