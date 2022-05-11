import React from "react";
import { ToastContainer, toast } from "react-toastify";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Products from "./Pages/Products/Products";
import CustomersPage from "./Pages/CustomersPage/Customers";
import SuppliersPage from "./Pages/SuppliersPage/Suppliers";
import Dashboard from "./Pages/DashboardPage/Dashboard";
import PurchasesPage from "./Pages/PurchasesPage/Purchases";
import SalesPage from "./Pages/SalesPage/Sales";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
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
