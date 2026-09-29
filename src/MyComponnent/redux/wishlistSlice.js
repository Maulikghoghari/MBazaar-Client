import { createSlice } from '@reduxjs/toolkit';

const loadWishlistFromStorage = () => {
  try {
    const stored = localStorage.getItem('wishlistItems');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const saveWishlistToStorage = (items) => {
  localStorage.setItem('wishlistItems', JSON.stringify(items));
};

const initialState = {
  wishlistItems: loadWishlistFromStorage(),
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const exists = state.wishlistItems.some(item => item._id === action.payload._id);
      if (!exists) {
        state.wishlistItems.push(action.payload);
        saveWishlistToStorage(state.wishlistItems);
      }
    },
    removeFromWishlist: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter(item => item._id !== action.payload);
      saveWishlistToStorage(state.wishlistItems);
    },
    clearWishlist: (state) => {
      state.wishlistItems = [];
      saveWishlistToStorage([]);
    }
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
