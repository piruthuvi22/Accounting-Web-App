import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductsForm = ({ getProducts }) => {
  const [date, setDate] = useState(new Date().toISOString().substr(0, 10));
  const [supplier, setSupplier] = useState();
  const [product, setProduct] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    console.log("product form");
    axios
      .get(`${process.env.REACT_APP_API}/suppliers/get-suppliers`)
      .then((response) => {
        setSuppliers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    getProducts();
  }, []);

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleSupplierChange = (e) => {
    console.log(e.target.value);
    setSupplier(e.target.value);
  };

  const handleProductChange = (e) => {
    setProduct(e.target.value);
  };

  const handleUnitPriceChange = (e) => {
    setUnitPrice(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let payload = {
      Date: date,
      SupplierID: supplier,
      Supplier: suppliers.filter((sup) => sup._id === supplier)[0].Name,
      Product: product,
      UnitPrice: unitPrice,
    };
    axios
      .post(process.env.REACT_APP_API + "/products/add-product", payload, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        getProducts();
        setDate(new Date().toISOString().substr(0, 10));
        setSupplier();
        setProduct("");
        setUnitPrice("");
        toast.success("Product Added", {
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
              <option key={supplier._id} value={supplier._id}>
                {supplier.Name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="product" className="form-label">
            Product
          </label>
          <input
            type="text"
            className="form-control"
            id="product"
            placeholder="Product name"
            value={product}
            onChange={handleProductChange}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="unitprice" className="form-label">
            Unit Price (LKR)
          </label>
          <input
            type="number"
            className="form-control"
            id="unitprice"
            placeholder="Unit Price"
            value={unitPrice}
            onChange={handleUnitPriceChange}
          />
        </div>
        <div className="col-md-4"></div>
        <div className="col-md-2"></div>

        <div className="col-12 text-end">
          <button
            type="submit"
            className="btn btn-outline-primary"
            onClick={handleSubmit}
          >
            Add Product
          </button>
        </div>
      </form>
    </>
  );
};

export default ProductsForm;
