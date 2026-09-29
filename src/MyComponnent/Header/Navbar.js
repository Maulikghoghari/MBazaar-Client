import React, { useState, useEffect } from 'react'
import './Navbar.css'
import { useLocation, useHistory } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import logoImg from '../Img/logo.png';
import { Navbar, Container, FormControl, Button } from 'react-bootstrap';
import { FaSearch, FaPhoneAlt, FaGlobeAmericas, FaBars, FaUser, FaRandom, FaHeart, FaShoppingCart } from 'react-icons/fa';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaRegEye, FaAngleDown } from "react-icons/fa";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Form as BootstrapForm } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CiLogout } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../redux/cartSlice';
import { clearCart } from '../redux/cartSlice';
import { clearWishlist } from '../redux/wishlistSlice';

function Navbar1({ setIsSidebarVisible, name, }) {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(state => state.wishlist.wishlistItems);
  const [showNavBottom, setShowNavBottom] = useState(true);
  const [showNavTop, setShowNavTop] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
  const [visible, setVisible] = useState(true);
  const cartItems = useSelector(state => state.cart?.cartItems || []);
  const total = (cartItems || []).reduce((sum, item) => sum + item.price, 0);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      setShowNavTop(currentScrollPos >= 0);

      if (currentScrollPos > prevScrollPos && currentScrollPos > 80) {
        setShowNavBottom(false);
      } else {
        setShowNavBottom(true);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const history = useHistory();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  const location = useLocation();

  const [login, setlogin] = useState(false);
  const loginhandleClose = () => setlogin(false);
  const logintoggleShow = () => {
    if (location.pathname !== '/login' && location.pathname !== '/signup') {
      setlogin((l) => !l);
    }
  };

  const [showPassword, setShowPassword] = useState(false);


  // login validation
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required'),
  });

  const isLoggedIn = !!localStorage.getItem("token");


  // user name store and show
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUsername(null);
    toast.success("Logged out successfully!");
    history.push('/');
    dispatch(clearCart());
    dispatch(clearWishlist());
    localStorage.removeItem('token');
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <div className={`header d-none d-lg-block ${visible ? "navbar-visible" : "navbar-hidden"}`}>
        {showNavTop && (
          <Navbar collapseOnSelect expand="lg" className={`nav-top bg-light ${showNavTop ? 'visible' : 'hidden'}`}
          >
            <div className="container-fluid d-flex justify-content-between align-items-center">
              <Navbar.Toggle aria-controls="responsive-navbar-nav" className="custom-toggle" />

              <Nav.Link className="nav-top-link d-xs-none">
                <img src={logoImg} alt="logo" height="50px" onClick={() => { history.push("/") }} className="pb-1" />
              </Nav.Link>

              <div className="searchbar-container d-flex justify-content-between flex-grow-1 ms-4 me-2">
                <div className="search-input-wrapper">
                  <input type="text" placeholder="Search for products" className="search-input" />
                  <button className="search-button">
                    <FaSearch />
                  </button>
                </div>

                <div className="info-section ms-4">
                  <div className="info-item me-3">
                    <FaPhoneAlt className="info-icon" />
                    <div>
                      <p className="info-title mb-0">24 Support</p>
                      <a href="tel:+12123340212" className="info-link">+1 212-334-0212</a>
                    </div>
                  </div>

                  <div className="info-item">
                    <FaGlobeAmericas className="info-icon" />
                    <div>
                      <p className="info-title mb-0">Worldwide</p>
                      <a href="#" className="info-link">Free Shipping</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Navbar>
        )}


        <div className={`nav-bottom ${showNavBottom ? "navbar-visible" : "navbar-hidden"} d-none d-lg-block`}>
          <div className="topmenu-container">
            {/* Left Menu */}
            <div className="left-menu">
              <button
                className="category-button"
                onClick={() => setIsSidebarVisible(true)}
                onMouseLeave={() => setIsSidebarVisible(false)}
              >
                <FaBars className="icon" />
                <span className='All-Categories'>All Categories</span>
              </button>

              <nav className="nav-links">
                <a onClick={() => history.push('/promotion')}>Promotions</a>
                <a onClick={() => history.push('/store')}>Stores</a>
                <a onClick={() => history.push('/deliveryReturn')}>Delivery & Return</a>
                <a onClick={() => history.push('/outlet')}>Outlet</a>
              </nav>
            </div>

            {/* Right Menu */}
            <div className="right-menu">
              <div className="icon-wrapper">
                <div className="circle-icon">
                  {username ? (
                    <div className="user-dropdown">
                      <div className="username-display" onClick={() => setDropdownOpen(!dropdownOpen)}>
                        {username} <FaAngleDown className='mt-2 ms-2 me-2' />
                      </div>
                      {dropdownOpen && (
                        <div className="dropdown-options">
                          <button onClick={() => history.push("/profile")}><FaRegUser className="me-2 mb-1" />Profile</button>
                          <button onClick={handleLogout}><CiLogout className="me-2 mb-1" />Logout</button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <FaUser onClick={logintoggleShow} />
                  )}
                  <Offcanvas show={login} onHide={loginhandleClose} scroll={true} backdrop={true} placement="end">
                    <Offcanvas.Header closeButton>
                      <Offcanvas.Title><strong>Sign in</strong></Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                      <Formik
                        initialValues={{ email: '', password: '', remember: false }}
                        validationSchema={validationSchema}
                        onSubmit={(values, { setSubmitting }) => {
                          axios.post('http://localhost:4001/login', values)
                            .then(function (response) {
                              console.log("Login response:", response.data);

                              localStorage.setItem("token", response.data.token);
                              localStorage.setItem("username", response.data.username);
                              setUsername(response.data.username);

                              loginhandleClose();
                              toast.success("Logged in successfully!");
                              history.push('/');
                            })
                            .catch(function (error) {
                              console.log(error);
                            })
                            .finally(() => {
                              setSubmitting(false);
                            });
                        }}
                      >
                        {({ handleChange, handleBlur, values }) => (
                          <Form>
                            <BootstrapForm.Group className="mb-3">
                              <BootstrapForm.Label>Email address <span className="text-danger">*</span></BootstrapForm.Label>
                              <Field
                                name="email"
                                type="text"
                                className="form-control"
                                placeholder="Enter email"
                              />
                              <div className="text-danger">
                                <ErrorMessage name="email" />
                              </div>
                            </BootstrapForm.Group>

                            <BootstrapForm.Group className="mb-3">
                              <BootstrapForm.Label>Password <span className="text-danger">*</span></BootstrapForm.Label>
                              <div className="position-relative">
                                <Field
                                  name="password"
                                  type={showPassword ? 'text' : 'password'}
                                  className="form-control"
                                  placeholder="Enter password"
                                />
                                <span
                                  className="position-absolute end-0 top-50 translate-middle-y pe-3"
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  <FaRegEye />
                                </span>
                              </div>
                              <div className="text-danger">
                                <ErrorMessage name="password" />
                              </div>
                            </BootstrapForm.Group>

                            <Button variant="primary" type="submit" className="w-100 mb-3">
                              Log In
                            </Button>

                            <div className="d-flex justify-content-between align-items-center mb-4">
                              <BootstrapForm.Check
                                type="checkbox"
                                label="Remember me"
                                name="remember"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                checked={values.remember}
                              />
                              <a href="#" className="text-primary">Lost your password?</a>
                            </div>

                            <div className="text-center">
                              <div><strong>No account yet?</strong></div>
                              <h6
                                onClick={() => {
                                  loginhandleClose();
                                  history.push("/signup");
                                }}
                                className="text-primary create-account"
                                style={{ cursor: 'pointer' }}
                              >
                                Create An Account
                              </h6>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </Offcanvas.Body>
                  </Offcanvas>
                </div>
                <div className="circle-icon">
                  <FaHeart onClick={() => { history.push('/wishlist') }} />
                  <span className="count">{wishlistItems.length}</span>
                </div>
                <div className="circle-icon cart">
                  <FaShoppingCart onClick={toggleShow} />
                  <Offcanvas show={show} onHide={handleClose} scroll={true} backdrop={true} placement="end">
                    <Offcanvas.Header closeButton>
                      <Offcanvas.Title>Shopping cart</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body >
                      <div className="cart-body text-center">
                        {cartItems.length > 0 ? (
                          <>
                            <div className="cart-container">
                              {cartItems.map((item) => (
                                <div key={item._id} className="card m-1 shadow-sm border-0">
                                  <div className="row g-0 align-items-center">
                                    <div className="col-auto">
                                      <img
                                        src={`http://localhost:4001/images/${encodeURIComponent(item.category)}/${item.mainImage}`}
                                        alt="Product"
                                        width="80"
                                        height="80"
                                        className="img-thumbnail"
                                      />
                                    </div>
                                    <div className="col">
                                      <div className="card-body py-2">
                                        <h6 className="card-title mb-1">{item.title}</h6>
                                        <p className="card-text text-muted mb-1">₹{item.price}</p>
                                        <div className="d-flex align-items-center gap-2">
                                          <button
                                            className="btn btn-outline-secondary btn-sm"
                                            onClick={() =>
                                              dispatch(updateQuantity({ _id: item._id, quantity: item.quantity - 1 }))
                                            }
                                          >
                                            -
                                          </button>
                                          <span className="px-2">{item.quantity}</span>
                                          <button
                                            className="btn btn-outline-secondary btn-sm"
                                            onClick={() =>
                                              dispatch(updateQuantity({ _id: item._id, quantity: item.quantity + 1 }))
                                            }
                                          >
                                            +
                                          </button>
                                          <button
                                            className="btn btn-outline-danger btn-sm ms-auto"
                                            onClick={() => dispatch(removeFromCart(item._id))}
                                          >
                                            Remove
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}

                              {/* Total Amount and Buy Now */}
                              {cartItems.length > 0 && (
                                <div
                                  className="shadow-lg p-3 bg-white"
                                  style={{
                                    position: "fixed",
                                    bottom: 0,
                                    right: 0,
                                    width: "400px",
                                    borderTop: "1px solid #ccc",
                                    zIndex: 1050,
                                  }}
                                >
                                  <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="m-0">Total: ₹{totalAmount}</h5>
                                    <button className="btn btn-success">Buy Now</button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </>
                        ) : (
                          <>
                            <MdOutlineAddShoppingCart className='shop-cart-icon' />
                            <h5 className='py-2'>No products in the cart.</h5>
                            <button className='btn btn-primary' onClick={() => { handleClose(); history.push("/"); }}>Return To Shop</button>
                          </>
                        )}

                      </div>
                    </Offcanvas.Body>
                  </Offcanvas>
                  <span className="count">{cartItems.length}</span>
                </div>
                <span className="price-text">$0.00</span>
              </div>
            </div>
          </div>
        </div>
      </div >


      <div className={`custom-navbar-wrapper d-block d-lg-none ${visible ? "navbar-visible" : "navbar-hidden"}`}>
        <Navbar expand="lg" className="bg-white px-3">
          <Container fluid className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-3">
              <FaBars size={20} className="cursor-pointer"
                onClick={() => setIsSidebarVisible(true)}
              />
              <Navbar.Brand href="/">
                <img src={logoImg} alt="Logo" height="30" className="me-2" />
              </Navbar.Brand>
            </div>

            <div className="search-bar-wrapper w-50">
              <form className="d-flex search-bar">
                <FormControl
                  type="search"
                  placeholder="Search for products"
                  className="rounded-pill px-4 py-2 border-0"
                  style={{ flex: 1 }}
                />
                <Button className="search-btn rounded-circle" variant="primary">
                  <FaSearch />
                </Button>
              </form>
            </div>

            <FaUser size={24} className="text-dark" />
          </Container>
        </Navbar>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
        transition={Flip}
      />
    </>
  )
}

export default Navbar1