import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import $ from "jquery";
import Axios from "axios";
import axiosInstance from "../../helper/axios";
import WhereTo from "./WhereTo";
import { addDays, set, format } from "date-fns";
import { initialValues } from "../Variable/InitialValues";
import Language from "./Language";

function Navbar() {
  // const param = useParams();
  const { pathname } = useLocation();

  const google = window.google;
  useEffect(() => {
    console.log("first load");
    function googleTranslateElementInit() {
      console.log("data");
      new google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "de,en,es,fr,it,ja",
          layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    }
    // google && google.translate && googleTranslateElementInit();
    window.addEventListener("load", () => {
      console.log("domloaded");
      googleTranslateElementInit();
    });
  }, []);

  // document.addEventListener('load',()=>{
  //   document.getElementById('google_translate_element').addEventListener('DOMNodeInserted',()=>{
  //     document.querySelector(".goog-te-menu-value span:first").innerHTML = "Language";
  //     document.querySelector(".goog-te-menu-frame.skiptranslate").addEventListener('load',()=>{

  //     });
  //   })
  //   $("#google_translate_element").bind("DOMNodeInserted", function (event) {
  //     $(".goog-te-menu-value span:first").html("Language");
  //     $(".goog-te-menu-frame.skiptranslate").load(function () {
  //       setTimeout(function () {
  //         $(".goog-te-menu-frame.skiptranslate")
  //         .contents()
  //         .find(".goog-te-menu2-item-selected .text")
  //         .html("Translate");
  //       }, 100);
  //     });
  //   });

  // })

  function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }

  const [settings, setSettings] = useState();

  useEffect(() => {
    let source = Axios.CancelToken.source();
    const loadData = async () => {
      try {
        const response = axiosInstance.get(`/basicinfo`, {
          cancelToken: source.token,
        });
        setSettings((await response).data.data);
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
  useEffect(() => {
    var navbar = document.querySelector(".primary-navbar");
    var firstNavbar = document.querySelector(".first-navbar");
    // var bookingBtn = document.querySelector(".booking-btn");
    window.onscroll = function () {
      if (navbar != null) {
        scrollFunction();
      }
    };
    var sticky = navbar.offsetTop + 5;
    function scrollFunction() {
      if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky");
        // firstNavbar.style.display = "none";
        // bookingBtn.style.background = "#ff9800";
      } else {
        navbar.classList.remove("sticky");
        // firstNavbar.style.display = "flex";
        // bookingBtn.style.background = "none";
      }
    }
  }, []);

  return (
    <>
      <div className="primary-navbar">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-12">
              <div className="first-navbar">
                <nav className="navbar navbar-static-top navbar-expand-lg navbar-dark navbar-inverse">
                  <div className="navbar-logo">
                    <div>
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/images/hotel sng logo color.png"
                        }
                      />
                      <Link to="/"></Link>
                    </div>
                  </div>
                  <button className="navbar-toggler" type="button">
                    <span
                      className="navbar-toggler-icon"
                      onClick={openNav}
                    ></span>
                  </button>

                  <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                  >
                    <ul className="navbar-nav mr-auto">
                      <li className="nav-item active">
                        <Link className="nav-link" to="/">
                          {" "}
                          Home <span className="sr-only">(current)</span>
                        </Link>
                      </li>
                      <li className="nav-item dropdown">
                        <a
                          className="nav-link dropdown-toggle"
                          id="navbarDropdown"
                        >
                          About
                        </a>
                        <div
                          className="dropdown-menu"
                          aria-labelledby="navbarDropdown"
                        >
                          <Link class="dropdown-item" to="/about_us">
                            About us
                          </Link>
                          <Link className="dropdown-item" to="/our_team">
                            Our Team
                          </Link>
                        </div>
                      </li>

                      <li className="nav-item active">
                        <Link className="nav-link" to="/restaurant">
                          Dining <span class="sr-only">(current)</span>
                        </Link>
                      </li>
                      <li className="nav-item active">
                        <Link className="nav-link" to="/packages">
                          Offers
                          <span className="sr-only">(current)</span>
                        </Link>
                      </li>

                      <li className="nav-item dropdown">
                        <a
                          className="nav-link dropdown-toggle"
                          id="navbarDropdown"
                        >
                          Gallery
                        </a>
                        <div
                          className="dropdown-menu"
                          aria-labelledby="navbarDropdown"
                        >
                          <Link class="dropdown-item" to="/image_gallery">
                            Image Gallery
                          </Link>
                          <Link className="dropdown-item" to="/video_gallery">
                            Video Gallery
                          </Link>
                        </div>
                      </li>

                      <li className="nav-item active">
                        <Link className="nav-link" to="/blogs">
                          Blog<span class="sr-only">(current)</span>
                        </Link>
                      </li>

                      <li className="nav-item dropdown">
                        <a
                          className="nav-link dropdown-toggle"
                          id="navbarDropdown"
                        >
                          Contact
                        </a>
                        <div
                          className="dropdown-menu"
                          aria-labelledby="navbarDropdown"
                        >
                          <Link className="dropdown-item" to="/contact">
                            Contact Us
                          </Link>

                          <Link className="dropdown-item" to="/reach">
                            How to Reach
                          </Link>
                        </div>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>

            <div
              className="col-12 col-lg-4"
              style={{ marginTop: "auto", marginBottom: "auto" }}
            >
              <div className="second-navbar-wrapper">
                <div className="second-navbar">
                  <div className="search-wrapper book_now_nav " id="searchBar">
                    <WhereTo initialValues={initialValues} />
                  </div>

                  <div className="select-language">
                    <Language />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="social-icon">
        <a
          href={settings && settings.social_setting.facebook_url}
          target="_blank"
        >
          <i className="fab fa-facebook"></i>
        </a>

        <a
          href={settings && settings.social_setting.youtube_url}
          target="_blank"
        >
          <i className="fab fa-youtube"></i>
        </a>

        <a
          href={settings && settings.social_setting.instagram_url}
          target="_blank"
        >
          <i class="fab fa-instagram"></i>
        </a>
      </div>
    </>
  );
}

export default Navbar;
