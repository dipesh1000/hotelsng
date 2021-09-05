import { React, useState, useEffect, useRef } from "react";
import SearchBar from "../Common/SearchBar";
import { useLocation, useHistory, Link, Route, Router } from "react-router-dom";
import Checkout from "../../pages/Checkout";
import Slider from "react-slick";
import SearchSlider from "./SearchSlider";

function SearchRoom() {
  const [formData, setFormData] = useState();
  const [roomData, setRoomData] = useState();

  const history = useHistory();

  const location = useLocation();
  useEffect(() => {
    if (location.state) {
      setFormData(location.state.formData);
      setRoomData(location.state.roomData);
    } else {
      history.push("/");
    }
  }, [location]);

  const bookNow = (room) => {
    console.log(room, "From room search");
    history.push({
      pathname: "/checkout",
      state: { roomData: room, formData: formData },
    });
  };

  const readMore = (e) => {
    var btn = e.target;
    var para = btn.previousElementSibling;

    para.classList.toggle("active");
    btn.classList.toggle("active");
  };

  return (
    <>
      <div className="search-room-section">
        <SearchBar formData={formData} />
        <div className="room-section-wrapper">
          {roomData &&
          roomData.length > 0 &&
          formData &&
          formData.startDate != formData.endDate ? (
            roomData.map((room, index) => (
              <div key={index} className="room-section">
                <div className="container">
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
                                  process.env.PUBLIC_URL +
                                  "/images/png/guests.png"
                                }
                              />
                              &nbsp;
                              {formData &&
                                formData.occupancy
                                  .map((item) => item.adult)
                                  .reduce(
                                    (curval, newval) => curval + newval
                                  )}{" "}
                              Adult &nbsp;
                              {formData &&
                              formData.occupancy
                                .map((item) => item.child)
                                .reduce((curval, newval) => curval + newval) > 0
                                ? formData.occupancy
                                    .map((item) => item.child)
                                    .reduce(
                                      (curval, newval) => curval + newval
                                    ) + " Child"
                                : ""}{" "}
                            </div>
                            <div className="facility-item">
                              <img
                                src={
                                  process.env.PUBLIC_URL + "/images/png/bed.png"
                                }
                              />
                              &nbsp;{formData && formData.occupancy.length}{" "}
                              Rooms
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
                            <div className="price-selection-title">
                              {room.title}
                            </div>
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

                            <div className="price-selection-select">
                              <button onClick={() => bookNow(room)}>
                                Book Now
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no_room">
              <div className="no_room_sec">
                <h1>No room available</h1>
                <p>Please search again by modifying other search options</p>
                <p>Thank you for your co-operation :)</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SearchRoom;
