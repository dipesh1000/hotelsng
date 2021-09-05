import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Axios from "axios";
import axiosInstance from "../../helper/axios";

function Banner({ title, bread, home, banner_url }) {
  console.log(banner_url,'urlbanner')

  const [banner, setBanner] = useState();
  useEffect(() => {
    let source = Axios.CancelToken.source();
    const loadData = async () => {
      try {
        const response = axiosInstance.get(`/homepage`, {
          cancelToken: source.token,
        });

        setBanner((await response).data.banner);
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

    document.getElementById("mySidenav").style.width = "0";
  }, []);



  return (
    <>
      <div
        class="banner"
        id="banner-for-other-pages"
        style={{ backgroundImage: `url(${banner_url})` }}
      >
        <div class="background-overlay">
          <div class="text-in-banner">
            <p class="banner-title">{title}</p>
            <div class="banner-subpage">
              <a href="index.html">
                {home}&nbsp;<i class="fas fa-chevron-right"></i>&nbsp;
              </a>
              <span>{bread}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
