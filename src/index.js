import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from react-dom/client for React 18
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store/store';
import { Provider } from 'react-redux';

// Get the root element from the DOM
const rootElement = document.getElementById('root');

// Create a root using the new createRoot API
const root = ReactDOM.createRoot(rootElement);

// Render your application
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
