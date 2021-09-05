import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import Axios from "axios";
import axiosInstance from "../../helper/axios";
import Skeleton from "react-loading-skeleton";
import SearchSlider from "./SearchSlider";

function SingleRoomSec() {
  let { id } = useParams();

  const [room, setRoom] = useState();
  const readMore = (e) => {
    var btn = e.target;
    var para = btn.previousElementSibling;

    para.classList.toggle("active");
    btn.classList.toggle("active");
  };

  useEffect(() => {
    let source = Axios.CancelToken.source();
    const loadData = async () => {
      try {
        const response = axiosInstance.get(`/single/room_type/${id}`, {
          cancelToken: source.token,
        });
        setRoom((await response).data.data);
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
  console.log(room && room, "rooms");
  return (
    <div>
      <div className="room-section" id="room-section-for-single-room">
        <div className="container">
          {room ? (
            <div className="room-row">
              <div className="row">
                <div className="col-md-6">
                  <div className="room-section-details">
                    <p className="room-title">{room.title}</p>

                    <SearchSlider room={room} />
                    <div className="room-facility">
                      <div className="facility-item">
                        <img
                          src={
                            process.env.PUBLIC_URL + "/images/png/guests.png"
                          }
                        />
                        &nbsp;
                        {room.no_adult} Adult &nbsp;
                        {room.no_child} Child
                      </div>
                      <div className="facility-item">
                        <img
                          src={process.env.PUBLIC_URL + "/images/png/bed.png"}
                        />
                        &nbsp;{room.no_of_rooms} Rooms
                      </div>
                    </div>

                    <div className="amenities">
                      <p>Amenities:</p>
                      <div className="amenities-content">
                        <div className="row amentities_row ">
                          {room.amenities.map((amenitie) => (
                            <div className="col-6">
                              <ul>
                                <li>
                                  <span
                                    className="amentities_icon"
                                    dangerouslySetInnerHTML={{
                                      __html: amenitie.icon,
                                    }}
                                  />
                                  {"  "}
                                  {amenitie.title}
                                </li>
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="room-description">
                    <p className="read active">{room.description}</p>
                    <button
                      className="read_more_btn active"
                      onClick={(e) => readMore(e)}
                    >
                      &nbsp;<i className="fa fa-angle-down"></i>
                    </button>
                  </div>
                  <div className="price-selection">
                    {room.offer_price &&
                    room.discount_type == "discount_percent" ? (
                      <div className="off-bar">
                        {room.discount_percent} % off
                      </div>
                    ) : (
                      ""
                    )}

                    <div className="price-selection-top">
                      <div className="price-selection-title">{room.title}</div>
                      <div className="price-selection-cost">
                        {room.offer_price > 0 &&
                        room.discount_type == "offer_price" ? (
                          <>
                            <span className="start_price">
                              $ {room.price}
                            </span>
                            <span className="offer_price">
                              $ {room.offer_price}
                            </span>
                          </>
                        ) : (
                          <span>$ {room.price}</span>
                        )}
                      </div>
                    </div>

                    <div className="price-selection-bottom">
                      <div className="price-selection-description">
                        <ul>
                          {room.inclusions.length > 0
                            ? room.inclusions.map((inclusion) => (
                                <li>
                                  {/* <i className="fa fa-check"></i>&nbsp; */}
                                  <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDUwNy4yIDUwNy4yIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MDcuMiA1MDcuMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGNpcmNsZSBzdHlsZT0iZmlsbDojMzJCQTdDOyIgY3g9IjI1My42IiBjeT0iMjUzLjYiIHI9IjI1My42Ii8+DQo8cGF0aCBzdHlsZT0iZmlsbDojMEFBMDZFOyIgZD0iTTE4OC44LDM2OGwxMzAuNCwxMzAuNGMxMDgtMjguOCwxODgtMTI3LjIsMTg4LTI0NC44YzAtMi40LDAtNC44LDAtNy4yTDQwNC44LDE1MkwxODguOCwzNjh6Ii8+DQo8Zz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTI2MCwzMTAuNGMxMS4yLDExLjIsMTEuMiwzMC40LDAsNDEuNmwtMjMuMiwyMy4yYy0xMS4yLDExLjItMzAuNCwxMS4yLTQxLjYsMEw5My42LDI3Mi44DQoJCWMtMTEuMi0xMS4yLTExLjItMzAuNCwwLTQxLjZsMjMuMi0yMy4yYzExLjItMTEuMiwzMC40LTExLjIsNDEuNiwwTDI2MCwzMTAuNHoiLz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojRkZGRkZGOyIgZD0iTTM0OC44LDEzMy42YzExLjItMTEuMiwzMC40LTExLjIsNDEuNiwwbDIzLjIsMjMuMmMxMS4yLDExLjIsMTEuMiwzMC40LDAsNDEuNmwtMTc2LDE3NS4yDQoJCWMtMTEuMiwxMS4yLTMwLjQsMTEuMi00MS42LDBsLTIzLjItMjMuMmMtMTEuMi0xMS4yLTExLjItMzAuNCwwLTQxLjZMMzQ4LjgsMTMzLjZ6Ii8+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==" />
                                  {inclusion}
                                </li>
                              ))
                            : ""}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Skeleton height={400} />
          )}
        </div>
      </div>
      {/* 
      <div class="room-photos-slider">
        <div class="room-slide">
          <Slider {...settings}>
            <div class="room-content">
              <img src={process.env.PUBLIC_URL + "/images/a.jpg"} />
            </div>
            <div class="room-content">
              <img src={process.env.PUBLIC_URL + "/images/a.jpg"} />
            </div>
          </Slider>
        </div>
      </div> */}
    </div>
  );
}

export default SingleRoomSec;
