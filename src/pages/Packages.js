import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Banner from "../components/Common/Banner";
import Allpackages from "../components/Packages/Allpackages";

function Packages({banner}) {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.getElementById("mySidenav").style.width = "0";
  }, []);
  
  return (
    <>
      <Helmet>
          <title>Packages | Hotel SNG</title>
      </Helmet>
      <div id="main">
        <Banner title="Packages" banner_url={banner} bread="Packages" home="Home" />
        <Allpackages />
      </div>
    </>
  );
}

export default Packages;
