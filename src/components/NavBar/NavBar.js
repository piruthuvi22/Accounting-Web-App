import React from "react";
import { Icon } from "@iconify/react";
import outlineSpaceDashboard from "@iconify/icons-ic/outline-space-dashboard";
import outlineShoppingCart from "@iconify/icons-ic/outline-shopping-cart";
import baselinePeopleOutline from "@iconify/icons-ic/baseline-people-outline";
import roundShoppingCartCheckout from "@iconify/icons-ic/round-shopping-cart-checkout";
import baselineAttachMoney from "@iconify/icons-ic/baseline-attach-money";
import outlineCategory from "@iconify/icons-ic/outline-category";

import { NavLink, Router, Link } from "react-router-dom";

import "./navbar.css";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img
            src="/logo3.png" // src="https://api.mygermanuniversity.com/images/university_logos/67c6a1e7ce56d3d6fa748ab6d9af3fd7_mzbYiuK8X2nk1568707186.png"
            alt=""
            width="40"
            // height="50"
          />
          &nbsp; Ledger-ndary
        </Link>

        <button
          className="navbar-toggler shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className="nav-link  text-white d-flex align-items-center"
                aria-current="page"
                to="/"
              >
                <Icon icon={outlineSpaceDashboard} width="26" height="26" />
                &nbsp;
                <span>Dashboard</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/products">
                <Icon icon={outlineShoppingCart} width="26" height="26" />
                &nbsp;
                <span>Products</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/customers">
                <Icon icon={baselinePeopleOutline} width="26" height="26" />
                &nbsp;
                <span>Customers</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/suppliers">
                <Icon icon={outlineCategory} width="26" height="26" />
                &nbsp;
                <span>Suppliers</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/purchases">
                <Icon icon={roundShoppingCartCheckout} width="26" height="26" />
                &nbsp;
                <span>Purchases</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/sales">
                <Icon icon={baselineAttachMoney} width="26" height="26" />
                &nbsp;
                <span>Sales</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
