import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Banner from '../components/Common/Banner'
import ReachSection from '../components/Reach/ReachSection'

function Reach({banner}) {
   useEffect(() => {
     window.scrollTo(0, 0);
     document.getElementById("mySidenav").style.width = "0";
   }, []);
    return (
      <>
        <Helmet>
            <title>Reach | Hotel SNG</title>
        </Helmet>
        <div id="main">
          <Banner title="How to reach?" banner_url={banner} home="Home" bread="How to reach?" />
          <ReachSection />
        </div>
      </>
    );
}

export default Reach
