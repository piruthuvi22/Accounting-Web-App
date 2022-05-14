import React from "react";
import { Link } from "react-router-dom";
import CountUp from "react-countup";

import { Icon } from "@iconify/react";

import baselineArrowRight from "@iconify/icons-ic/baseline-arrow-right";

const Card = ({ totalAmount, type }) => {
  return (
    <div className="card w-100" style={{ maxWidth: "340px" }}>
      <div className="row m-0 g-0 w-100">
        <div className="col-4 d-flex align-items-center justify-content-center p-0">
          <img
            src={type === "sales" ? "/sales.svg" : "/purchase.svg"}
            className="img-fluid rounded-start card-img p-1"
            alt="..."
          />
        </div>
        <div className="col-8">
          <div className="card-body">
            <h5 className="card-title text-capitalize">Total {type}</h5>
            <div className="">
              <h1 className="card-title text-danger d-inline">
                <CountUp
                  start={0}
                  end={totalAmount}
                  duration={2}
                  separator=","
                  delay={0.5}
                  useEasing={true}
                />
              </h1>
              <h4 className="d-inline lkr text-muted">LKR</h4>
            </div>

            {/* <p className="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p> */}
            <p className="card-text">
              <small className="text-muted">
                <Link to={`/${type}`} className="text-decoration-none">
                  Go to <span className="text-capitalize">{type}</span>
                  <Icon icon={baselineArrowRight} width="26" height="26" />
                </Link>
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
