import enumeration from "./enumeration";

const DateTime = {
  A: "MMMM D, YYYY", // January 29, 2021
  B: "hh:mm:ss A", // 08:00:00 AM
  C: "MMM D, YYYY", // Jan 29, 2021
  D: "h:mm A", // 8:00 AM
  E: "HH:mm:ss", // 08:00:00
  F: "MM/DD/YYYY HH:mm:ss", // 12/31/2021 08:00:00,
  G: "DD MMMM YYYY h:mm A", //  22 January 2021 3:49 PM
  H: "MMMM D, YYYY h:mm A", // January 22, 2021 3:49 PM
  I: "MMM D, YYYY h:mm A", // Jan 22, 2021 3:49 PM
  J: "MMM D, YYYY hh:mm:ss A", //
  K: "DD MMM YYYY h:mm A", // 22 Jan 2021 08:00 AM
};

export default enumeration(DateTime);
