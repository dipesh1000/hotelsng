import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "../Error/TextError";

function Subject(props) {
  const { name, ...rest } = props;
  return (
    <div>
      <Field
        id={name}
        name={name}
        {...rest}
        placeholder="Subject"
        className="form-control"
      />
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}

export default Subject;
