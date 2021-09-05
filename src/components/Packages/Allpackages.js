import React, { useEffect, useState } from "react";
import Axios from "axios";
import axiosInstance from "../../helper/axios";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";

function Allpackages() {
  const [packages, setPackages] = useState();

  useEffect(() => {
    let source = Axios.CancelToken.source();
    const loadData = async () => {
      try {
        const response = axiosInstance.get(`/packages`, {
          cancelToken: source.token,
        });
        setPackages((await response).data.packages);
      } catch (error) {
        if (!Axios.isCancel(error)) {
          throw error;
        }
      }
      return () => {
        source.cancel();
      };
    };
    loadData();
  }, []);

  return (
    <div>
      <div className="all-packages-background">
        {packages ? (
          packages.map((trip) => (
            <div className="all-packages-section" style={{ cursor: "hand" }}>
              <Link to={"/package/" + trip.slug}>
                <div className="package-item">
                  <div className="row">
                    <div className="col-lg-3">
                      <div className="package-item-image">
                        <img src={trip.image} alt={trip.slug} />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="package-item-description ">
                        <div className="package-item-title package-item-duration-location">
                          <i className="fa fa-map-marker"></i>&nbsp;&nbsp;
                          <strong>{trip.title}</strong>
                        </div>
                        <div className="package-item-duration-location">
                          <div>
                            <i className="fa fa-clock-o"></i>
                            &nbsp;&nbsp;{trip.duration}&nbsp;&nbsp;&nbsp;&nbsp;
                          </div>
                          {/* <div>
                      <i className="fa fa-map-marker"></i>
                      &nbsp;&nbsp;Kathmandu&nbsp;&nbsp;&nbsp;&nbsp;
                    </div> */}
                        </div>
                        <div
                          className="package-item-description-text"
                          dangerouslySetInnerHTML={{ __html: trip.description }}
                        ></div>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="package-item-pricing">
                        <div className="package-item-pricing-box">
                          <div>
                            <p>Starting from</p>
                            <p>
                              <del>{trip.price}</del>
                            </p>
                            <p>{trip.offer_price}</p>
                          </div>
                          <div>
                            <button className="package_booknow">
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <>
            {[0, 1].map((a) => (
              <div className="all-packages-section">
                <div className="package-item">
                  <Skeleton height={200} />
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Allpackages;
