import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './MyComponnent/Header/Navbar';
import Home from './MyComponnent/Home/Home';
import Sidebar from './MyComponnent/Sidebar/Sidebar';
import Footer from './MyComponnent/Footer.js/Footer';
import Promotions from './MyComponnent/Promotions/Promotions';
import Stores from './MyComponnent/Stores/Stores';
// import Contact from './MyComponnent/Contact/Contact'
import DeliveryReturn from './MyComponnent/Delivery & Return/DeliveryReturn';
import Outlet from './MyComponnent/Outlet/Outlet';
import AppleMackbook from './MyComponnent/Product/AppleMackbook';
import BusinessLaptop from './MyComponnent/Product/BusinessLaptop';
import Login from './MyComponnent/Login/Login';
import Register from './MyComponnent/Register/Register';
import ProductDetails from './MyComponnent/ProductDetails/ProductDetails';
import { ScaleLoader } from 'react-spinners';
import BackToTop from './MyComponnent/Home/BackToTop';
import WishlistPage from './MyComponnent/Wishlist/WishlistPage';
import { useSelector } from 'react-redux';
import AdminRoot from './MyComponnent/Admin/AdminRoot';

function AppRoutes({ isSidebarVisible, setIsSidebarVisible, windowWidth }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/server') || location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return <AdminRoot />;
  }

  return (
    <div className="App">
      {(windowWidth > 576 || isSidebarVisible) && (
        <Sidebar
          isVisible={isSidebarVisible}
          setIsSidebarVisible={setIsSidebarVisible}
        />
      )}

      <div className="App">
        <Navbar setIsSidebarVisible={setIsSidebarVisible} />
        <BackToTop />
        <div className="main-content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route exact path="/promotion">
              <Promotions />
            </Route>

            <Route exact path="/store">
              <Stores />
            </Route>

            {/* <Route exact path="/contact">
              <Contact />
            </Route> */}

            <Route exact path="/deliveryReturn">
              <DeliveryReturn />
            </Route>

            <Route exact path="/outlet">
              <Outlet />
            </Route>

            {/* login register */}
            <Route exact path="/login">
              <Login />
            </Route>

            <Route exact path="/signup">
              <Register />
            </Route>

            {/* product route example */}
            <Route exact path="/product/Laptops/Apple MacBook">
              <AppleMackbook />
            </Route>

            <Route exact path="/product/Laptops/Business Laptop">
              <BusinessLaptop />
            </Route>

            {/* product details */}
            <Route exact path="/product/:id">
              <ProductDetails />
            </Route>

            {/* wishlist */}
            <Route exact path="/wishlist">
              <WishlistPage />
            </Route>
          </Switch>
        </div>

        <Footer />
      </div>
    </div>
  );
}

function App() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const cartItems = useSelector((state) => state.cart?.cartItems || []);
  const wishlistItems = useSelector((state) => state.wishlist?.wishlistItems || []);

  // Save cart items to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Save wishlist items to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {loading ? (
        <div
          className="loading"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: 'white',
          }}
        >
          <ScaleLoader height={70} color="#000000ff" width={10} />
        </div>
      ) : (
        <Router>
          <AppRoutes
            isSidebarVisible={isSidebarVisible}
            setIsSidebarVisible={setIsSidebarVisible}
            windowWidth={windowWidth}
          />
        </Router>
      )}
    </>
  );
}

export default App;
