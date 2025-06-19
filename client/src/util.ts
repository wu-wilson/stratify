import moment from "moment-timezone";

export const getTimezone = (abbreviate: boolean = false): string => {
  const tz = moment.tz.guess();
  if (abbreviate) {
    const abbr = moment.tz(tz).format("z");
    return abbr;
  } else {
    return tz;
  }
};

export const getTruncatedText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  console.log(text.slice(0, maxLength - 3) + "...");
  return text.slice(0, maxLength - 3) + "...";
};
