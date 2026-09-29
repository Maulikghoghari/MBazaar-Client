import React, { useState } from "react";
import "./PromotionCard.css";
import img1 from '../Img/Promotion-1.webp'
import img2 from '../Img/Promotion-2.webp'
import img3 from '../Img/Promotion-3.webp'
import img4 from '../Img/Promotion-4.webp'
import img5 from '../Img/Promotion-5.webp'
import img6 from '../Img/Promotion-6.webp'
import img7 from '../Img/Promotion-7.webp'
import img8 from '../Img/Promotion-8.webp'
import img9 from '../Img/Promotion-9.webp'


const promotions = [
  {
    id: 1,
    title: "Apple Shopping Event",
    date: "24 Nov – 2 Dec",
    image: img1,
  },
  {
    id: 2,
    title: "Pre-Order Google Pixel 7",
    date: "10 Nov – 28 Nov",
    image: img2,
  },
  {
    id: 3,
    title: "Discount on all Smart appliances up to 25%",
    date: "10 Nov – 28 Nov",
    image: img3,
  }, {
    id: 4,
    title: "Apple Shopping Event",
    date: "24 Nov – 2 Dec",
    image: img4,
  },
  {
    id: 5,
    title: "Pre-Order Google Pixel 7",
    date: "10 Nov – 28 Nov",
    image: img5,
  },
  {
    id: 6,
    title: "Discount on all Smart appliances up to 25%",
    date: "10 Nov – 28 Nov",
    image: img6,
  }, {
    id: 7,
    title: "Apple Shopping Event",
    date: "24 Nov – 2 Dec",
    image: img7,
  },
  {
    id: 8,
    title: "Pre-Order Google Pixel 7",
    date: "10 Nov – 28 Nov",
    image: img8,
  },
  {
    id: 9,
    title: "Discount on all Smart appliances up to 25%",
    date: "10 Nov – 28 Nov",
    image: img9,
  },
];

const PromotionCard = () => {
  return (
    <div className="container my-4">
      <p>CLOTHES THAT TOU LIKE</p>
      <h2 className="mb-4 fw-bold">Promotions</h2>
      <div className="row g-4">
        {promotions.map((el) => (
          <div className="col-md-4" key={el.id}>
            <div className="promo-card">
              <div
                className="promo-img"
                style={{ backgroundImage: `url(${el.image})` }}
              ></div>
              <div className="promo-content">
                <span className="promo-date">{el.date}</span>
                <h5 className="promo-title">{el.title}</h5>
                <button className="promo-btn">Shop Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromotionCard;
