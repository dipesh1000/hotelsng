import React, { useState, useEffect } from "react";

import Axios from "axios";
import axiosInstance from "../../helper/axios";
import ContactForm from "./ContactForm";

function ContactSection() {
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
  console.log(settings && settings.contact.image);
  return (
    <div>
      <div className="contact-section">
        <div className="container">
          <div className="read-our-faq">
            <p>{settings && settings.contact.title}</p>
          </div>
          <div className="row">
            <div className="col-lg-9 ">
              {/* <div
                className="hotel-image-in-contact"
                style={{
                  backgroundImage: `url(${settings && settings.contact.image})`,
                }}
              ></div> */}
              <div className="contact_img">
                <img
                  className="img-fluid"
                  src={settings && settings.contact.image}
                />
              </div>
            </div>
            <div className="col-lg-3 ">
              <div className="contact-panel">
                <div className="contact-panel-item">
                  <p>
                    <i className="fa fa-map-marker"></i>Our Location
                  </p>
                  <div className="contact-panel-item-description">
                    {settings && settings.contact.address}
                  </div>
                </div>

                <div className="contact-panel-item">
                  <p>
                    <i className="fa fa-phone"></i>Contact Us
                  </p>
                  <div className="contact-panel-item-description">
                    Phone:&nbsp;{settings && settings.contact.primary_phone}
                    <br />
                    Mobile:&nbsp;{settings && settings.contact.secondary_phone}
                  </div>
                </div>

                <div className="contact-panel-item">
                  <p>
                    <i className="fa fa-paper-plane"></i>Write some words
                  </p>
                  <div className="contact-panel-item-description">
                    {settings && settings.contact.primary_email} <br />
                    {settings && settings.contact.secondary_email}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12 mt-3">
              <div
                dangerouslySetInnerHTML={{
                  __html: settings && settings.contact.description,
                }}
              />
            </div>
            
          </div>
        </div>
        <div className="leave-message-section">
          <div className="leave-message-title">Leave a message</div>
          <div className="leave-message-input-fields">
            <ContactForm />
          </div>
        </div>
      </div>
      <div className="map-iframe">
        <iframe
          src={settings && settings.contact.map_location}
          width="100%"
          height="300"
          frameborder="0"
          style={{ border: "0" }}
          allowfullscreen=""
          aria-hidden="false"
          tabindex="0"
        ></iframe>
      </div>
    </div>
  );
}

export default ContactSection;
