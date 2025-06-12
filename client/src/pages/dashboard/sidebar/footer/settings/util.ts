import moment from "moment-timezone";

const getTimezone = (abbreviate: boolean = false): string => {
  const tz = moment.tz.guess();
  if (abbreviate) {
    const abbr = moment.tz(tz).format("z");
    return abbr;
  } else {
    return tz;
  }
};

export const formatCreationTime = (dateString: string) => {
  const utc = moment.utc(dateString);
  const tz = moment.tz.guess();
  return utc.tz(tz).format("hh:mm A on MMM D, YYYY");
};

export const fallback = "Unknown";
export const timezone = `${getTimezone()} (${getTimezone(true)})`;
