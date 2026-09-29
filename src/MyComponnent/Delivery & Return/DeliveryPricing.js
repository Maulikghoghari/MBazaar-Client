import React from 'react';
import './DeliveryPricing.css';
import { FaBox } from "react-icons/fa";
import { BsBoxFill } from "react-icons/bs";

function DeliveryPricing() {
    return (
        <div className="container my-5 bg-light py-5 px-3">

            <div className="d-flex justify-content-center gap-3 mb-3">
                <BsBoxFill className='small-item' />
                <h5 className="m-0 fw-semibold">Small items</h5>
            </div>

            {/* Small Items Section */}
            <div className="row gy-4">
                <div className="col-md-6">
                    <div className="card shadow-sm border-0">
                        <div className="card-header bg-primary text-white fw-semibold">
                            Standard delivery Get it in 3-5 working days
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item d-flex justify-content-between">
                                Orders over $100: All day delivery. Order anytime: <span>FREE</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">
                                Orders under $100: All day delivery. Order anytime: <span>$5</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">
                                Weekday time slot from 12noon - 5pm. Order by 9pm. <span>$10</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card shadow-sm border-0">
                        <div className="card-header bg-primary text-white fw-semibold">
                            Next day delivery Get it next day, 7 days a week
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item d-flex justify-content-between">
                                All day delivery. Order by 9pm. <span>$5</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">
                                Weekday time slot from 12noon - 5pm. Order by 9pm. <span>$10</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="text-center my-4 text-muted">
                What do we mean by small? Just about everything under the sun except for major kitchen/laundry appliances and TVs over 43”.
            </div>

            <div className="d-flex justify-content-center gap-3 mb-3">
                <FaBox className="large-item" />
                <h5 className="m-0 fw-semibold">Large items</h5>
            </div>

            <div className="row gy-4">
                <div className="col-md-6">
                    <div className="card shadow-sm border-0">
                        <div className="card-header bg-primary text-white fw-semibold">
                            Standard delivery Get it in 2 working days
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item d-flex justify-content-between">
                                All day Delivery from 7am - 8pm. Order anytime: <span>From $20</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">
                                Choose a time slot 7am - 11am, 9am - 1pm, 11am - 3pm, 1pm - 5pm. Order anytime: <span>From $35</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card shadow-sm border-0">
                        <div className="card-header bg-primary text-white fw-semibold">
                            Next day delivery it next day on weekdays
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item d-flex justify-content-between">
                                All day delivery from 7am - 8pm. Order by 7pm: <span>From $30</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">
                                Choose a time slot 7am - 11am, 9am - 1pm, 11am - 3pm, 1pm - 5pm. Order by 7pm: <span>From $45</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Description under Large Items */}
            <div className="text-center mt-4 text-muted">
                The big stuff. Major appliances like dishwashers, washing machines, tumble dryers, fridges, freezers, ovens and TVs over 43”.
            </div>
        </div>
    );
}

export default DeliveryPricing;
