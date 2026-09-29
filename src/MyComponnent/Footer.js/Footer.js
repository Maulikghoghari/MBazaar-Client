import React from 'react'
import './Footer.css'
import logoimg from '../Img/logo.png'
import googleimg from '../Img/google-play (1).jpg'
import appleimg from '../Img/app-store (1).jpg'
import payment from '../Img/payment.png'
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaGooglePlay } from "react-icons/fa";
import { FaAppStoreIos } from "react-icons/fa";

function Footer() {
    return (
        <div>
            <footer class="footer">
                <div class="container">
                    <div class="row text-center text-md-start">

                        <div class="col-md-3 mb-4">
                            <img src={logoimg} className='footer-logo' alt="" />
                            <p class="footer-text">Condimentum adipiscing vel neque dis nam parturient orci at scelerisque.</p>
                            <h5>Subscribe us</h5>
                            <h5><FaFacebook className='footer-icon facebook' /><FaInstagramSquare className='footer-icon insta' /><FaYoutube className='footer-icon youtube' /><FaSquareXTwitter className='footer-icon x' /></h5>
                        </div>

                        <div class="col-md-2 mb-4">
                            <h6 class="footer-heading">Categories</h6>
                            <ul class="list-unstyled">
                                <li><a href="#">Smartphones</a></li>
                                <li><a href="#">Laptops</a></li>
                                <li><a href="#">Hardware</a></li>
                                <li><a href="#">Cameras</a></li>
                                <li><a href="#">Headphones</a></li>
                                <li><a href="#">Bathroom</a></li>
                            </ul>
                        </div>

                        <div class="col-md-2 mb-4">
                            <h6 class="footer-heading">Useful Links</h6>
                            <ul class="list-unstyled">
                                <li><a href="#">Promotions</a></li>
                                <li><a href="#">Stores</a></li>
                                <li><a href="#">Our contacts</a></li>
                                <li><a href="#">Delivery & Return</a></li>
                                <li><a href="#">Outlet</a></li>
                            </ul>
                        </div>


                        <div class="col-md-2 mb-4">
                            <h6 class="footer-heading">Administration</h6>
                            <ul class="list-unstyled">
                                <li><a href="/server">Admin Portal</a></li>
                                <li><a href="/server/products">Manage Products</a></li>
                                <li><a href="/server/users">Users List</a></li>
                                <li><a href="#">Delivery & Return</a></li>
                                <li><a href="#">Outlet</a></li>
                            </ul>
                        </div>

                        <div class="col-md-3 mb-4">
                            <h6 class="footer-heading">Download App on Mobile:</h6>
                            <p>15% discount on your first purchase</p>
                            <h4><FaGooglePlay className='me-2 app'/><FaAppStoreIos className='app' /></h4>
                        </div>
                    </div>

                    <div class="d-flex justify-content-between mt-4 footer-bottom">
                        <div className="copy-right">
                            M-Bazaar © 2025 CREATED BY MAULIK GHOGHARI. PREMIUM E-COMMERCE SOLUTIONS.
                        </div>
                        <div className="payment-img">
                            <img src={payment} alt="" />
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer
