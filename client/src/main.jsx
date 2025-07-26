import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { PropertyProvider } from './context/PropertyContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <PropertyProvider>
    <App />
    </PropertyProvider>
  </BrowserRouter>
  
);
