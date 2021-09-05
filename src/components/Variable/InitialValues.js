import { addDays, set, format } from "date-fns";
import { useState } from "react";

const startDate = new Date();
const endDate = addDays(new Date(), 1);

export const initialValues = {
  occupancy: [{ adult: 1, child: 0, id: "" + Math.random() }],
  selectionRange: {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  },
};
