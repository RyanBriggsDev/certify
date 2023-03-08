import dayjs from "dayjs";

export const formatDate = (date) => {
  return dayjs(date).format("D-MMM-YYYY");
};

export const courseLength = (startdate, enddate) => {
  const start = dayjs(startdate);
  const end = dayjs(enddate);
  return end.diff(start, "day");
};
