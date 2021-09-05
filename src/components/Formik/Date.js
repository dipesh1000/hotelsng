import { React, useState } from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "../Error/TextError";
import DatePicker from "react-datepicker";
import DateView from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function Date(props) {
  const { name, placeholder, ...rest } = props;
  return (
    <>
      <Field name={name} className="form-control">
        {(form, field) => {
          const { setFiledValue } = form;
          const { value } = field;
          return <DateView id={name} {...field} {...rest} />;
        }}
      </Field>

      <ErrorMessage name={name} component={TextError} />
    </>
  );
}

export default Date;
