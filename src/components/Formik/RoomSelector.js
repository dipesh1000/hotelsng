import React, { useRef, useState, useEffect } from "react";
import { FieldArray, Field } from "formik";

function RoomSelector(props) {
  const { name, ...rest } = props;
  const [open, setOpen] = useState(false);
  const node = useRef();

  const handleAdult = (index, inc, values, set) => {
    let newOccupancy = values.occupancy;
    if (inc) {
      newOccupancy[index].adult += 1;
    } else {
      newOccupancy[index].adult -= 1;
    }
    set("occupancy", newOccupancy);
  };
  const handleChild = (index, inc, values, set) => {
    let newOccupancy = values.occupancy;
    if (inc) {
      newOccupancy[index].child += 1;
    } else {
      newOccupancy[index].child -= 1;
    }
    set("occupancy", newOccupancy);
  };

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
      <div className="item" >
        <span className="search-logo">
          <i className="fas fa-users"></i>
        </span>
        <div ref={node}>
          <Field type="text" name={name}>
            {({ form }) => {
              const { values } = form;

              return (
                <>
                  <input
                    type="text"
                    // value = {values.occupancy.length}
                    // value={`${values.occupancy.length} Room `}
                    value={`${values && values.occupancy.length} Room ${
                      values &&
                      values.occupancy
                        .map((item) => item.adult)
                        .reduce((curval, newval) => curval + newval)
                    } Adult`}
                    onClick={() => setOpen(!open)}
                  />
                </>
              );
            }}
          </Field>

          {open && (
            <FieldArray name="occupancy">
              {(arrayHelpers) => (
                <>
                  <div class="option-content">
                    <div className="header">
                      <div className="row">
                        <div className="col-6">
                          <div>rooms</div>
                        </div>
                        <div className="col-6">
                          <div className="number">
                            <div>
                              {arrayHelpers.form.values.occupancy.length >
                                1 && (
                                <i
                                  id="minus"
                                  className="fas fa-minus-circle"
                                  onClick={() =>
                                    arrayHelpers.pop({
                                      adult: 1,
                                      child: 0,
                                      id: "" + Math.random(),
                                    })
                                  }
                                ></i>
                              )}
                            </div>
                            <div>
                              {arrayHelpers.form.values.occupancy.length}
                            </div>
                            <div>
                              <i
                                id="plus"
                                className="fas fa-plus-circle"
                                onClick={() =>
                                  arrayHelpers.push({
                                    adult: 1,
                                    child: 0,
                                    id: "" + Math.random(),
                                  })
                                }
                              ></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {arrayHelpers.form.values.occupancy.map((room, index) => {
                      return (
                        <div className="room-occupancy" key={room.id}>
                          <div className="sub-header">
                            room {`0${index + 1}`}
                          </div>
                          <div className="row ">
                            <div className="col-6">
                              <div className="number">
                                <div>
                                  {arrayHelpers.form.values.occupancy[index]
                                    .adult > 1 && (
                                    <i
                                      id="minus"
                                      className="fas fa-minus-circle"
                                      onClick={() =>
                                        handleAdult(
                                          index,
                                          0,
                                          arrayHelpers.form.values,
                                          arrayHelpers.form.setFieldValue
                                        )
                                      }
                                    ></i>
                                  )}
                                </div>
                                <div>
                                  {/* <Field name={`room.${index}.adult`} type="hidden" /> */}
                                  {room.adult}
                                </div>
                                <div>
                                  {arrayHelpers.form.values.occupancy[index]
                                    .adult < 2 && (
                                    <i
                                      id="plus"
                                      className="fas fa-plus-circle"
                                      onClick={() =>
                                        handleAdult(
                                          index,
                                          1,
                                          arrayHelpers.form.values,
                                          arrayHelpers.form.setFieldValue
                                        )
                                      }
                                    ></i>
                                  )}
                                </div>
                              </div>
                              <span>adult</span>
                            </div>
                            <div className="col-6">
                              <div className="number">
                                <div>
                                  {arrayHelpers.form.values.occupancy[index]
                                    .child > 0 && (
                                    <i
                                      id="minus"
                                      className="fas fa-minus-circle"
                                      onClick={() =>
                                        handleChild(
                                          index,
                                          0,
                                          arrayHelpers.form.values,
                                          arrayHelpers.form.setFieldValue
                                        )
                                      }
                                    ></i>
                                  )}
                                </div>
                                <div>{room.child}</div>
                                <div>
                                  {arrayHelpers.form.values.occupancy[index]
                                    .child < 2 && (
                                    <i
                                      id="plus"
                                      className="fas fa-plus-circle"
                                      onClick={() =>
                                        handleChild(
                                          index,
                                          1,
                                          arrayHelpers.form.values,
                                          arrayHelpers.form.setFieldValue
                                        )
                                      }
                                    ></i>
                                  )}
                                </div>
                              </div>
                              <span>children</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </FieldArray>
          )}
        </div>
        <div className="item-sup">Occupancy</div>
      </div>
    </>
  );
}

export default RoomSelector;
