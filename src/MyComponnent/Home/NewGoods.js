import React, { useState, useEffect } from 'react';
import './NewGoods.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Rate } from 'antd';
import nothigimg from '../Img/noting-phone.jpg';
import { RiSearchLine } from "react-icons/ri";
import { IoHeartOutline } from "react-icons/io5";
import { FaShoppingCart } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist } from '../redux/wishlistSlice';
import { toast } from 'react-toastify';

function NewGoods() {
  const history = useHistory();
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
    axios.get('http://localhost:4001/admin/product-findall', {
      headers: { token: token }
    })
      .then((response) => {
        const allProducts = response.data.data;

        const filteredByBestoffer = allProducts
          .filter(product => product.newgoods === true)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 4);

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
    <div className="container pt-5">

      <div className="new-goods d-flex">
        <div className="nothing-phone">
          <div className="noting-phone-text">
            <p>AT A GOOD PRICE</p>
            <h1>Nothing Phone 1</h1>
            <a href="#" className="btn">Buy Now</a>
          </div>
          <img src={nothigimg} className="nothingImg" alt="Nothing Phone 1" />
        </div>



        <div className='pt-5'>
          <div className="d-flex justify-content-between align-items-center mb-4 ms-4">
            <h3 className="section-title m-0">New Goods</h3>
            <button className="more-products-btn" onClick={() => history.push('/outlet')}>
              More Products <span>&rarr;</span>
            </button>
          </div>

          <div className="d-flex flex-wrap new-goods-card">
            {data.map(product => {

              const imageList = [product.mainImage, product.subImage1, product.subImage2, product.subImage3].filter(Boolean);
              const currentImage = imageList[hoverIndexes[product._id] || 0];

              return (
                <div key={product.id} className="card-wrapper mt-2 ms-2"
                  onClick={() => history.push(`/product/${product._id}`)}
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
                          src={`http://localhost:4001/images/${product.category}/${currentImage}`}
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
                      <button className="btn btn-primary card-btn" onClick={(e) => e.stopPropagation()}>
                        Add To Cart &nbsp;<FaShoppingCart />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewGoods

