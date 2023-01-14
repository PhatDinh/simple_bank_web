import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
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
import CreateDebt from './Page/DebtPage/CreateDebt';
import AdminPage from './Page/AdminPage/AdminPage';
import EmployeePage from './Page/EmployeePage/EmployeePage';
import CreateCustomer from './Page/EmployeePage/CreateCustomer';
import BankTransfer from './Page/TransactionPage/BankTransfer';

//import ContractPage from './Page/ContractPage/ContractPage';
//import TransactionPage from './Page/TransactionPage/TransactionPage';

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(

  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/transactions" element={<TransactionPage />} />
      <Route path="create-transaction" element={<CreateTransaction />} />
      <Route path="create-bank-transfer" element={<BankTransfer />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/contacts" element={<ContractPage />} />
      <Route path="/create-contact" element={<CreateContact />} />
      <Route path="/debts" element={<DebtPage />} />
      <Route path="/create-debt" element={<CreateDebt />} />


      <Route path="/admin" element={<AdminPage />} />
      <Route path="/employee" element={<EmployeePage />} />
      <Route path="/create-customer" element={<CreateCustomer />} />

    </Routes>
  </BrowserRouter>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
