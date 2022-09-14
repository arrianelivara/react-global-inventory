export const formatTagUIds = (tagUid, regex = /(.{4})/g) => {
  const rgx = RegExp(regex);
  return tagUid?.replace(rgx, "$1 ").trim() || "";
};

export const formatName = (firstName = "", lastName = "") => {
  return `${firstName ? firstName : ""} ${lastName ? lastName : ""}`.trim();
};

export const capitalize = (string = "") => {
  return `${string[0]?.toString().toUpperCase()}${string?.substring(1).toString().toLowerCase()}`;
};

export const pluralize = (count, singular, plural) => {
  return count >= 2 ? plural : singular;
};

export const formatNumberToOrdinal = (num = 0) => {
  if (num) {
    let lastDigit = Number(num.toString().charAt(num.toString().length - 1));
    if ([11, 12, 13].includes(num)) {
      lastDigit = null;
    }
    switch (lastDigit) {
      case 1:
        return `${num}st`;
      case 2:
        return `${num}nd`;
      case 3:
        return `${num}rd`;
      default:
        return `${num}th`;
    }
  } else {
    return "";
  }
};

export const isAlphaNumeric = (value) => {
  const pattern = new RegExp(/[^A-Za-z0-9]+/g);
  return !pattern.exec(value);
};

export const formatId = (id) => {
  if (id < 100) {
    return `00${id}`;
  }
  if (id < 1000 && id > 99) {
    return `0${id}`;
  }
  return id;
};

export const logoIcons = [
  "briefcase1",
  "bank",
  "building",
  "book1",
  "bug1",
  "bolt",
  "bullseye",
  "lightbulb",
  "calendar1",
  "cart1",
  "union",
  "gear1",
  "mail1",
  "info2",
  "help",
  "home2",
  "message",
  "news",
  "plane",
  "saturn",
  "send",
  "server",
  "truck1",
];
