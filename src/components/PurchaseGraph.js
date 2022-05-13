import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Card from "./Card";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Purchase History",
    },
  },
};

// let labels = [];
// let dataSet = [];

const PurchaseGraph = () => {
  // fetch purchasesdata

  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("1st useEffec");
    axios
      .get(process.env.REACT_APP_API + "/purchases/get-purchases")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    console.log("2nd useEffec");
    data.map((purchase, i) => {
      // totalAmount = totalAmount + parseFloat(purchase.Value);
      setTotalAmount((prev) => prev + parseFloat(purchase.Value));
      setLabels((prev) => [...prev, purchase.Date.substr(0, 10)]);
      setValues((prev) => [...prev, purchase.Value]);
    });
  }, [data]);

  const dataSet = {
    labels,
    datasets: [
      {
        label: "Purchase Amount",
        data: values,
        borderColor: "#5a2675",
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  console.log("data", data);

  return (
    <>
      <Bar options={options} data={dataSet} className="chart" />
      <div className="d-flex justify-content-center">
        <Card totalAmount={totalAmount} type="purchases" />
      </div>
    </>
  );
};

export default PurchaseGraph;
