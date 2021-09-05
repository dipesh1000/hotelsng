import React, { useState, useEffect } from 'react';
import HomeBanner from '../components/Home/HomeBanner';
import HomeWelcome from '../components/Home/HomeWelcome';
import HomeDiscover from '../components/Home/HomeDiscover';
import HomeSummer from '../components/Home/HomeSummer';
import HomeRooms from '../components/Home/HomeRooms';
import HomeNewsletter from '../components/Home/HomeNewsletter';
import HomeSpecial from '../components/Home/HomeSpecial';
import HomeTestimonial from '../components/Home/HomeTestimonial';
import Footer from '../components/Common/Footer';
import axiosInstance from '../helper/axios';
import Axios from 'axios';
import CommingSoon from '../components/Ads/commingSoon';
import $ from 'jquery';

function Home() {
  const [rooms, setRooms] = useState();
  const [roomtext, setRoomtext] = useState();
  const [testimonials, setTestimonials] = useState();
  const [banner, setBanner] = useState();
  const [welcome, setWelcome] = useState();
  const [discover, setDiscover] = useState();
  const [deal, setDeal] = useState();
  const [special, setSpecial] = useState();

  useEffect(() => {
    let source = Axios.CancelToken.source();
    const loadData = async () => {
      try {
        const response = axiosInstance.get(`/homepage`, {
          cancelToken: source.token,
        });
        // console.log((await response).data, "homepage");
        setRooms((await response).data.rooms);
        setRoomtext((await response).data.room_text);
        setTestimonials((await response).data.testimonials);
        setBanner((await response).data.banner);
        setWelcome((await response).data.welcome);
        setDiscover((await response).data.discover);
        setDeal((await response).data.deals_section);
        setSpecial((await response).data.special_offer);
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
    window.scrollTo(0, 0);

    document.getElementById('mySidenav').style.width = '0';
  }, []);
  return (
    <div id="main">
      <HomeBanner banner={banner} />
      <HomeWelcome welcome={welcome} />
      <HomeDiscover discover={discover} />
      <HomeSummer deal={deal} />
      <HomeRooms rooms={rooms} roomText={roomtext} />
      {/* <HomeNewsletter /> */}
      <HomeSpecial special={special} />
      <div className="container">
        <div className="vertical-divider"></div>
      </div>
      <HomeTestimonial testimonials={testimonials} />
    </div>
  );
}

export default Home;
