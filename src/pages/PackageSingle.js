import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Banner from "../components/Common/Banner";
import SinglePackageSection from "../components/Packages/SinglePackageSection";

function PackageSingle({banner}) {
useEffect(() => {
  window.scrollTo(0, 0);
  document.getElementById("mySidenav").style.width = "0";
}, []);

  return (
    <>
      <Helmet>
          <title>Package Details | Hotel SNG</title>
      </Helmet>
      <div id="main">
        <Banner title="Single Package" banner_url={banner} home="Packages" bread="Single Package" />
        <SinglePackageSection />
      </div>
    </>
  );
}

export default PackageSingle;
