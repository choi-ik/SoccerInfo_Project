import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/' : 'https://api.football-data.org/v4'; 
axios.defaults.headers['Access-Control-Request-Origin'] = 'https://api.football-data.org/v4';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);


