import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import LoginPage from './Page/LoginPage/LoginPage';
import App from './App';
import HomePage from './Page/HomePage/HomePage';
import TransactionPage from './Page/TransactionPage/TransactionPage';
import ProfilePage from './Page/ProfilePage/ProfilePage';
//import ContractPage from './Page/ContractPage/ContractPage';
//import TransactionPage from './Page/TransactionPage/TransactionPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/transactions" element={<TransactionPage />} />
      <Route path="/profile" element={<ProfilePage />} />

    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
