import React, { useEffect, useState } from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert"; // Import
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";
import outlineDeleteOutline from "@iconify/icons-ic/outline-delete-outline";
import { FlapperSpinner } from "react-spinners-kit";
import outlineModeEditOutline from "@iconify/icons-ic/outline-mode-edit-outline";
import sharpDoNotDisturbAlt from "@iconify/icons-ic/sharp-do-not-disturb-alt";
import outlineSaveAs from "@iconify/icons-ic/outline-save-as";

import SuppliersForm from "../components/SuppliersForm";

import "./suppliers.css";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const SuppliersPage = () => {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [rowID, setRowID] = useState();
  const [isEditMode, setIsEditMode] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  useEffect(() => {
    getSuppliers();
  }, []);

  const getSuppliers = () => {
    axios
      .get(process.env.REACT_APP_API + "/suppliers/get-suppliers")
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
          draggable: true,
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
              .delete(
                `${process.env.REACT_APP_API}/suppliers/delete-supplier/${id}`
              )
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

  const handleEdit = (suppplier) => {
    setName(suppplier.Name);
    setEmail(suppplier.Email);
    setAddress(suppplier.Address);
    setPhoneNo(suppplier.PhoneNo);

    setIsEditMode(!isEditMode);
    setRowID(suppplier._id);
    console.log("handleEdit", suppplier);
  };

  const handleUpdate = (id) => {
    console.log("Update data", { rowID, name, email, address, phoneNo });
    setIsEditMode(false);
    data.reverse();

    let payload = {
      Name: name,
      Email: email,
      Address: address,
      PhoneNo: phoneNo,
    };
    axios
      .put(
        process.env.REACT_APP_API + "/suppliers/update-supplier/" + rowID,
        payload,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        setIsEditMode(false);
        getSuppliers();
        setName("");
        setEmail("");
        setAddress("");
        setPhoneNo("");
        toast.success("Suppplier Updated", {
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
  const renderTable = () => {
    if (isEditMode === true) {
      console.log("isEditMode == true");
      return data.map((supplier, i) => {
        // rowID == customer._id && isEditMode && setName(customer.Name);

        return (
          <tr key={supplier._id}>
            <th scope="row">
              {supplier._id.substr(0, 3) + "..." + supplier._id.substr(19)}
            </th>
            <td>
              {rowID === supplier._id ? (
                <input
                  type="text"
                  className="form-control shadow-sm  px-2"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              ) : (
                supplier.Name
              )}
            </td>
            <td>
              {rowID === supplier._id ? (
                <input
                  type="text"
                  className="form-control shadow-sm  px-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              ) : (
                supplier.Email
              )}
            </td>
            <td>
              {rowID === supplier._id ? (
                <input
                  type="text"
                  className="form-control shadow-sm  px-2"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              ) : (
                supplier.Address
              )}
            </td>
            <td>
              {rowID === supplier._id ? (
                <input
                  type="text"
                  className="form-control shadow-sm  px-2"
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                />
              ) : (
                supplier.PhoneNo
              )}
            </td>
            <td>
              <div className="btn-icons">
                {rowID === supplier._id && isEditMode && (
                  <>
                    <Icon
                      icon={sharpDoNotDisturbAlt}
                      width="26"
                      height="26"
                      className="text-primary"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        data.reverse();
                        setIsEditMode(!isEditMode);
                      }}
                    />
                    &nbsp;&nbsp;
                    <Icon
                      icon={outlineSaveAs}
                      width="26"
                      height="26"
                      className="text-success"
                      onClick={() => handleUpdate(supplier._id)}
                      style={{ cursor: "pointer" }}
                    />
                  </>
                )}
                &nbsp;&nbsp;
                <Icon
                  icon={outlineDeleteOutline}
                  width="26"
                  height="26"
                  className="text-danger"
                  onClick={() => handleDelete(supplier._id)}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </td>
          </tr>
        );
      });
    } else {
      console.log("isEditMode == false");

      return data.reverse().map((supplier, i) => {
        return (
          <tr key={supplier._id}>
            <th>
              {supplier._id.substr(0, 5) + "..." + supplier._id.substr(19)}
            </th>
            <td>{supplier.Name}</td>
            <td>{supplier.Email}</td>
            <td>{supplier.Address}</td>
            <td>{supplier.PhoneNo}</td>
            <td>
              <div className="btn-icons">
                <Icon
                  icon={outlineModeEditOutline}
                  width="26"
                  height="26"
                  className="text-primary"
                  onClick={() => handleEdit(supplier)}
                  style={{ cursor: "pointer" }}
                />
                &nbsp;&nbsp;
                <Icon
                  icon={outlineDeleteOutline}
                  width="26"
                  height="26"
                  className="text-danger"
                  onClick={() => handleDelete(supplier._id)}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </td>
          </tr>
        );
      });
    }
  };
  console.log("supplier page", data.length);
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

      {isLoaded ? (
        data.length > 0 ? (
          <div className="m-3 mt-1 table-responsive">
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
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-muted">No Supplier found</h2>
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
    </>
  );
};

export default SuppliersPage;
