import numeral from "numeral";

export const formatNumberWithComma = (num) => {
  if (num) {
    return numeral(num).format("0,0");
  }
  if (num === 0) {
    return "0";
  }
  return "";
};

export const toPercentage = (num) => {
  return `${numeral(num).format("0,0.00")} %`;
};

export const parseAmountToNumber = (num) => {
  return Number(numeral(num).value());
};

export const toIntString = (num) => {
  return numeral(num).format("0");
};

export const toAmount = (num, format = "0,0.00") => {
  return numeral(num).format(format);
};

export const add = (a, b) => {
  return Number(a) + Number(b);
};

export const multiply = (a, b) => {
  return a * b;
};

export const subtract = (a, b) => {
  return a - b;
};

export const divide = (a, b) => {
  return a / b;
};

export const isInt = (n) => {
  return Number(n) === n && n % 1 === 0;
};

export const isFloat = (n) => {
  return Number(n) === n && n % 1 !== 0;
};

export const formatNumberToShortUnit = (e) => {
  // const label = e.toString();
  const value = Number(e);
  if (value < 999) {
    return e;
  }
  const big = [
    {
      value: parseAmountToNumber("1,000"),
      abbreviation: "K",
    },
    {
      value: parseAmountToNumber("1,000,000"),
      abbreviation: "M",
    },
    {
      value: parseAmountToNumber("1,000,000,000"),
      abbreviation: "B",
    },
    {
      value: parseAmountToNumber("1,000,000,000,000"),
      abbreviation: "t",
    },
    {
      value: parseAmountToNumber("1,000,000,000,000,000"),
      abbreviation: "q",
    },
    {
      value: parseAmountToNumber("1,000,000,000,000,000,000"),
      abbreviation: "Q",
    },
  ];
  let u = null;
  big.some((unit, key) => {
    const lessThanNextUnit = big[key + 1] ? value <= big[key + 1].value : false;
    const greaterThan = key === 0 ? value >= 999 : value >= unit.value;

    if (greaterThan && lessThanNextUnit) {
      u = {
        ...unit,
        deductZero: (key + 1) * 3,
      };
      return false;
    }
    return true;
  });
  if (u) {
    const val = value / u.value;
    return `${val}${u.abbreviation}`;
  }
  return formatNumberWithComma(e);
};

export const isValidDecimalPlaces = (value, place = 0) => {
  let cleanValue = `${value}`.replace(/,/g, "");
  const num = cleanValue.split(".");
  if (num?.[1]) {
    return num?.[1].length <= place;
  }
  return true;
};

export const isNumberValid = (value) => {
  let cleanValue = `${value}`.replace(/,/g, "");
  return !isNaN(cleanValue);
};

export const isNumeric = (value) => {
  return !isNaN(value);
};

export const isDecimalLastCharacter = (value) => {
  return value.indexOf(".") === value.length - 1;
};

export const isZeroLastCharacter = (value) => {
  return value.indexOf("0") === value.length - 1;
};

export const removeWhitespace = (value) => {
  let cleanValue = `${value}`.replace(/ /g, "");
  return cleanValue;
};

export const containsNumber = (value) => {
  return /\d/.test(value)
}