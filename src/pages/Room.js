import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Banner from "../components/Common/Banner";
import SearchRoom from "../components/Room/SearchRoom";

function Room({banner}) {
 useEffect(() => {
   window.scrollTo(0, 0);
   document.getElementById("mySidenav").style.width = "0";
 }, []);
 console.log(banner, "From Banner ")
  return (
    <>
      <Helmet>
          <title>Rooms | Hotel SNG</title>
      </Helmet>
      <div id="main">
        <Banner title="Single Rooms" banner_url={banner} home="Home" bread="Single Rooms" />
        <SearchRoom />
      </div>
    </>
  );
}

export default Room;
