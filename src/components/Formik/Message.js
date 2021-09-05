import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "../Error/TextError";

function Message(props) {
  const { name, type, placeholder, ...rest } = props;
  return (
    <>
      <Field
        as="textarea"
        id={name}
        name={name}
        {...rest}
        cols={30}
        rows={5}
        placeholder={placeholder}
        className="form-control"
      />
      <ErrorMessage name={name} component={TextError} />
    </>
  );
}

export default Message;
