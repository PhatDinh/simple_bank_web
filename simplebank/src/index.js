import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store'
import reportWebVitals from './reportWebVitals';
import LoginPage from './Page/LoginPage/LoginPage';
import App from './App';
import HomePage from './Page/HomePage/HomePage';
import TransactionPage from './Page/TransactionPage/TransactionPage';
import ProfilePage from './Page/ProfilePage/ProfilePage';
import CreateTransaction from './Page/TransactionPage/CreateTransaction';
import ContractPage from './Page/ContractPage/ContactPage';
import DebtPage from './Page/DebtPage/DebtPage';
import CreateContact from './Page/ContractPage/CreateContact';
//import ContractPage from './Page/ContractPage/ContractPage';
//import TransactionPage from './Page/TransactionPage/TransactionPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/transactions" element={<TransactionPage />} />
        <Route path="create-transaction" element={<CreateTransaction />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/contacts" element={<ContractPage />} />
        <Route path="/create-contact" element={<CreateContact/>}/>
        <Route path="/debts" element={<DebtPage/>} />

      </Routes>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
