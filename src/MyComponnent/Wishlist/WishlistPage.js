import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../redux/wishlistSlice'; // adjust path
import { useHistory } from 'react-router-dom';
import './WishlistPage.css';

const WishlistPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const wishlistItems = useSelector(state => state.wishlist.wishlistItems);

  // Save wishlist to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-page">
        <h2>Your Wishlist is Empty</h2>
        <h4 onClick={() => history.push('/')} className="btn-back">Go Back to Shopping</h4>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <h2>Your Wishlist</h2>
      <div className="wishlist-grid">
        {wishlistItems.map((item) => (
          <div key={item._id} className="wishlist-card">
            <img
              src={`http://localhost:4001/images/${item.category}/${item.mainImage}`}
              alt={item.title}
              className="wishlist-img"
            />
            <div className="wishlist-info">
              <h5>{item.title}</h5>
              <p>₹{item.price}</p>
              <h4 onClick={() => history.push(`/product/${item._id}`)} className="btn-view">
                View Details
              </h4>
              <button
                onClick={() => dispatch(removeFromWishlist(item._id))}
                className="btn-remove"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
