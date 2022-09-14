import {
  TimeUnit,
} from "enums";

export const prettifyTimeUnit = (timeValue, timeUnit) => {
  return timeValue === 1
    ? {
      [TimeUnit.Second]: "seconds",
      [TimeUnit.Minute]: "minute",
      [TimeUnit.Hour]: "hour",
      [TimeUnit.Day]: "day",
      [TimeUnit.Month]: "month",
      [TimeUnit.Year]: "year",
    }[timeUnit] || ""
    : {
      [TimeUnit.Second]: "seconds",
      [TimeUnit.Minute]: "minutes",
      [TimeUnit.Hour]: "hours",
      [TimeUnit.Day]: "days",
      [TimeUnit.Month]: "months",
      [TimeUnit.Year]: "years",
    }[timeUnit] || "";
};
