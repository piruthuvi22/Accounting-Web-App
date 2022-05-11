import React from "react";

import SalesGraph from "../../components/SalesGraph";
import PurchaseGraph from "../../components/PurchaseGraph";

const DashboardPage = () => {
  return (
    <>
      <div className="row m-0">
        <div className="col-12 col-md-6">
          <SalesGraph />
        </div>
        <div className="col-12 col-md-6">
          <PurchaseGraph />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
