import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SalesForm = ({ getSales }) => {
  const [date, setDate] = useState(new Date().toISOString().substr(0, 10));
  const [customer, setCustomer] = useState();
  const [supplier, setSupplier] = useState();
  const [product, setProduct] = useState("");
  const [qty, setQty] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [customers, setCustomers] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log("Sales form");
    axios
      .get(`https://accouting-uom.herokuapp.com/customers/get-customers`)
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`https://accouting-uom.herokuapp.com/suppliers/get-suppliers`)
      .then((response) => {
        setSuppliers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    getSales();
  }, []);

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleSupplierChange = (e) => {
    console.log(e.target.value);
    setUnitPrice("");
    axios
      .get(
        `https://accouting-uom.herokuapp.com/products/get-supplier-data/${e.target.value}`
      )
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    setSupplier(e.target.value);
  };

  const handleCustomerChange = (e) => {
    setCustomer(e.target.value);
  };

  const handleProductChange = (e) => {
    console.log(e.target.value);
    axios
      .get(`http://localhost:5000/products/get-product-data/${e.target.value}`)
      .then((response) => {
        console.log(response.data);
        setUnitPrice(response.data[0].UnitPrice);
      })
      .catch((error) => {
        console.log(error);
      });

    setProduct(e.target.value);
  };

  const handleQtyChange = (e) => {
    setQty(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let productName = products.filter((pro) => pro._id == product)[0]?.Product;
    console.log("productName", productName);
    let totalVal = qty * unitPrice;
    let payload = {
      Date: date,
      Customer: customer,
    //   Supplier: supplier,
      Description: productName,
      Quantity: qty,
      UnitPrice: unitPrice,
      Value: totalVal,
      // TotalValue: req_body.TotalValue,
    };
    axios
      .post("http://localhost:5000/sales/add-sale", payload, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        getSales();

        setDate(new Date().toISOString().substr(0, 10));
        setSupplier("");
        setCustomer("");
        setProduct("");
        setQty("");
        setUnitPrice("");

        toast.success("Sale Confirmed", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: 0,
        });
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <form className="row g-3">
        <div className="col-md-6">
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            value={date}
            onChange={handleDateChange}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="customer" className="form-label">
            Customer
          </label>
          <select
            id="customer"
            className="form-select"
            value={customer}
            onChange={handleCustomerChange}
          >
            <option defaultChecked>Choose...</option>
            {customers.map((customer) => (
              <option key={customer._id} value={customer.Name}>
                {customer.Name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <label htmlFor="supplier" className="form-label">
            Supplier
          </label>
          <select
            id="supplier"
            className="form-select"
            value={supplier}
            onChange={handleSupplierChange}
          >
            <option defaultChecked>Choose...</option>
            {suppliers.map((supplier) => (
              <option key={supplier._id} value={supplier.Name}>
                {supplier.Name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="product" className="form-label">
            Product
          </label>
          <select
            id="product"
            className="form-select"
            value={product}
            onChange={handleProductChange}
          >
            <option defaultChecked>Choose...</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.Product}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <label htmlFor="unitPrice" className="form-label">
            Unit Price
          </label>
          <input
            type="text"
            className="form-control"
            id="unitPrice"
            placeholder="Unit Price"
            value={unitPrice}
            readOnly
            // onChange={handleUnitPriceChange}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="qty" className="form-label">
            Quantity
          </label>
          <input
            type="number"
            className="form-control"
            id="qty"
            placeholder="Quantity"
            value={qty}
            onChange={handleQtyChange}
          />
        </div>
        <div className="col-md-2"></div>

        <div className="col-12 text-end">
          <button
            type="submit"
            className="btn btn-outline-primary"
            onClick={handleSubmit}
          >
            Add Sale
          </button>
        </div>
      </form>
    </>
  );
};

export default SalesForm;
