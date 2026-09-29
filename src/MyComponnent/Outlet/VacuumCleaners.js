// BestOffers.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Laptop.css'
import { Rate } from 'antd';
import img1 from '../Img/vaccum-1.webp'
import img2 from '../Img/vaccume-2.webp'
import img3 from '../Img/vaccume-3.webp'
import img4 from '../Img/vaccume-4.webp'
import { RiSearchLine } from "react-icons/ri";
import { IoHeartOutline } from "react-icons/io5";
import { FaShoppingCart } from 'react-icons/fa';

const products = [
  {
    id: 1,
    title: "Apple MacBook Pro 16″",
    category: 'Apple MacBook',
    imageList: [img1, img1, img2, img4],
    price: '$2,499.00',
    hot: true,
    new: true,
    discount: false,
  },
  {
    id: 2,
    title: "Oculus Quest 2",
    category: 'VR Headsets',
   imageList: [img2, img1, img2, img4],
    price: '$1,600.00',
    hot: false,
    new: false,
    discount: '-10%',
  },
  {
    id: 3,
    title: "Asus GeForce GTX 1660",
    category: 'Graphics Cards',
    imageList: [img3, img1, img2, img4],
    oldPrice: '$400.00',
    price: '$300.00',
    hot: false,
    new: true,
    discount: '-15%',
  }, {
    id: 4,
    title: "Samsung Neo QLED",
    category: 'OLED TV',
    imageList: [img4, img1, img2, img4],
    price: '$1,600.00',
    hot: true,
    new: false,
    discount: false,
  }
];

const VacuumCleaners = () => {

  const [hoverIndexes, setHoverIndexes] = useState({});

  const handleImageHover = (productId, index) => {
    setHoverIndexes(prev => ({ ...prev, [productId]: index }));
  };

  return (
    <div className="container">
      <div className="laptop mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4 mt-3">
          <h3 className="section-title m-0">TVs</h3>
          <button className="more-products-btn">
            More Products <span>&rarr;</span>
          </button>
        </div>

        <div className="d-flex flex-wrap laptop-card">
          {products.map(product => {

            const currentImage = product.imageList?.[hoverIndexes[product.id] || 0] || product.image;


            return (
              <div key={product.id} className="card-wrapper mt-2 ms-2"
                onMouseLeave={() => {
                  setHoverIndexes(prev => ({ ...prev, [product.id]: 0 }));
                }}
              >
                <div className="offer-card position-relative">
                  {product.hot && <span className="badge-1 bg-danger position-absolute">HOT</span>}
                  {product.new && <span className="badge-2 bg-success position-absolute">NEW</span>}
                  {product.discount && <span className="badge-3 bg-primary position-absolute">{product.discount}</span>}

                  <div className="hover-icons">
                    <RiSearchLine className="icon-btn" />
                    <IoHeartOutline className="icon-btn" />
                  </div>


                  <div
                    onMouseLeave={() =>
                      setHoverIndexes(prev => ({ ...prev, [product.id]: 0 }))
                    }
                  >
                    <div className="laptop-card-img">
                      <img src={currentImage} className="card-img-top" alt={product.title} />
                    </div>

                    {product.imageList && (
                      <div className="img-indicators d-flex justify-content-center gap-2 mt-2">
                        {product.imageList.map((_, idx) => (
                          <div
                            key={idx}
                            className={`img-dot ${hoverIndexes[product.id] === idx ? 'active' : ''}`}
                            onMouseEnter={() => handleImageHover(product.id, idx)}
                          />
                        ))}
                      </div>
                    )}
                  </div>



                  <div className="card-body">
                    <h6 className="card-title mb-1">{product.title}</h6>
                    <small className="text-muted">{product.category}</small>
                    <div className="text-warning">
                      <Rate disabled defaultValue={5} />
                    </div>
                    <div className="text-success mb-2">
                      <i className="bi bi-check2-circle"></i> In stock
                    </div>
                    <h5 className="text-primary">
                      <span className="text-muted text-decoration-line-through me-2">{product.oldPrice}</span>
                      {product.price}
                    </h5>
                    <button className="btn btn-primary card-btn hover-btn">
                      <span className="btn-text">Add To Cart</span>
                      <FaShoppingCart className="btn-icon" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VacuumCleaners;
