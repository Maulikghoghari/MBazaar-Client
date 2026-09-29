import React, { useState, useEffect } from 'react';
import './ProductDetails.css';
import paymentImg from '../Img/payment.png'
import { PiShuffleAngularBold } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";
import { BsShop } from "react-icons/bs";
import { FaTruck } from "react-icons/fa";
import { RiBoxingLine } from "react-icons/ri";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { FaBox } from "react-icons/fa";
import CustomerReview from './CustomerReview';
import RelatedProducts from './RelatedProducts';
import { useParams } from 'react-router-dom';
import { addToCart } from '../redux/cartSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';



const ProductDetail = () => {
  const dispatch = useDispatch();
  const [processor, setProcessor] = useState('');
  const [ram, setRam] = useState('');
  const [storage, setStorage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showArrows, setShowArrows] = useState(false);
  const { id } = useParams(); // id from route like /product/:id
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`http://localhost:4001/product/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch product');
        }
        return res.json();
      })
      .then((data) => setProduct(data))
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!product) {
    return <p>Loading product...</p>;
  }


  const images = [
    product.images.mainImage,
    product.images.subImage1,
    product.images.subImage2,
    product.images.subImage3,
  ].filter(Boolean);


  const handlePrev = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleMouseEnter = () => setShowArrows(true);
  const handleMouseLeave = () => setShowArrows(false);

  const totalCost = product.price * quantity;

  return (
    <>
      <div className="productDetails">
        <div className="container my-5 product-detail pb-5">
          <div className="row">
            {/* Left: Images */}
            <div className="col-md-6">
              <div className="image-gallery-container">
                {/* Thumbnail Scroll */}
                <div className="thumbnails py-2">
                  {images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      className={`thumb ${index === selectedImageIndex ? 'active' : ''}`}
                      onClick={() => setSelectedImageIndex(index)}
                      alt={`Thumb ${index}`}
                    />
                  ))}
                </div>

                {/* Main Image Area */}
                <div
                  className="main-image-container"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {showArrows && (
                    <button className="arrow left" onClick={handlePrev}>
                      &#10094;
                    </button>
                  )}
                  <img
                    src={images[selectedImageIndex]}
                    className="main-image"
                    alt="Main"
                  />
                  {showArrows && (
                    <button className="arrow right" onClick={handleNext}>
                      &#10095;
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Details */}
            <div className="col-md-6 ps-3">
              <h4>{product.title}</h4>
              <p>{product.category}</p>
              <p className="text-warning">⭐⭐⭐⭐⭐ (2 customer reviews)</p>

              <div className='d-flex gap-3'>
                <h6 className='text-secondary old-price mt-2'>Old Price:{product.oldprice}</h6>
                <h3 className="text-primary">Price: ₹{product.price}</h3>
              </div>

              {/* Color Options */}
              <div className="mb-3 d-flex">
                <label className='product-detail-label'><strong>Color:</strong></label>
                <div className="d-flex gap-2 mt-1">
                  <span className="color-dot bg-gold" onClick={() => setColor('gold')} />
                  <span className="color-dot bg-silver" onClick={() => setColor('silver')} />
                  <span className="color-dot bg-gray" onClick={() => setColor('gray')} />
                </div>
              </div>

              {/* Processor */}
              {(product.category === "Business Laptop" || product.category === "Apple MacBook" || product.category === "Gaming Laptop" || product.category === "Ultrabook") && (
                <>
                  {/* Processor */}
                  <div className="mb-3 d-flex">
                    <label className="product-detail-label"><strong>Processors:</strong></label>
                    <div className="d-flex gap-2 flex-wrap mt-1">
                      <button
                        className={`btn btn-outline-secondary ${processor === '8C/16GPU' ? 'active' : ''}`}
                        onClick={() => setProcessor('8C/16GPU')}
                      >
                        8 CPU / 16 GPU
                      </button>
                      <button
                        className={`btn btn-outline-secondary ${processor === '10C/24GPU' ? 'active' : ''}`}
                        onClick={() => setProcessor('10C/24GPU')}
                      >
                        10 CPU / 24 GPU
                      </button>
                    </div>
                  </div>

                  {/* RAM */}
                  <div className="mb-3 d-flex">
                    <label className="product-detail-label"><strong>RAM:</strong></label>
                    <div className="d-flex gap-2">
                      <button
                        className={`btn btn-outline-secondary ${ram === '16GB' ? 'active' : ''}`}
                        onClick={() => setRam('16GB')}
                      >
                        16GB
                      </button>
                      <button
                        className={`btn btn-outline-secondary ${ram === '8GB' ? 'active' : ''}`}
                        onClick={() => setRam('8GB')}
                      >
                        8GB
                      </button>
                    </div>
                  </div>

                  {/* Storage */}
                  <div className="mb-3 d-flex">
                    <label className="product-detail-label"><strong>Storage:</strong></label>
                    <div className="d-flex gap-2 flex-wrap">
                      <button
                        className={`btn btn-outline-secondary ${storage === '256GB' ? 'active' : ''}`}
                        onClick={() => setStorage('256GB')}
                      >
                        256GB SSD
                      </button>
                      <button
                        className={`btn btn-outline-secondary ${storage === '512GB' ? 'active' : ''}`}
                        onClick={() => setStorage('512GB')}
                      >
                        512GB SSD
                      </button>
                      <button
                        className={`btn btn-outline-secondary ${storage === '1TB' ? 'active' : ''}`}
                        onClick={() => setStorage('1TB')}
                      >
                        1TB HDD
                      </button>
                    </div>
                  </div>
                </>
              )}


              {/* Quantity & Buttons */}
              <div className="d-flex flex-column gap-2 mb-3">
                <div className="d-flex align-items-center gap-3">
                  {/* Quantity Selector */}
                  <div className="quantity-control d-flex align-items-center border rounded overflow-hidden">
                    <button
                      className="btn btn-light border-0"
                      onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    >
                      −
                    </button>
                    <div className="px-3">{quantity}</div>
                    <button
                      className="btn btn-light border-0"
                      onClick={() => setQuantity((prev) => prev + 1)}
                    >
                      +
                    </button>
                  </div>

                  {/* Action Buttons */}

                  <button className="btn btn-primary px-4 add-to-card"
                    onClick={() => dispatch(addToCart({ ...product, quantity }))}
                  >
                    <div
                      className="btn-wrapper"
                      onClick={(e) => {
                        e.stopPropagation();

                        const token = localStorage.getItem('token');
                        if (!token) {
                          toast.warning('You are not logged in!');
                          return;
                        }
                        dispatch(addToCart({ ...product, quantity }));
                      }}
                    >
                      Add to Cart
                    </div>
                  </button>

                  <button className="btn btn-success px-4 buy-now">Buy Now</button>
                </div>

                {/* Total Cost */}
                <div>
                  <strong>Total: ₹{totalCost}</strong>
                </div>
              </div>

              <div className="mb-4 compare-wishlist">
                <a href="#"><PiShuffleAngularBold className='me-1 mb-1' />Add to compare</a> | <a href="#"><CiHeart className='me-1 mb-1' />Add to wishlist</a>
              </div>

              {/* Delivery Options */}
              <div className="border rounded p-3 mb-3">
                <p><strong>Delivery Options</strong></p>
                <ul className="list-unstyled">
                  <li> <div className="delivery-option d-flex justify-content-between">
                    <div><BsShop className='list-unstyled-icon' />Pick up from the Woodmart Store </div>
                    <strong>Free</strong>
                  </div>
                  </li>
                  <li>
                    <div className="delivery-option d-flex justify-content-between">
                      <div><FaTruck className='list-unstyled-icon' />Courier delivery - 2-3 Days </div>
                      <strong>Free</strong>
                    </div>
                  </li>
                  <li>
                    <div className="delivery-option d-flex justify-content-between">
                      <div> <RiBoxingLine className='list-unstyled-icon' />DHL Courier - 1-3 Days</div>
                      <strong>Free</strong>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Warranty & Returns */}
              <div className="border rounded p-3 mb-3">
                <div className="waranty d-flex justify-content-between">
                  <p><IoShieldCheckmarkOutline className='list-unstyled-icon' /> Warranty 1 year</p>
                  <a href="">More Details</a>
                </div>
                <div className="return d-flex justify-content-between">
                  <p><FaBox className='list-unstyled-icon' /> Free 30-Day returns</p>
                  <a href="">More Details</a>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="payment-icons d-flex">
                <h6 className='mt-1 me-2'>Payment Method:</h6>
                <img src={paymentImg} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <CustomerReview productId={id} />
      <RelatedProducts />
    </>
  );
};

export default ProductDetail;
