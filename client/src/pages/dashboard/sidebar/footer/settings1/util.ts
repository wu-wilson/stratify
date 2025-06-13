import moment from "moment-timezone";
import { getTimezone } from "../../../../../util";

export const formatCreationTime = (dateString: string) => {
  const utc = moment.utc(dateString);
  const tz = moment.tz.guess();
  return utc.tz(tz).format("hh:mm A on MMM D, YYYY");
};

export const fallback = "Unknown";
export const timezone = `${getTimezone()} (${getTimezone(true)})`;
