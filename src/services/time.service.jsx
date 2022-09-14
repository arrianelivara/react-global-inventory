import { TimeUnit } from "enums";
import { prettifyTimeUnit } from "services";

export const convertTimeUnit = (time) => {
  if (time < 60) {
    let sec = Math.floor((time % 3600) % 60);
    
    return {
      value: sec,
      unit: prettifyTimeUnit(sec, TimeUnit.Second),
    };
  } else if (time < 3600) {
    let min = Math.floor((time % 3600) / 60);
    return {
      value: min,
      unit: prettifyTimeUnit(min, TimeUnit.Minute),
    };
  } else if (time < 86400) {
    let hr = Math.floor(time / 3600);
    return {
      value: hr,
      unit: prettifyTimeUnit(hr, TimeUnit.Hour),
    };
  }
};
