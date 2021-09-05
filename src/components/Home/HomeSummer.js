import React from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { initialValues } from "../Variable/InitialValues";
import WhereTo from "../Common/WhereTo";

function HomeSummer({ deal }) {
  console.log(deal, "From deals in summary ..........")
  return (
    <>
      <div className="summer-deals">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <div className="summer-deals-image">
                <img src={deal && deal.image} />
              </div>
            </div>
            <div className="col-md-4">
              <div className="summer-deals-content">
                <div className="summer-deals-wrapper">
                  <p className="summer-deals-title">SUMMER DEALS</p>
                  <p className="summer-deals-bold-title">
                    {deal && deal.title}
                  </p>
                  <p className="summer-deals-text">
                    {deal && deal.description}
                  </p>
                  <button>
                    <WhereTo initialValues={initialValues} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeSummer;
