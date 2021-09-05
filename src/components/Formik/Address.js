import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "../Error/TextError";

function Address(props) {
  const { name, placeholder, ...rest } = props;
  return (
    <div>
      <Field
        id={name}
        name={name}
        {...rest}
        placeholder={placeholder}
        className="form-control"
      />
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}

export default Address;
