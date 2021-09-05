import React from "react";
import Slider from "react-slick";

function RoomSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div>
      <div class="room-photos-slider">
        <div class="room-slide">
          <Slider {...settings}>
            <div class="room-content">
              <img src={process.env.PUBLIC_URL + "/images/hotelroom1.jpg"} />
            </div>
            <div class="room-content">
              <img src={process.env.PUBLIC_URL + "/images/hotelroom1.jpg"} />
            </div>
            <div class="room-content">
              <img src={process.env.PUBLIC_URL + "/images/hotelroom1.jpg"} />
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default RoomSlider;
