import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "../Error/TextError";

function Radio(props) {
  const { name, placeholder, options, ...rest } = props;
  return (
    <div>
      <Field name={name} {...rest}>
        {({ field }) => {
          return options.map((option) => {
            return (
              <React.Fragment key={option.key}>
                <input
                  type="radio"
                  id={option.value}
                  {...field}
                  value={option.value}
                  checked={field.value === option.value}
                />
                <label htmlFor={option.value}> {option.key} </label>
              </React.Fragment>
            );
          });
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}

export default Radio;
