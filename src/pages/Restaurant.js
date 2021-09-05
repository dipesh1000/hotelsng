import React, { useEffect } from "react";
import Banner from "../components/Common/Banner";
import ResturantSection from "../components/Resturant/ResturantSection";
import RestaurantSlider from "../components/Resturant/RestaurantSlider";
import { Helmet } from "react-helmet";

function Restaurant({banner}) {
 useEffect(() => {
   window.scrollTo(0, 0);
   document.getElementById("mySidenav").style.width = "0";
 }, []);
 
  return (
    <>
      <Helmet>
          <title>Restaurant | Hotel SNG</title>
      </Helmet>
      <div id="main">
        <Banner title="Restaurant" banner_url={banner} home="Home" bread="Restaurant" />
        <ResturantSection />
      </div>
    </>
  );
}

export default Restaurant;
