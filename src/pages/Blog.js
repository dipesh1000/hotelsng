import React, { useEffect } from "react";
import Banner from "../components/Common/Banner";
import BlogSection from "../components/Blog/BlogSection";
import { Helmet } from "react-helmet";

function Blog({banner}) {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.getElementById("mySidenav").style.width = "0";
  }, []);
  return (
    <>
    <Helmet>
        <title>Blogs | Hotel SNG</title>
    </Helmet>
    <div id="main">
      <Banner title="Blogs" banner_url={banner} home="Home" bread="Blogs" />
      <BlogSection />
    </div>
    </>
  );
}

export default Blog;
