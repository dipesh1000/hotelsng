import React, { useState, useEffect } from "react";
import Banner from "../components/Common/Banner";
import CheckoutSection from "../components/Checkout/CheckoutSection";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";

function Checkout({banner}) {
  const [roomData, setRoomData] = useState();
  const [formData, setFormData] = useState();

  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.getElementById("mySidenav").style.width = "0";
  }, []);
  useEffect(() => {
    if (location.state) {
      setRoomData(location.state.roomData);
      setFormData(location.state.formData);
    } else {
      history.push("/");
    }
  }, [location]);
  return (
    <>
      <Helmet>
          <title>Checkout | Hotel SNG</title>
      </Helmet>
      <div id="main">
        <Banner title="Checkout" banner_url={banner} home="Home" bread="Checkout" />
        <CheckoutSection room={roomData} form={formData} />
      </div>
    </>
  );
}

export default Checkout;
