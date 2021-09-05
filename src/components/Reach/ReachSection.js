import React, { useState, useEffect } from "react";
import Axios from "axios";
import axiosInstance from "../../helper/axios";

function ReachSection() {
  const [settings, setSettings] = useState();
  useEffect(() => {
    let source = Axios.CancelToken.source();
    const loadData = async () => {
      try {
        const response = axiosInstance.get(`/contact_page`, {
          cancelToken: source.token,
        });
        setSettings((await response).data);
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
    window.scrollTo(0, 0);

    document.getElementById("mySidenav").style.width = "0";
  }, []);

  return (
    <div>
      <div className="reach-section">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div
                dangerouslySetInnerHTML={{
                  __html: settings && settings.howtoreach.description,
                }}
              />
            </div>
            <div className="col-md-6">
              <div className="map-iframe">
                <iframe
                  src={settings && settings.contact.map_location}
                  width="100%"
                  height="400"
                  frameborder="0"
                  style={{ border: "0" }}
                  allowfullscreen=""
                  aria-hidden="false"
                  tabindex="0"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReachSection;
