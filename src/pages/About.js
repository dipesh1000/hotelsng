import React, { useEffect, useState } from "react";
import Banner from "../components/Common/Banner";
import AboutSection from "../components/About/AboutSection";
import { Helmet } from "react-helmet";
import axiosInstance from "../helper/axios";
import Axios from "axios";

function About({banner}) {
  
  useEffect(() => {
    window.scrollTo(0, 0);
    document.getElementById("mySidenav").style.width = "0";
  }, []);
  
  return (  
    <div>
        <Helmet>
            <title>About Us | Hotel SNG</title>
        </Helmet>
    <div id="main">
      <Banner title="About us" banner_url={banner} home="Home" bread="About Us" />
      <AboutSection />
    </div>
    </div>
  );
}

export default About;
