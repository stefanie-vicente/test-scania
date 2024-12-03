import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import utc from "dayjs/plugin/utc";

dayjs.extend(isToday);
dayjs.extend(utc);

export const formatDate = (dateString) => {
  const date = dayjs.utc(dateString);
  const currentYear = dayjs().year();
  const dateYear = date.year();

  const formattedDate = date.format("MMMM D");
  const formattedWithYear = `${formattedDate}, ${dateYear}`;

  if (date.isToday()) {
    return `Today, ${formattedDate}`;
  }

  return dateYear === currentYear ? formattedDate : formattedWithYear;
};
