import React, { useEffect } from "react";
import Banner from '../components/Common/Banner'
import SingleBlogSection from '../components/Blog/SingleBlogSection'
import { Helmet } from "react-helmet";

function SingleBlog({banner}) {
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
          <Banner title="Blogs" banner_url={banner} home="Home" bread="Blogs" />
          <SingleBlogSection />
        </div>
      </>
    );
}

export default SingleBlog
