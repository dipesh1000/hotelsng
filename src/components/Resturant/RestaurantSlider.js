import React from "react";
import Slider from "react-slick";

function RestaurantSlider({ sliders }) {
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
    <div>
      <div class="room-photos-slider">
        <div class="room-slide">
          {sliders && (
            <Slider {...settings}>
              {sliders.map((slider) => (
                <div class="room-content">
                  <img src={slider} />
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </div>
  );
}

export default RestaurantSlider;
