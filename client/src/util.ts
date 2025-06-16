import moment, { type Moment } from "moment-timezone";

export const getTimezone = (abbreviate: boolean = false): string => {
  const tz = moment.tz.guess();
  if (abbreviate) {
    const abbr = moment.tz(tz).format("z");
    return abbr;
  } else {
    return tz;
  }
};
