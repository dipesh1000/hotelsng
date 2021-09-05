import React, { useState, useEffect, useRef } from "react";
import { Field, form, ErrorMessage } from "formik";
import DateView from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, format, set } from "date-fns";
import { DateRangePicker, DateRange } from "react-date-range";

function DatePicker(props) {
  const { label, name, startDate, endDate, ...rest } = props;
  const [open, setOpen] = useState(false);
  const node = useRef();

  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <>
      <div className="item item-calender">
        <div className="item-sup  sup-calendar" id="mobile-check-title">
          <div>Check In</div>
          <div>Check Out</div>
        </div>
        <div className="mobile-checkdate">
          <div ref={node}>
            <div className="row">
              <div className="col-6">
                <span className="search-logo">
                  <i class="fas fa-calendar-week"></i>
                </span>

                <Field name={name}>
                  {({ form, field }) => {
                    const { setFieldValue, values } = form;

                    const { value } = field;
                    return (
                      <>
                        <input
                          type="text"
                          value={format(
                            values.selectionRange.startDate,
                            "MMM dd yyyy"
                          )}
                          // value={values && values.selectionRange.startDate}
                          onClick={() => setOpen(!open)}
                        ></input>
                      </>
                    );
                  }}
                </Field>
              </div>
              <div className="col-6">
                <span className="search-logo">
                  <i class="fas fa-calendar-week"></i>
                </span>

                <Field name={name}>
                  {({ form, field }) => {
                    const { setFieldValue, values } = form;
                    const { value } = field;
                    return (
                      <>
                        <input
                          type="text"
                          value={format(
                            values.selectionRange.endDate,
                            "MMM dd yyyy"
                          )}
                          // value={values && values.selectionRange.endDate}
                          onClick={() => setOpen(!open)}
                        ></input>
                      </>
                    );
                  }}
                </Field>
              </div>
            </div>

            {open && (
              <Field name={name}>
                {({ form: { values, setFieldValue } }) => {
                  return (
                    <DateRange
                      ranges={[values.selectionRange]}
                      months={2}
                      showSelectionPreview={false}
                      showMonthAndYearPickers={false}
                      direction="horizontal"
                      minDate={new Date()}
                      moveRangeOnFirstSelection={true}
                      onChange={({ ...ranges }) => {
                        setFieldValue(
                          "selectionRange.startDate",
                          ranges.selection.startDate
                        );
                        setFieldValue(
                          "selectionRange.endDate",
                          ranges.selection.endDate
                        );
                      }}
                      {...rest}
                    />
                  );
                }}
              </Field>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default DatePicker;
