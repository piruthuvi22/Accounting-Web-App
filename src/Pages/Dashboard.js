import React, { useState, useEffect } from "react";
import {  StageSpinner } from "react-spinners-kit";

import SalesGraph from "../components/SalesGraph";
import PurchaseGraph from "../components/PurchaseGraph";

const DashboardPage = () => {
  const [isLoad, setIsLoad] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsLoad(true);
    }, 2500);
  }, []);
  return (
    <>
      {isLoad ? (
        <div className="row m-0">
          <div className="col-12 col-md-6">
            <SalesGraph />
          </div>
          <div className="col-12 col-md-6">
            <PurchaseGraph />
          </div>
        </div>
      ) : (
        <div className="w-100 not-found mt-5">
          <StageSpinner size={50} color="#5A2675" loading={true} />
          <br />
          {/* <h5 className="text-muted">Loading...</h5> */}
        </div>
      )}
    </>
  );
};

export default DashboardPage;
