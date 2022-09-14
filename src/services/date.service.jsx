import { DateTime, TimeUnit } from "enums";
import moment from "moment";
import momentTimezone from "moment-timezone";
import { toIntString } from "./number.service";

export const formatDate = (date, format = DateTime.A) => {
  if (date && format) {
    return moment(date).format(format);
  }
  return "";
};

export const formatDateUtc = (date, format = DateTime.A) => {
  if (date && format) {
    return moment.utc(date).format(format);
  }
  return "";
};

export const isDifferenceMoreThanHour = (date) => {
  return Math.abs(moment().diff(date, "hours")) > 0;
};

export const isDateToday = (date) => {
  return moment(date).isSame(moment(), "day");
};

export const hasDatePassed = (date) => {
  return moment(date).diff(moment()) < 0;
};

export const stringToDate = (date, format) => {
  if (date && format) {
    return moment(date, format);
  }
  return "";
};

export const timeAgo = (
  dateTime,
  separateDateAndTime = false,
  dateFormat = DateTime.C,
  timeFormat = DateTime.D
) => {
  const currentTimeZone = momentTimezone.tz.guess();
  const date = momentTimezone(dateTime).tz(currentTimeZone);
  const timeValue = momentTimezone(date).tz(currentTimeZone).format(timeFormat);
  const dateValue = momentTimezone(date).tz(currentTimeZone).format(dateFormat);

  const today = momentTimezone().tz(currentTimeZone);

  const seconds = moment(today).utc().diff(moment(date).utc()) / 1000;
  let d = "";
  let t = "";
  if (seconds < 0) {
    d = dateValue === moment().format(dateFormat) ? "Today" : dateValue;
    t = timeValue;
  } else if (seconds < 2) {
    d = "Just now";
  } else if (seconds < 60) {
    d = `${toIntString(seconds, "0")} second${seconds > 1 ? "s" : ""} ago`;
  } else if (seconds < 3600) {
    const minutes = seconds / 60;
    d = `${toIntString(minutes, "0")} minute${Number(minutes.toFixed(0)) > 1 ? "s" : ""} ago`;
  } else if (seconds < 7200) {
    d = "an hour ago";
  } else if (dateValue === moment().format(dateFormat)) {
    d = "Today";
    t = timeValue;
  } else if (dateValue === moment().subtract(1, "days").format(dateFormat)) {
    d = "Yesterday";
    t = timeValue;
  }
  if (d && t) {
    if (!separateDateAndTime) {
      return `${d} at ${t}`;
    }
    return {
      date: d,
      time: t,
    };
  } else if (d) {
    if (!separateDateAndTime) {
      return d;
    }
    return {
      date: d,
      time: "",
    };
  }
  if (!separateDateAndTime) {
    return `${dateValue} ${timeValue}`;
  }
  return {
    date: dateValue,
    time: timeValue,
  };
};

export const measureTime = (dates, dateFormat = DateTime.A) => {
  const currentTimeZone = momentTimezone.tz.guess();
  const from = momentTimezone(dates[0]).tz(currentTimeZone);
  const to = momentTimezone(dates[1]).tz(currentTimeZone);

  const seconds = moment(to).utc().diff(moment(from).utc()) / 1000;

  const getTimeMeasures = () => {
    return {
      seconds,
      minute: seconds / 60,
      hour: seconds / 3600,
      day: seconds / 86400,
      week: seconds / 604800,
      month: seconds / 2419200,
      year: seconds / 29030400,
    };
  };

  const getSplitType = () => {
    const measurement = getTimeMeasures();
    if (from.format(dateFormat) === to.format(dateFormat)) {
      return TimeUnit.Hour;
    } else if (measurement.week < 4 || measurement.month < 1.12) {
      return TimeUnit.Day;
      // } else if (measurement.month < 1) {
      // return type.Week;
      // removing in the meantime
    } else if (measurement.month < 24) {
      return TimeUnit.Month;
    } else {
      return TimeUnit.Year;
    }
  };
  return {
    getSplitType,
    getTimeMeasures,
  };
};

export const toApiDateTimeFormat = (date, endSeconds = false) => {
  const zone = date.format("Z").replace(":", "");
  return `${date.format(`YYYY-MM-DDTHH:mm:${endSeconds ? "59" : "00"}.000`)}${zone}`;
};

export const modifyFromTimeRange = (val, filterState, modifyFilter) => {
  const endTime = filterState.dateRange[1];
  const startDate = filterState.dateRange[0].format("MM-DD-YYYY");
  const endDate = filterState.dateRange[1].format("MM-DD-YYYY");
  if (startDate === endDate) {
    modifyFilter("dateRange", {
      value: [val, endTime < val ? val : endTime],
    });
    return false;
  }
  modifyFilter("dateRange", {
    value: [val, endTime],
  });
};

export const modifyToTimeRange = (val, filterState, modifyFilter) => {
  const startTime = filterState.dateRange[0];
  const startDate = filterState.dateRange[0].format("MM-DD-YYYY");
  const endDate = filterState.dateRange[1].format("MM-DD-YYYY");
  if (startDate === endDate) {
    modifyFilter("dateRange", {
      value: [startTime > val ? val : startTime, val],
    });
    return false;
  }
  modifyFilter("dateRange", {
    value: [startTime, val],
  });
};

export const convertUTCDateToLocalDate = (date) => {
  const newDate = new Date(`${date} UTC`);
  return newDate.toString();
};

export const getDateDifference = (startDate, endDate) => {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  return Math.floor((new Date(startDate) - new Date(endDate)) / _MS_PER_DAY);
};

export const getNightsCount = (startDate, endDate) => {
  return moment.utc(endDate).endOf("day").diff(moment.utc(startDate).startOf("day"), "days", false);
};
