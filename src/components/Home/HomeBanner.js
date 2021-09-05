import React, { useEffect, useState } from 'react';
import SearchBar from '../Common/SearchBar';
import Navbar from '../Common/Navbar';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { addDays, set, format } from 'date-fns';
import Slider from 'react-slick';
import { initialValues } from '../Variable/InitialValues';

function HomeBanner({ banner }) {
  console.log(banner, 'From banner ');
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <>
      {/* <Navbar formData={initialValues} /> */}
      {banner ? (
        <Slider {...settings}>
          {banner &&
            banner.map((banners, index) => (
              <div key={index}>
                <div
                  className="banner"
                  style={{ backgroundImage: `url(${banners?.image})` }}
                >
                  <div className="background-overlay">
                    <div className="text-in-banner">
                      <p className="banner-subtitle">{banners?.subtitle}</p>
                      <p className="banner-title">{banners?.title}</p>
                      <p
                        className="banner-description"
                        dangerouslySetInnerHTML={{
                          __html: banners?.text,
                        }}
                      ></p>
                      {/* <div className="room-suite-link">
                    <Link to="/contact">Contact</Link>
                  </div> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </Slider>
      ) : (
        <>
          <Skeleton height={500}>
            <div className="search-wrapper" id="searchBar">
              <Skeleton height={150} />
            </div>
          </Skeleton>
        </>
      )}
      <SearchBar formData={initialValues} />
    </>
  );
}

export default HomeBanner;
