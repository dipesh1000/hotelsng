import React, { useEffect, useState } from "react";
import Axios from "axios";
import axiosInstance from "../../helper/axios";
import Skeleton from "react-loading-skeleton";

function AboutSection() {
  const [about, setAbout] = useState();

  useEffect(() => {
    let source = Axios.CancelToken.source();
    const loadData = async () => {
      try {
        const response = axiosInstance.get(`/aboutpage`, {
          cancelToken: source.token,
        });
        setAbout((await response).data.data);
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
      <div className="about-us-section">
        <div className="about-us-main">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="about-us-overview">
                  <p>
                    Overview<div className="about-us-divider"></div>
                  </p>
                  {about ? (
                    <div
                      dangerouslySetInnerHTML={
                        about && { __html: about.overview }
                      }
                    />
                  ) : (
                    <Skeleton count={10} />
                  )}
                </div>
              </div>
              {/* <div className="col-md-6">
                <div className="about-us-main-image">
                  {about ? (
                    <img src={about && about.about_image} />
                  ) : (
                    <Skeleton height={400} />
                  )}
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <div className="mission">
          <p>Our mission</p>
          <div className="mission-icons">
            <div className="row">
              {about
                ? about.mission.map((miss) => (
                    <div className="col-md-4">
                      <div className="mission-item">
                        <div className="mission-item-image">
                          <img src={miss.image} />
                        </div>
                        <div className="mission-item-name">
                          {miss.text || <Skeleton />}
                        </div>
                      </div>
                    </div>
                  ))
                : [1, 2, 3].map((a) => (
                    <div className="col-md-4">
                      {/* <Skeleton height={100} /> */}
                      <div className="mission-item">
                        <div className="mission-item-name">
                          {/* <Skeleton /> */}
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
        <div className="container">
          <div className="why-smg">
            <div className="why-smg-title">
              <p>Why choose Hotel SNG</p>
            </div>
            <div
              className="why-smg-text"
              dangerouslySetInnerHTML={about && { __html: about.why_choose }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutSection;
