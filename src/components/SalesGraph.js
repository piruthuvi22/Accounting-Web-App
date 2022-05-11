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
import Card from "./Card/Card";
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
      text: "Sales History",
    },
  },
};

const SalesGraph = () => {
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("1st useEffec");
    axios
      .get("https://accouting-uom.herokuapp.com/sales/get-sales")
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
        label: "Sales Amount",
        data: values,
        borderColor: "#5a2675",
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  console.log("data", dataSet);

  return (
    <>
      <Bar options={options} data={dataSet} className="chart" />
      <div className="d-flex justify-content-center">
        <Card totalAmount={totalAmount} type="sales" />
      </div>
    </>
  );
};

export default SalesGraph;
