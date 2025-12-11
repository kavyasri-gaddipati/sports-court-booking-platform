import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios'; // <-- Idi import cheyadam marchipoku

// IMPORTANT: Nee Render Live Link ikkada pettam
axios.defaults.baseURL = "https://sports-court-booking-platform-l9nn.onrender.com"; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)