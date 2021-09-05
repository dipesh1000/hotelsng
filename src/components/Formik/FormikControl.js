import React from "react";
import DatePicker from "./DatePicker";
import RoomSelector from "./RoomSelector";
import Name from "./Name";
import Email from "./Email";
import Subject from "./Subject";
import Message from "./Message";
import Date from "./Date";
import Number from "./Number";
import ContactNo from "./ContactNo";
import DatePick from "./DatePick";
import Radio from "./Radio";
import Select from "./Select";
import FirstName from "./FirstName";
import LastName from "./LastName";
import Address from "./Address";

function FormikControl(props) {
  const { control, ...rest } = props;

  switch (control) {
    case "datepicker":
      return <DatePicker {...rest} />;
    case "occupancy":
      return <RoomSelector {...rest} />;
    case "name":
      return <Name {...rest} />;
    case "email":
      return <Email {...rest} />;
    case "subject":
      return <Subject {...rest} />;
    case "message":
      return <Message {...rest} />;
    case "datepick":
      return <DatePick {...rest} />;
    case "number":
      return <Number {...rest} />;
    case "phone":
      return <ContactNo {...rest} />;
    case "radio":
      return <Radio {...rest} />;
    case "select":
      return <Select {...rest} />;
    case "firstName":
      return <FirstName {...rest} />;
    case "lastName":
      return <LastName {...rest} />;
    case "address":
      return <Address {...rest} />;
    default:
      return null;
  }
}

export default FormikControl;
