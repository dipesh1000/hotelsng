import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "../Error/TextError";

function Select(props) {
  const { name, placeholder, options, ...rest } = props;
  return (
    <div>
      <Field
        as="select"
        name={name}
        id={name}
        {...rest}
        className="form-control"
      >
        {options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          );
        })}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}

export default Select;
