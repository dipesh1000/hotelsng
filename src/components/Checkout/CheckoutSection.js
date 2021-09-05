import { React, useState, useEffect, useRef } from "react";
import CheckoutForm from "./CheckoutForm";
import Slider from "react-slick";
import Skeleton from "react-loading-skeleton";
import Axios from "axios";
import axiosInstance from "../../helper/axios";

function CheckoutSection({ room, form }) {
  
  console.log(room, "From Room in checkout section");

  const [occupancy, setOccupancy] = useState([]);
  const [roomTypeId, setRoomTypeId] = useState();
  const [data, setData] = useState();
  const [totalPrice, setTotalPrice] = useState();

  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  let slider1 = [];
  let slider2 = [];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  useEffect(() => {
    setData({...data, "occupancy": form?.occupancy, "room_type_id": room?.id});
  }, [room, form])
 
  console.log(data, "From room booking")
  useEffect(() => {
    let source = Axios.CancelToken.source();
    const loadData = async () => {
      try {
        const response = await axiosInstance.post(`/checkout`, data);
        setTotalPrice(response.data.total_price)
        return response
      
      } catch (error) {
        if (!Axios.isCancel(error)) {
          throw error;
        }
      }
      return () => {
        source.cancel();
      };
    };
    data && loadData();
  }, [data]);
  console.log(totalPrice, "data From Data  >><<<>>><<>")

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  }, [slider1, slider2]);

  console.log(occupancy, 'From checkout section');

  return (
    <div>
      <div className="checkout_section room-section">
        <div className="container">
          <div className="room-row">
            <div className="row">
              <div className="col-md-5">
                <div className="room-section-details">
                  <div className="room-image">
                    <Slider
                      {...settings}
                      asNavFor={nav2}
                      ref={(slider) => (slider1 = slider)}
                    >
                      <div className="room-search-photo">
                        <img src={room && room.feature_image} />
                      </div>
                      {room &&
                        room.other_image.map((image) => (
                          <div className="room-search-photo">
                            <img src={image} />
                          </div>
                        ))}
                    </Slider>
                    <Slider
                      {...settings}
                      asNavFor={nav1}
                      ref={(slider) => (slider2 = slider)}
                      slidesToShow={3}
                      swipeToSlide={true}
                      focusOnSelect={true}
                    >
                      <div className="room-search-photo">
                        <img src={room && room.feature_image} />
                      </div>
                      {room &&
                        room.other_image.map((image) => (
                          <div className="room-search-photo">
                            <img src={image} />
                          </div>
                        ))}
                    </Slider>
                  </div>
                  <div className="room-pricing">
                    FROM{" "}
                    {room && room.offer_price > 0 ? (
                      <>
                        <span className="offer_price">
                          $ {room.offer_price}
                        </span>
                      </>
                    ) : (
                      <span>$ {room && room.price}</span>
                    )}
                    /PER NIGHT
                  </div>
                  <p className="room-title">{room && room.title}</p>
                  <div className="room-facility">
                    <div className="facility-item">
                      <img
                        src={process.env.PUBLIC_URL + "/images/png/guests.png"}
                      />
                      &nbsp;
                      {form &&
                        form.occupancy
                          .map((item) => item.adult)
                          .reduce((curval, newval) => curval + newval)}{" "}
                      Adult &nbsp;
                      {form &&
                      form.occupancy
                        .map((item) => item.child)
                        .reduce((curval, newval) => curval + newval) > 0
                        ? form.occupancy
                            .map((item) => item.child)
                            .reduce((curval, newval) => curval + newval) +
                          " Child"
                        : ""}{" "}
                    </div>
                    <div className="facility-item">
                      <img
                        src={process.env.PUBLIC_URL + "/images/png/bed.png"}
                      />
                      &nbsp;{form && form.occupancy.length} Rooms
                    </div>
                  </div>

                  {room && form ? (
                    <div className="my-booking">
                      <div className="heading">
                        <h2>My booking</h2>
                      </div>

                      <div>
                        <h3>Occupancy</h3>
                        <p>
                          {form && form.occupancy.length} Room{" "}
                          {form &&
                            form.occupancy
                              .map((item) => item.adult)
                              .reduce((curval, newval) => curval + newval)}{" "}
                          Adult &nbsp;
                          {form &&
                          form.occupancy
                            .map((item) => item.child)
                            .reduce((curval, newval) => curval + newval) > 0
                            ? form.occupancy
                                .map((item) => item.child)
                                .reduce((curval, newval) => curval + newval) +
                              " Child"
                            : ""}{" "}
                        </p>
                      </div>
                      <div>
                        <h3>Check-in</h3>
                        <p>{form && form.startDate}</p>
                      </div>
                      <div>
                        <h3>Check-out</h3>
                        <p>{form && form.endDate}</p>
                      </div>
                      <div>
                        <h3>{room && room.title}</h3>
                        <p>Dream Deals - Superior Room - Breakfast included</p>
                      </div>
                      <div>
                        <h3>Total Price </h3>
                        {/* <p>
                          ${" "}
                          {(form && form.occupancy.length) > 0
                            ? (form && form.occupancy.length) *
                              (room.offer_price > 0
                                ? room.offer_price
                                : room.price)
                            : room.offer_price > 0
                            ? room.offer_price
                            : room.price}{" "}
                        </p> */}
                        <p>
                          {totalPrice}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <Skeleton />
                  )}
                </div>
              </div>
              <div className="col-md-7">
                <div className="room-form">
                  <div class="register-form-container">
                    <div class="register-form">
                      <div class="form-header">
                        <h2>Personal information</h2>
                      </div>
                      <CheckoutForm totalPrice={totalPrice} roomData={room} formData={form} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutSection;
