import React from "react";
import DateView from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Field, ErrorMessage } from "formik";
import TextError from "../Error/TextError";

function DatePick(props) {
  const { name, type, placeholder, ...rest } = props;
  return (
    <div>
      <Field name={name} className="form-control">
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;

          return (
            <DateView
              id={name}
              {...field}
              {...rest}
              selected={value}
              dateFormat="yyyy/MM/dd"
              onChange={(val) => setFieldValue(name, val)}
              className="form-control"
            />
          );
        }}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
}

export default DatePick;
