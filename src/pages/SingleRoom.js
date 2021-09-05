import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Banner from "../components/Common/Banner";
import SingleRoomSec from "../components/Room/SingleRoomSec";

function SingleRoom({banner}) {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.getElementById("mySidenav").style.width = "0";
  }, []);
  return (
    <>
      <Helmet>
          <title>Single Room | Hotel SNG</title>
      </Helmet>
      <div>
        <Banner title="Single Rooms" banner_url={banner} home="Home" bread="Single Rooms" />
        <SingleRoomSec />
      </div>
    </>
  );
}

export default SingleRoom;
