import React, { useState, useEffect } from 'react'
import axios from 'axios';
import noProduct from '../Img/noProduct.png'
import { Pagination } from 'antd';
import './Product.css'
import Accordion from 'react-bootstrap/Accordion';
import { Slider } from 'antd';
import { Rate } from 'antd';
import { RiSearchLine } from "react-icons/ri";
import { IoHeartOutline } from "react-icons/io5";
import { FaShoppingCart } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist } from '../redux/wishlistSlice'; 

function WindowsTablets() {
   const dispatch = useDispatch();
    const wishlistItems = useSelector(state => state.wishlist.wishlistItems);
  const [priceRange, setPriceRange] = useState([200, 2000]);

  const [hoverIndexes, setHoverIndexes] = useState({});

  const [searchTerm, setSearchTerm] = useState('');

  const handleImageHover = (productId, index) => {
    setHoverIndexes(prev => ({ ...prev, [productId]: index }));
  };

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

  const applyPriceFilter = () => {
    const token = localStorage.getItem("token");

    axios.get('http://localhost:4001/admin/product-findall', {
      headers: { token: token }
    })
      .then((response) => {
        const allProducts = response.data.data;


        const filteredByCategory = allProducts.filter(product =>
          product.category === "Windows Tablets"
        );

        const filteredByPrice = filteredByCategory.filter(product => {
          const price = parseFloat(product.price);
          return price >= priceRange[0] && price <= priceRange[1];
        });

        const filteredBySearch = filteredByPrice.filter(product =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const updatedProducts = filteredBySearch.map(product => {
          const imageList = [
            product.mainImage,
            product.subImage1,
            product.subImage2,
            product.subImage3
          ].filter(Boolean);

          return {
            ...product,
            imageList
          };
        });

        setdata(updatedProducts);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    applyPriceFilter();
  }, [searchTerm, priceRange]);

  useEffect(() => {
    applyPriceFilter();;
  }, [])



  const history = useHistory();
  return (
    <div className="carouselcontainer">
      <div className="container-fluid mb-5">
        <div className="row">
          <div className="col-md-3 bg-light p-3">
            <h5>Filter By Price</h5>
            <Slider
              range={{ draggableTrack: true }}
              defaultValue={[200, 2000]}
              min={0}
              max={5000}
              onChange={(value) => setPriceRange(value)}
            />

            <div className="pricer-filter">
              <p>Price: ${priceRange[0]} – ${priceRange[1]}</p>
              <button className='filter-btn' onClick={applyPriceFilter}>Filter</button>
            </div>
            <Accordion className='mt-3'>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Filtre By Brands</Accordion.Header>
                <Accordion.Body>
                  <h6>Apple</h6>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Model</Accordion.Header>
                <Accordion.Body>
                  <h6>MacBook Air</h6>
                  <h6>MacBook Pro</h6>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>color</Accordion.Header>
                <Accordion.Body>
                  <h6>Gold</h6>
                  <h6>Midnight</h6>
                  <h6>Silver</h6>
                  <h6>Space Gray</h6>
                  <h6>Starlight</h6>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>Screen Diagonal</Accordion.Header>
                <Accordion.Body>
                  <h6>13"</h6>
                  <h6>14"</h6>
                  <h6>16"</h6>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="4">
                <Accordion.Header>Screen Type</Accordion.Header>
                <Accordion.Body>
                  <h6>Retina</h6>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="5">
                <Accordion.Header>Processor</Accordion.Header>
                <Accordion.Body>
                  <h6>M1</h6>
                  <h6>M1 Max</h6>
                  <h6>M1 Pro</h6>
                  <h6>M2</h6>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="6">
                <Accordion.Header>RAM Memory</Accordion.Header>
                <Accordion.Body>
                  <h6>16GB</h6>
                  <h6>24GB</h6>
                  <h6>32GB</h6>
                  <h6>64GB</h6>
                  <h6>8GB</h6>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="7">
                <Accordion.Header>Storage</Accordion.Header>
                <Accordion.Body>
                  <h6>256GB SSD</h6>
                  <h6>512GB SSD</h6>
                  <h6>1TB SSD</h6>
                  <h6>1TB HDD</h6>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="8">
                <Accordion.Header>Release Years</Accordion.Header>
                <Accordion.Body>
                  <h6>2020</h6>
                  <h6>2021</h6>
                  <h6>2022</h6>
                  <h6>2023</h6>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="9">
                <Accordion.Header>Graphics</Accordion.Header>
                <Accordion.Body>
                  <h6>Integrated</h6>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="10">
                <Accordion.Header>Manufacturer Guarantee</Accordion.Header>
                <Accordion.Body>
                  <h6>12 months</h6>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>

          <section className="col-md-9">
            <div className="container-fluid">
              <div className="row mb-4">
                <div className="container">
                  <div className="Product mt-5">
                    <div className="d-flex justify-content-between align-items-center mb-4 mt-3">
                      <h3 className="section-title m-0">Windows Tablets</h3>
                      <div className="search-box d-flex gap-2">
                        <input type="text" name="search" placeholder='Search Product..' className='Search form-control' value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)} id="" />
                        <button className='search-box-btn'>Search</button>
                      </div>
                    </div>

                    {data.length === 0 ? (
                      <div className="no-products text-center p-5">
                        <img src={noProduct} alt="No Product" width="150" />
                        <h4 className="mt-3">No products found in this category</h4>
                        <p>Try changing your filters or come back later.</p>
                      </div>
                    ) : (
                      <div className="d-flex flex-wrap Product-card">
                        {data.map(product => {

                          const currentImage = product.imageList?.[hoverIndexes[product.id] || 0] || product.mainImage;


                          return (
                            <div key={product.id} className="card-wrapper mt-2 ms-2"
                              onClick={() => history.push(`/product/${product.id}`)}
                              onMouseLeave={() => {
                                setHoverIndexes(prev => ({ ...prev, [product.id]: 0 }));
                              }}
                            >
                              <div className="offer-card position-relative">
                                {product.hot && <span className="badge-1 bg-danger position-absolute">HOT</span>}
                                {product.new && <span className="badge-2 bg-success position-absolute">NEW</span>}
                                {product.discount && <span className="badge-3 bg-primary position-absolute">{product.discount}%</span>}

                                <div className="hover-icons">
                                  <RiSearchLine className="icon-btn" />
                                  <IoHeartOutline
                                    className="icon-btn"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      const exists = wishlistItems.some(item => item._id === product._id);
                                      if (!exists) {
                                        dispatch(addToWishlist(product));
                                      }
                                    }}
                                  />
                                </div>


                                <div
                                  onMouseLeave={() =>
                                    setHoverIndexes(prev => ({ ...prev, [product.id]: 0 }))
                                  }
                                >
                                  <div className="Product-card-img">
                                    <img
                                      src={`http://localhost:4001/images/${product.category}/${currentImage}`}
                                      className="card-img-top"
                                      alt={product.title}
                                    />

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
                                  <div className="text-success">
                                    <p className='mb-1' style={{ fontWeight: 'bold', color: product.instock ? 'green' : 'red' }}>
                                      {product.instock ? 'In Stock' : 'Out of Stock'}
                                    </p>
                                  </div>
                                  <h5 className="text-primary">
                                    <span className="text-muted text-decoration-line-through me-2 ms-1">₹{product.oldprice}</span>
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
                    )}
                  </div>
                </div>
              </div>
              <Pagination
                total={100}
                showSizeChanger
                showQuickJumper
                showTotal={total => `Total ${total} items`}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default WindowsTablets
