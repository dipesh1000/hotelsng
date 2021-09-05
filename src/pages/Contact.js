import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Banner from "../components/Common/Banner";
import ContactSection from "../components/Contact/ContactSection";

function Contact({banner}) {

  useEffect(() => {
    window.scrollTo(0, 0);
    document.getElementById("mySidenav").style.width = "0";
  }, []);
  return (
    <>
      <Helmet>
          <title>Contact Us | Hotel SNG</title>
      </Helmet>
      <div id="main">
        <Banner title="Contact" banner_url={banner} home="Home" bread="Contact" />
        <ContactSection />
      </div>
    </>
  );
}

export default Contact;
