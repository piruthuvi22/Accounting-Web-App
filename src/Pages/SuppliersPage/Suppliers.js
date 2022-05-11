import React, { useEffect, useState } from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert"; // Import
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";
import outlineDeleteOutline from "@iconify/icons-ic/outline-delete-outline";
import { FlapperSpinner } from "react-spinners-kit";

import SuppliersForm from "../../components/SuppliersForm/SuppliersForm";

import "./suppliers.css";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const SuppliersPage = () => {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getSuppliers();
  }, []);

  const getSuppliers = () => {
    axios
      .get("https://accouting-uom.herokuapp.com/suppliers/get-suppliers")
      .then((response) => {
        setData(response.data);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoaded(true);
        toast.error("Something went wrong!", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: 0,
        });
      });
  };

  const handleDelete = (id) => {
    console.log("dele");
    confirmAlert({
      //   title: "Are you sure to delete?", // Title dialog
      message: "Are you sure to delete?", // Message dialog
      buttons: [
        {
          label: "Yes Sure",
          onClick: () => {
            axios
              .delete(`https://accouting-uom.herokuapp.com/suppliers/delete-supplier/${id}`)
              .then((response) => {
                console.log(response);
                getSuppliers();
              })
              .catch((error) => {
                console.log(error);
              });
          },
        },
        {
          label: "Don't delete",
          onClick: () => console.log("no"),
        },
      ],

      //   childrenElement: () => <div>Custom UI</div>, // Custom UI or Component

      onConfirm: () => {
        console.log("confirm");
      }, // Action after Confirm
      onCancel: () => console.log("cancel"), // Action after Cancel
      overlayClassName: "overlay-custom-class-name", // Custom overlay class name
    });
  };
  const renderTable = () => {
    return data.reverse().map((supplier, i) => {
      return (
        <tr key={supplier._id}>
          <th scope="row">{supplier._id}</th>
          <td>{supplier.Name}</td>
          <td>{supplier.Email}</td>
          <td>{supplier.Address}</td>
          <td>{supplier.PhoneNo}</td>
          <td className="text-danger">
            {/* <u 
              className="edit text-primary"
                onClick={() => handleEdit(supplier._id)}
            >
              Edit
            </u> */}
            {/* &nbsp;&nbsp; */}
            <span>
              <Icon
                icon={outlineDeleteOutline}
                width="26"
                height="26"
                className="text-danger"
                onClick={() => handleDelete(supplier._id)}
                style={{ cursor: "pointer" }}
              />
            </span>
          </td>
        </tr>
      );
    });
  };
  console.log("customer page", data.length);
  return (
    <>
      <div className="accordion accordion-flush" id="accordionFlushExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingOne">
            <button
              className="accordion-button collapsed fw-bold shadow-sm"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
            >
              Add Supplier
            </button>
            <hr />
          </h2>
          <div
            id="flush-collapseOne"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingOne"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">
              <SuppliersForm getSuppliers={getSuppliers} />
            </div>
          </div>
        </div>
      </div>

      <div className="m-3 mt-1 overflow-auto" >
        {isLoaded ? (
          data.length > 0 ? (
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Supplier Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Address</th>
                  <th scope="col">TP No</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>{renderTable()}</tbody>
            </table>
          ) : (
            <div className="text-center">
              <h2 className="text-muted">No Suppliers found</h2>
              <lord-icon
                src="https://cdn.lordicon.com/biwxmlnf.json"
                trigger="loop"
                delay="800"
                colors="primary:#9D72B3"
                scale="45"
                state="hover-1"
                style={{ width: "250px", height: "250px", opacity: "1" }}
              ></lord-icon>
            </div>
          )
        ) : (
          <div className="w-100 h-100 d-flex justify-content-center align-items-center mt-5">
            <FlapperSpinner size={30} color="#5A2675" loading={true} />
            &nbsp;&nbsp;&nbsp;&nbsp;<h5 className="text-muted">Loading...</h5>
          </div>
        )}
      </div>
    </>
  );
};

export default SuppliersPage;
