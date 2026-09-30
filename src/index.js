import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './MyComponnent/redux/Store';
import axios from 'axios';

// --- Axios Request Deduplication Patch ---
// This prevents multiple components from firing the same API request simultaneously
const originalGet = axios.get;
let productPromise = null;
let lastFetch = 0;

axios.get = function(url, config) {
  if (url && url.includes('/product-findall')) {
    // If request is made within 5 seconds of the last one, return the pending/cached promise
    if (productPromise && (Date.now() - lastFetch < 5000)) {
      return productPromise;
    }
    
    productPromise = originalGet.call(axios, url, config);
    lastFetch = Date.now();
    
    // Clear on error so it can be retried
    productPromise.catch(() => {
      productPromise = null;
      lastFetch = 0;
    });
    
    return productPromise;
  }
  return originalGet.call(axios, url, config);
};
// ------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
