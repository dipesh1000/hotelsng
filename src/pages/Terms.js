import React, { useEffect, useState } from "react";
import Banner from "../components/Common/Banner";
// import AboutSection from "../components/About/AboutSection";
import Axios from 'axios'
import axiosInstance from "../helper/axios";
import { Helmet } from "react-helmet";


function Terms({banner}) {
  const [terms, setTerms] = useState()
  useEffect(() => {
    axiosInstance.get('/terms-and-condition').then(
      res => setTerms(res.data.data.terms_condition)
    )
    window.scrollTo(0, 0);
    document.getElementById("mySidenav").style.width = "0";

  }, []);
  return (
    <>
      <Helmet>
          <title>Terms | Hotel SNG</title>
      </Helmet>
      <div id="main">
        <Banner title="Terms and Condition" banner_url={banner} home="Home" bread="About Us" />
        <div className="container">
        <p className="pt-5" dangerouslySetInnerHTML={{
            __html: terms && terms,
          }}></p>
        </div>
        
      </div>
    </>
  );
}

export default Terms;
