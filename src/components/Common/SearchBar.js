import React, { useState, useEffect, Component } from "react";
import WhereTo from "./WhereTo";
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

function SearchBar(props) {
  let history = useHistory();

  const initialValues = props.formData;

  // const validationSchema = Yup.object({
  //   destination: Yup.string().required("This Field Cannot be Empty"),
  // });

  const onSubmit = (values, onSubmitProps) => {
    console.log(values, "On Summit in search bars")
    var dateStart = format(values.selectionRange.startDate, "yyyy-MM-d");
    var dateEnd = format(values.selectionRange.endDate, "yyyy-MM-d");
    values.startDate = dateStart;
    values.endDate = dateEnd;

    axiosInstance
      .post("/booking", values)
      .then((response) => {
        history.push({
          pathname: "/room_details",
          state: { roomData: response.data.rooms, formData: values },
        });
      })
      .error((response) => {});
  };

  return (
    <div>
      <div className="search-wrapper">
        {initialValues && (
          <>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
              {(formik) => (
                <Form>
                  <div className="bottom-search-bar d-none d-lg-flex">
                    <FormikControl
                      control="datepicker"
                      type="text"
                      name="selectionRange"
                      startDate={initialValues.selectionRange.startDate}
                      endDate={initialValues.selectionRange.endDate}
                    />

                    <FormikControl control="occupancy" name="occupancy" />

                    <div className="button-container">
                      <div className="search-button">
                        <button type="submit">Search</button>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
            <WhereTo initialValues={initialValues} />
          </>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
