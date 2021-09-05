import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Banner from '../components/Common/Banner'
import TeamSection from '../components/Team/TeamSection'

function Team({banner}) {
 useEffect(() => {
   window.scrollTo(0, 0);
   document.getElementById("mySidenav").style.width = "0";
 }, []);
    return (
      <>
        <Helmet>
          <title>Team | Hotel SNG</title>
        </Helmet>
        <div id="main">
          <Banner title="Our Team" banner_url={banner} home="Home" bread="Our Team" />
          <TeamSection />
        </div>
      </>
    );
}

export default Team
