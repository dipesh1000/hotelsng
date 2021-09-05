import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import "./assets/css/style.css";
import Sidenav from "./components/Common/Sidenav";
import Footer from "./components/Common/Footer";
import Packages from "./pages/Packages";
import ImageGallery from "./pages/ImageGallery";
import VideoGallery from "./pages/VideoGallery";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Blog from "./pages/Blog";
import Reach from "./pages/Reach";
import Restaurant from "./pages/Restaurant";
import Team from "./pages/Team";
import Room from "./pages/Room";
import Checkout from "./pages/Checkout";
import CommingSoon from "./components/Ads/commingSoon";
import PackageSingle from "./pages/PackageSingle";
import SingleBlog from "./pages/SingleBlog";
import Invoice from "./pages/Invoice";
import Test from "./pages/Test";
import SingleRoom from "./pages/SingleRoom";
import Navbar from "./components/Common/Navbar";
import MessengerCustomerChat from "react-messenger-customer-chat";
import { Helmet } from "react-helmet";
import { HelmetProvider } from "react-helmet-async";
import Axios from "axios";
import axiosInstance from "./helper/axios";
import Interweave from 'interweave';
import parse from 'html-react-parser';
import { Markup } from 'interweave';

function App() {

  const [meta, setMeta] = useState();

  const googleAnalyticsId = `%27+i+dl;f.parentNode.insertBefore(j,f)`
  const nsHtmlId = `GTM-WSRZR4H`
  useEffect(() => {
    let source = Axios.CancelToken.source();
    const loadData = async () => {
      try {
        const response = axiosInstance.get(`/basicinfo`, {
          cancelToken: source.token,
        });
        setMeta((await response).data.data);
      } catch (error) {
        if (!Axios.isCancel(error)) {
          throw error;
        }
      }
      return () => {
        source.cancel();
      };
    };
    loadData();
  }, []);
  console.log(meta, "From index page")
  return (
    <HelmetProvider> 
    <Router>
      <Sidenav />
      <CommingSoon />

      <MessengerCustomerChat
        pageId={process.env.REACT_APP_MESSENGER_PAGE_ID}
        appId={process.env.REACT_APP_MESSENGER_APP_ID}
      />
       <Helmet>
            <title>{`${meta?.title} | ${meta?.description}`}</title>
            <meta name="description" content={meta?.seo?.meta_description}></meta>
            <meta name="google-site-verification" content="84qbNdy9etj48FjQCy1CVnChrG81Nk5luASWOs9fG78" />
        </Helmet>
      <Navbar />
      <iframe src={`https://www.googletagmanager.com/ns.html?id=${nsHtmlId}`} height="0" width="0" style={{display:"none", visibility:"hidden"}}/>
      <Switch>
        <Route exact path="/contact">
          <Contact banner={meta?.contact_banner} />
        </Route>
        <Route exact path="/our_team">
          <Team banner={meta?.our_team_banner} />
        </Route>
        <Route exact path="/about_us">
          <About banner={meta?.about_us_banner} />
        </Route>
        <Route exact path="/reach">
          <Reach banner={meta?.how_to_reach_banner} />
        </Route>
        <Route exact path="/invoice">
          <Invoice banner={meta?.all_page_banner} />
        </Route>
        <Route path="/restaurant">
          <Restaurant banner={meta?.dining_banner} />
        </Route>
        <Route exact path="/blogs">
          <Blog banner={meta?.blog_banner} />
        </Route>
        <Route exact path="/blog/:slug">
          <SingleBlog banner={meta?.blog_banner} />
        </Route>
        <Route path="/image_gallery">
          <ImageGallery banner={meta?.gallery_banner} />
        </Route>
        <Route exact path="/room_details">
          <Room banner={meta?.all_page_banner} />
        </Route>
        <Route exact path="/single_room/:id">
          <SingleRoom banner={meta?.all_page_banner} />
        </Route>
        <Route exact path="/video_gallery">
          <VideoGallery banner={meta?.gallery_banner} />
        </Route>
        <Route exact path="/packages">
          <Packages banner={meta?.offer_banner} />
        </Route>
        <Route exact path="/package/:slug">
          <PackageSingle banner={meta?.offer_banner} />
        </Route>
        <Route exact path="/checkout">
          <Checkout banner={meta?.all_page_banner} />
        </Route>
        <Route exact path="/test">
          <Test />
        </Route>
        <Route exact path="/terms-condition">
          <Terms banner={meta?.terms_condition_banner} />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
      <Footer />
    </Router>
    

    </HelmetProvider>
  );
}

export default App;

//  <img src={process.env.PUBLIC_URL + "/images/"} />
