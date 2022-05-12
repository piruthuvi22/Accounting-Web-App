import React from "react";
import { ToastContainer, toast } from "react-toastify";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Products from "./Pages/Products";
import CustomersPage from "./Pages/Customers";
import SuppliersPage from "./Pages/Suppliers";
import Dashboard from "./Pages/Dashboard";
import PurchasesPage from "./Pages/Purchases";
import SalesPage from "./Pages/Sales";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/suppliers" element={<SuppliersPage />} />
          <Route path="/purchases" element={<PurchasesPage />} />
          <Route path="/sales" element={<SalesPage />} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        draggable={false}
      />
    </div>
  );
}

export default App;
