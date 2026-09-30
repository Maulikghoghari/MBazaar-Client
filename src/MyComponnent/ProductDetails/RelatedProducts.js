import React, { useState } from 'react';
import '../Home/BestOffers.css';
import { Rate } from 'antd';
import { RiSearchLine } from "react-icons/ri";
import { IoHeartOutline } from "react-icons/io5";
import { FaShoppingCart } from 'react-icons/fa';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist } from '../redux/wishlistSlice';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../../config';


function RelatedProducts() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(state => state.wishlist.wishlistItems);
  const [hoverIndexes, setHoverIndexes] = useState({});
  const [data, setdata] = useState([
    {
      title: '',
      category: '',
      oldprice: '',
      price: '',
      hot: '',
      isnew: '',
      instock: '',
      bestoffer: '',
      discount: '',
      mainImage: '',
      subImage1: '',
      subImage2: '',
      subImage3: '',
    }
  ])

  const handleImageHover = (productId, index) => {
    setHoverIndexes(prev => ({
      ...prev,
      [productId]: index
    }));
  };

  const getdata = () => {
    const token = localStorage.getItem("token");
    axios.get(`${API_BASE_URL}/admin/product-findall`, {
      headers: { token: token }
    })
      .then((response) => {
        const allProducts = response.data.data;

        const filteredByBestoffer = allProducts
          .filter(product => product.isnew === true)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);

        setdata(filteredByBestoffer);
        console.log("Filtered latest 5 best offer products:", filteredByBestoffer);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  useEffect(() => {
    getdata();;
  }, [])

  return (
    <div className="container mt-5 pb-5">
      <div className="best-offer">
        <div className="d-flex justify-content-between align-items-center mb-4 mt-3">
          <h2 className="section-title ps-3">Related Products</h2>
        </div>

        <div className="d-flex flex-wrap best-offer-card">
          {data.map(product => {

            const imageList = [product.mainImage, product.subImage1, product.subImage2, product.subImage3].filter(Boolean);
            const currentImage = imageList[hoverIndexes[product._id] || 0];
            return (
              <div key={product._id} className="card-wrapper mt-2 ms-2"
                onMouseLeave={() => {
                  setHoverIndexes(prev => ({ ...prev, [product._id]: 0 }));
                }}
              >
                <div className="offer-card position-relative">
                  <div className="badge-container position-absolute">
                    {product.hot && <span className="badge bg-danger">HOT</span>}
                    {product.isnew && <span className="badge bg-success">NEW</span>}
                    {product.discount && <span className="badge bg-primary">{product.discount}</span>}
                  </div>

                  <div className="hover-icons">
                    <IoHeartOutline
                        className="icon-btn"
                        onClick={(e) => {
                          e.stopPropagation();

                          const token = localStorage.getItem('token');
                          if (!token) {
                            toast.warning('You are not logged in!');
                            return;
                          }
                          dispatch(addToWishlist(product));


                          const exists = wishlistItems.some(item => item._id === product._id);
                          if (!exists) {
                            dispatch(addToWishlist(product));
                          }
                        }}
                      />


                    <RiSearchLine
                      className="icon-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log("Search Clicked for", product.title);
                      }}
                    />
                  </div>

                  <div
                    onMouseLeave={() =>
                      setHoverIndexes(prev => ({ ...prev, [product.id]: 0 }))
                    }
                  >
                    <div className="new-goods-card-img">
                      <img
                        src={`${API_BASE_URL}/images/${product.category}/${currentImage}`}
                        alt={product.title}
                        className="card-img-top"
                      />
                    </div>

                    {imageList && (
                      <div className="img-indicators d-flex justify-content-center gap-2 mt-2">
                        {imageList.map((_, idx) => (
                          <div
                            key={idx}
                            className={`img-dot ${hoverIndexes[product._id] === idx ? 'active' : ''}`}
                            onMouseEnter={() => handleImageHover(product._id, idx)}
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
                      <span className="text-muted text-decoration-line-through me-2">₹{product.oldprice}</span>
                      ₹{product.price}
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
  )
}

export default RelatedProducts
