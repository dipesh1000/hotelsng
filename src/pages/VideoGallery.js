import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Banner from '../components/Common/Banner'
import Video from '../components/Gallery/Video'

function VideoGallery({banner}) {
 useEffect(() => {
   window.scrollTo(0, 0);
   document.getElementById("mySidenav").style.width = "0";
 }, []);
    return (
      <>
        <Helmet>
          <title>Checkout | Hotel SNG</title>
        </Helmet>
        <div id="main">
          <Banner title="Video Gallery" banner_url={banner} home="Home" bread="Video Gallery" />
          <Video />
        </div>
      </>
    );
}

export default VideoGallery
