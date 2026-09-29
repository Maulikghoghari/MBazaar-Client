import React from 'react';
import './DeliveryOption..css';
import stapImg1 from '../Img/icon-1.svg';
import stapImg2 from '../Img/icon-2.svg';
import stapImg3 from '../Img/icon-3.svg';
import stapImg4 from '../Img/icon-4.svg';

function DeliveryOptions() {
    return (
        <div className="container my-5 bg-light py-5 px-3">
            <h3 className="fw-bold mb-3">Delivery Options Overview</h3>
            <p className="text-muted">
                WoodMart offers ideal shipping methods for any requirement. Be it low priced through DHL/Standard Parcel Post, more quickly via DHL Express (Germany only) or UPS, or especially reliable and secure by a specifically trained freight forwarder. And in addition you can also pick up your order yourself at our Shop if you prefer. On this page you´ll find an overview of all available shipping.
            </p>

            <div className="row gy-4 mt-4">
                {/* Step 1 */}
                <div className="col-md-3 col-sm-6">
                    <div className="delivery-step p-4 text-center shadow-sm rounded">
                        <img src={stapImg1} alt="Step 1" className="img-fluid mb-3" />
                        <p className="fw-medium">1. Order the Product and Specify the Delivery Method</p>
                    </div>
                </div>

                {/* Step 2 */}
                <div className="col-md-3 col-sm-6">
                    <div className="delivery-step p-4 text-center shadow-sm rounded">
                        <img src={stapImg2} alt="Step 2" className="img-fluid mb-3" />
                        <p className="fw-medium">2. You Will Receive an Order Confirmation Message</p>
                    </div>
                </div>

                {/* Step 3 */}
                <div className="col-md-3 col-sm-6">
                    <div className="delivery-step p-4 text-center shadow-sm rounded">
                        <img src={stapImg3} alt="Step 3" className="img-fluid mb-3" />
                        <p className="fw-medium">3. Wait for Your Order to Arrive</p>
                    </div>
                </div>

                {/* Step 4 */}
                <div className="col-md-3 col-sm-6">
                    <div className="delivery-step p-4 text-center shadow-sm rounded">
                        <img src={stapImg4} alt="Step 4" className="img-fluid mb-3" />
                        <p className="fw-medium">4. Pick up Your Order at The Checkout Area</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeliveryOptions;
