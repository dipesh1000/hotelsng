import React, { useState, useEffect, Component } from "react";
import {
  Formik,
  Field,
  Form,
  setFieldValue,
  ErrorMessage,
  FieldArray,
} from "formik";
import * as Yup from "yup";
import { addDays, set, format } from "date-fns";
import FormikControl from "../Formik/FormikControl";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import axiosInstance from "../../helper/axios";
import { useHistory } from "react-router-dom";
import $ from "jquery";

function WhereTo(props) {
  const { initialValues } = props;
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    document.getElementById("mySidenav").style.width = "0";
  }, []);

  const close = () => {
    document.getElementById("mySidenav").style.width = "0";
  };

  const onSubmit = (values) => {
    setLoading(true);

    var dateStart = format(values.selectionRange.startDate, "yyyy-MM-d");
    var dateEnd = format(values.selectionRange.endDate, "yyyy-MM-d");

    values.startDate = dateStart;
    values.endDate = dateEnd;

    axiosInstance
      .post("/booking", values)
      .then((response) => {
        console.log(response, "hello");
        history.push({
          pathname: "/room_details",
          state: { roomData: response.data.rooms, formData: values },
        });
        $(".modal-backdrop").remove();
        $("body").removeClass("modal-open");
        $("#myModal .close").click();
        setLoading(false);
      })
      .error((response) => {
        console.log(response);
      });
  };
  return (
    <>
    <style>
      {`
        .modal-body {
          padding: 0;
        }
      `}
    </style>
      <div
        className="bottom-search-bar-mobile "
        data-toggle="modal"
        data-target="#myModal"
      >
        <span onClick={close} className="mobile_booknow">
          Book Now
        </span>
        <span>
          <i className="fa fa-ellipsis-v"></i>
        </span>
      </div>
      <div className="modal" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Book Now</h5>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>

            <div className="modal-body">
              <style type="text/css">
                  {`
                    .search-inner-wrap form {
                      width: 930px;
                    }
                    .serachinmodal .item {
                      padding-left: 0px;
                    }
                  `}
              </style>
              <div className="bottom-search-bar search-inner-wrap">
                <Formik initialValues={initialValues} onSubmit={onSubmit}>
                  {(formik) => (
                    <Form>
                      <div className="serachinmodal">
                        <FormikControl
                          control="datepicker"
                          type="text"
                          name="selectionRange"
                          startDate={initialValues.selectionRange.startDate}
                          endDate={initialValues.selectionRange.endDate}
                        />
                      </div>
                      <FormikControl control="occupancy" name="occupancy" />
                      <div className="button-container">
                        <button type="submit">
                          Search
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WhereTo;
