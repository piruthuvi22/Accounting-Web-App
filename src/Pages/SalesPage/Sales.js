import React, { useEffect, useState } from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert"; // Import
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";
import outlineDeleteOutline from "@iconify/icons-ic/outline-delete-outline";
import { FlapperSpinner } from "react-spinners-kit";
import JsPDF from "jspdf";
import html2canvas from "html2canvas";
import SalesForm from "../../components/SalesForm/SalesForm";

import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const SalesPage = () => {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getSales();
  }, []);

  const getSales = () => {
    axios
      .get("https://accouting-uom.herokuapp.com/sales/get-sales")
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
              .delete(
                `https://accouting-uom.herokuapp.com/sales/delete-sale/${id}`
              )
              .then((response) => {
                console.log(response);
                getSales();
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
    let totalAmount = 0;
    return data.reverse().map((sale, i) => {
      totalAmount += parseFloat(sale.Value);
      return (
        <tr key={sale._id}>
          <th scope="row">
            {/* {sale._id} */}
            {sale._id.substr(0, 5) + "..." + sale._id.substr(19)}
          </th>
          <td>{sale.Date.substr(0, 10)}</td>
          <td>{sale.Customer}</td>
          <td>{sale.Description}</td>
          <td>{sale.Quantity}</td>
          <td>{sale.UnitPrice}</td>
          <td>{sale.Value}</td>
          <td className="fw-bold h4 text-success p-0 text-decoration-underline">
            {data.length - 1 == i && totalAmount + " LKR"}
          </td>
          <td className="text-danger">
            {/* <u 
              className="edit text-primary"
                onClick={() => handleEdit(sale._id)}
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
                onClick={() => handleDelete(sale._id)}
                style={{ cursor: "pointer" }}
              />
            </span>
          </td>
        </tr>
      );
    });
  };

  const handleExportPDF = () => {
    console.log("pdf");

    // const report = new JsPDF("landscape", "pt", "a2");
    // report.html(document.querySelector("#report")).then(() => {
    //   report.save("report.pdf");
    // });

    // const input = document.getElementById("report");
    // html2canvas(input).then((canvas) => {
    //   const imgData = canvas.toDataURL("image/png");
    //   const pdf = new JsPDF();
    //   pdf.addImage(imgData, "JPEG", 0, 0);
    //   // pdf.output('dataurlnewwindow');
    //   pdf.save("download.pdf");
    // });
  };
  console.log("sales page", data.length);
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
              Add New Sale
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
              <SalesForm getSales={getSales} />
            </div>
          </div>
        </div>
      </div>

      {isLoaded ? (
        data.length > 0 ? (
          <>
            <div className="m-3 mt-1 overflow-auto">
              {/* <div className="d-flex justify-content-end my-1">
                <button
                type="button"
                className="btn btn-outline-danger"
                onClick={handleExportPDF}
                >
                Export
                </button>
              </div> */}
              <div id="report">
                {/* <h3 className="visualy-hidden text-center">Sales Journal</h3> */}
                <table className="table table-hover table-bordered">
                  {/* <caption>Sales Journal</caption> */}
                  <thead>
                    <tr>
                      <th scope="col" rowSpan="2">
                        #Invoice
                      </th>
                      <th scope="col" rowSpan="2">
                        Date
                      </th>
                      <th scope="col" rowSpan="2">
                        Customer
                      </th>
                      <th scope="col" colSpan="4" className="text">
                        Description of Goods
                      </th>
                      <th scope="col" rowSpan="2">
                        Total Amount
                      </th>
                      <th scope="col" rowSpan="2">
                        Action
                      </th>
                    </tr>
                    <tr>
                      <th scope="col">Product</th>
                      <th scope="col">Qty</th>
                      <th scope="col">Unit Price</th>
                      <th scope="col">Value</th>
                    </tr>
                  </thead>
                  <tbody>{renderTable()}</tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-muted">No Sales found</h2>
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

export default SalesPage;
