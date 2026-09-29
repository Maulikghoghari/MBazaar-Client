import { createSlice } from '@reduxjs/toolkit';

let parsedCart = [];
try {
  const stored = localStorage.getItem('cartItems');
  parsedCart = stored ? JSON.parse(stored) : [];
} catch (err) {
  parsedCart = [];
}

const initialState = {
  cartItems: parsedCart,
};

const saveToLocalStorage = (cartItems) => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (!Array.isArray(state.cartItems)) state.cartItems = [];

      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );

      const payloadQuantity = action.payload.quantity || 1;

      if (existingItem) {
        existingItem.quantity += payloadQuantity;
      } else {
        state.cartItems.push({ ...action.payload, quantity: payloadQuantity });
      }

      saveToLocalStorage(state.cartItems);
    },


    updateQuantity: (state, action) => {
      const { _id, quantity } = action.payload;
      const item = state.cartItems.find(item => item._id === _id);
      if (item && quantity > 0) {
        item.quantity = quantity;
        saveToLocalStorage(state.cartItems);
      }
    },

    removeFromCart: (state, action) => {
      if (!Array.isArray(state.cartItems)) state.cartItems = [];

      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );

      saveToLocalStorage(state.cartItems);
    },

    clearCart: (state) => {
      state.cartItems = [];
      saveToLocalStorage([]);
    }
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
