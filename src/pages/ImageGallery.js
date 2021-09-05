import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Banner from "../components/Common/Banner";
import Image from "../components/Gallery/Image";

function ImageGallery({banner}) {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.getElementById("mySidenav").style.width = "0";
  }, []);
  return (
    <>
      <Helmet>
          <title>Gallery | Hotel SNG</title>
      </Helmet>
      <div id="main">
        <Banner title="Images Gallery" banner_url={banner} home="Home" bread="Images Gallery" />
        <Image />
      </div>
    </>
  );
}

export default ImageGallery;
