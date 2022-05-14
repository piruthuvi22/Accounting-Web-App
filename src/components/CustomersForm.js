import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomersForm = ({ getCustomers }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  useEffect(() => {
    console.log("customers form");
    getCustomers();
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhoneNo(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let payload = {
      Name: name,
      Email: email,
      Address: address,
      PhoneNo: phoneNo,
    };
    axios
      .post(process.env.REACT_APP_API+"/customers/add-customer", payload, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        getCustomers();
        setName("");
        setEmail("");
        setAddress("");
        setPhoneNo("");
        toast.success("Customer Added", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: true,
          progress: 0,
        });
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <form className="row g-3">
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">
            Customer Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={handleNameChange}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            placeholder="Address"
            value={address}
            onChange={handleAddressChange}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="tpno" className="form-label">
            Phone No
          </label>
          <input
            type="text"
            className="form-control"
            id="tpno"
            placeholder="Phone No"
            value={phoneNo}
            onChange={handlePhoneChange}
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
            Add Customer
          </button>
        </div>
      </form>
    </>
  );
};

export default CustomersForm;
