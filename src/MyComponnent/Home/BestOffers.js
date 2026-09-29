// BestOffers.js
import React, { useState, useEffect } from 'react';
import './BestOffers.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Rate } from 'antd';
import { RiSearchLine } from "react-icons/ri";
import { IoHeartOutline } from "react-icons/io5";
import { FaShoppingCart } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist } from '../redux/wishlistSlice';
import { toast } from 'react-toastify';

const BestOffers = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(state => state.wishlist.wishlistItems);
  const history = useHistory();
  // Key: card index (number) — avoids MongoDB ObjectId coercion bug
  const [hoverIndexes, setHoverIndexes] = useState({});
  const [data, setdata] = useState([]);

  const getdata = () => {
    const token = localStorage.getItem("token");
    axios.get('http://localhost:4001/admin/product-findall', {
      headers: { token: token }
    })
      .then((response) => {
        const allProducts = response.data.data;
        const filteredByBestoffer = allProducts
          .filter(product => product.bestoffer === true)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);
        setdata(filteredByBestoffer);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getdata();
  }, [])

  return (
    <div className="container">
      <div className="best-offer">
        <div className="d-flex justify-content-between align-items-center mb-4 mt-3">
          <h3 className="section-title m-0">The Best Offers</h3>
          <button className="more-products-btn" onClick={() => history.push('/outlet')}>
            More Products <span>&rarr;</span>
          </button>
        </div>

        <div className="d-flex flex-wrap best-offer-card">
          {data.map((product, cardIndex) => {
            const imageList = [
              product.mainImage,
              product.subImage1,
              product.subImage2,
              product.subImage3
            ].filter(Boolean);

            // Use cardIndex as key — never suffers from ObjectId coercion
            const activeImgIdx = hoverIndexes[cardIndex] ?? 0;
            const currentImage = imageList[activeImgIdx] || imageList[0];

            return (
              <div
                key={String(product._id) || cardIndex}
                className="card-wrapper mt-2 ms-2"
                onClick={() => history.push(`/product/${product._id}`)}
                onMouseLeave={() =>
                  setHoverIndexes(prev => ({ ...prev, [cardIndex]: 0 }))
                }
              >
                <div className="offer-card position-relative">

                  {/* Badges */}
                  <div className="badge-container position-absolute">
                    {product.hot && <span className="badge bg-danger">HOT</span>}
                    {product.isnew && <span className="badge bg-success">NEW</span>}
                    {product.discount && <span className="badge bg-primary">{product.discount}</span>}
                  </div>

                  {/* Hover action icons */}
                  <div className="hover-icons">
                    <IoHeartOutline
                      className="icon-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        const token = localStorage.getItem('token');
                        if (!token) { toast.warning('You are not logged in!'); return; }
                        const exists = wishlistItems.some(item => item._id === product._id);
                        if (!exists) dispatch(addToWishlist(product));
                      }}
                    />
                    <RiSearchLine
                      className="icon-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        history.push(`/product/${product._id}`);
                      }}
                    />
                  </div>

                  {/* Image area — fixed height, never changes */}
                  <div className="best-offer-card-img">
                    <img
                      src={`http://localhost:4001/images/${product.category}/${currentImage}`}
                      alt={product.title}
                      className="card-img-top"
                      onError={(e) => { e.target.style.opacity = '0.2'; }}
                    />
                  </div>

                  {/* Sub-image dot indicators */}
                  {imageList.length > 1 && (
                    <div className="img-indicators d-flex justify-content-center gap-2 mt-2 mb-1">
                      {imageList.map((_, idx) => (
                        <div
                          key={idx}
                          className={`img-dot ${activeImgIdx === idx ? 'active' : ''}`}
                          onMouseEnter={(e) => {
                            e.stopPropagation();
                            setHoverIndexes(prev => ({ ...prev, [cardIndex]: idx }));
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Card body — flex column so all rows align uniformly */}
                  <div className="card-body d-flex flex-column">
                    <div className="card-title-area">
                      <h6 className="card-title mb-0">{product.title}</h6>
                      <small className="text-muted">{product.category}</small>
                    </div>
                    <div className="card-rating-area">
                      <Rate disabled defaultValue={5} />
                    </div>
                    <div className="card-stock-area">
                      <span className="text-success">&#10003; In stock</span>
                    </div>
                    <div className="card-price-area">
                      <span className="text-muted text-decoration-line-through me-2">₹{product.oldprice}</span>
                      <span className="text-primary fw-bold fs-5">₹{product.price}</span>
                    </div>
                    <div className="card-btn-area">
                      <button
                        className="btn btn-primary card-btn"
                        onClick={(e) => { e.stopPropagation(); }}
                      >
                        Add To Cart &nbsp;<FaShoppingCart />
                      </button>
                    </div>
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

export default BestOffers;
