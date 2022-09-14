import { isNumeric } from "./number.service";

export const formatNumberToMoney = (value = "", roundUp = true, noDecimal) => {
  const locale = window.navigator.language; // Get browser default language
  const currency = getCurrency();
  let defaultZeroValue = "0.00";

  if (noDecimal) {
    defaultZeroValue = "0";
  }

  if (!currency) {
    return value || defaultZeroValue;
  }

  const parsedNumber = parseMoneyToNumber(value);

  // negative amounts have problems with converting to currency.
  // transform it first to positive, then append negative sign when returning
  let negativeAmount = false;
  if (parsedNumber.value * 1 < 0) {
    negativeAmount = true;
    parsedNumber.wholeNumber = parsedNumber.wholeNumber * -1;
  }

  let amount = new Intl.NumberFormat(locale, {
    style: noDecimal ? "decimal" : "currency",
    currency,
  }).format(roundUp ? value : parsedNumber.wholeNumber);
  if (amount.includes("NaN")) {
    amount = 0;
  }

  const values =
    parsedNumber.decimal && !roundUp
      ? `${amount.toString().split(parsedNumber.fraction)[0]}${parsedNumber.fraction}${
          parsedNumber.decimal
        }`
      : amount;
  let formattedAmount = values ? values.replace(/[^0-9.,-\s]/g, "") : values;
  if (!negativeAmount) {
    return `${formattedAmount.toString().trim()}`;
  } else {
    let cleanAmount = formattedAmount.toString().replaceAll(/\s/g, "").trim();
    cleanAmount = cleanAmount.replaceAll("-", "");
    return `-${cleanAmount}`;
  }
};

export const parseMoneyToNumber = (val = "") => {
  if (isNumeric(val)) {
    return {
      value: Number(val),
      val,
    };
  }
  const currency = getCurrency();
  const locale = window.navigator.language;

  const group = ["es-ES", "es-CO"].includes(locale)
    ? "."
    : new Intl.NumberFormat(locale).format(1111).replace(/1/g, "");
  const decimal = new Intl.NumberFormat(locale).format(1.1).replace(/1/g, "");
  const testMax = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(1.11111);
  const maxDecimalAmount = testMax ? testMax.toString().split(decimal)[1] : "";
  const v = val ? val.toString().split(decimal) : ["0"];
  let value = v[0].toString();
  try {
    if (group && value.includes(group)) {
      value = value.replace(new RegExp("\\" + group, "g"), "");
    }
  } catch (err) {
    console.log(err);
  }

  const decimalValue =
    v[1] && maxDecimalAmount
      ? v[1].toString().substring(0, maxDecimalAmount.toString().length)
      : "";
  if (decimalValue) {
    value = `${value}.${decimalValue}`.toString().trim();
  }
  const result = {
    value: Number(value),
    grouper: group,
    fraction: decimal,
    wholeNumber: v[0],
    decimal: decimalValue,
    val,
  };
  return result;
};

export const formatNumberToMoneyCurrency = (value, roundUp = true) => {
  const formattedAmount = formatNumberToMoney(value, roundUp, false);
  // const currency = getCurrencySymbol();
  return `${formattedAmount}`.trim();
};

export const formatNumberToMoneyWithCurrencySymbol = (value, roundUp = true) => {
  const formattedAmount = formatNumberToMoney(value, roundUp, false) || "0";
  const currency = getCurrencySymbol();
  return `${currency} ${formattedAmount}`.trim();
};

export const formatNumberToMoneyWithCurrencyParams = (value, roundUp = true, currency) => {
  const formattedAmount = formatNumberToMoney(value, roundUp, false);
  return `${currency} ${formattedAmount}`.trim();
};

export const getCurrency = () => {
  return localStorage.getItem("currencyCode");
};

export const getCurrencySymbol = () => {
  return localStorage.getItem("currencySymbol");
};
