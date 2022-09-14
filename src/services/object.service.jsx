export const mapObject = (src = {}, mapper = {}, params = {}) => {
  let newObj = {};

  for (const [k, v] of Object.entries(mapper)) {
    if (k === "_keys") {
      v.forEach((_k) => {
        newObj[_k] = src[_k];
      });
    } else if (v?.hasOwnProperty("transform")) {
      if (v.hasOwnProperty("key")) {
        // renaming self
        newObj[k] = v.transform({ src, self: src[v.key], params });
      } else {
        newObj[k] = v.transform({ src, self: src[k], params });
      }
    } else if (v?.hasOwnProperty("key")) {
      if (src?.hasOwnProperty(v.key)) {
        newObj[k] = src[v.key];
      }
    } else {
      newObj[k] = v;
    }
  }

  return newObj;
};

export const mapObjects = (src = [], mapper = {}, params = {}) => {
  return src.map((s) => {
    return mapObject(s, mapper, params);
  });
};

export const checkIfObjectValuesAreEqual = (obj1, obj2) => {
  // sorting of keys must match, else this will not work
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

export const mapObjectsToSelect = (
  objects,
  { valueKey = "id", textKey = "value", disabledKey = "disabled" }
) => {
  return objects.map((obj) => {
    return { text: obj[textKey], value: obj[valueKey], disabled: obj[disabledKey] };
  });
};

export const mapSelectObjectsToValue = (objects) => {
  if (objects) {
    return objects.map((obj) => {
      return obj.value;
    });
  } else {
    return null;
  }
};

export const keyIndexToValueMapper = (keys) => {
  const obj = {};
  keys.forEach(([keyName, keyValue]) => {
    obj[keyName] = {
      key: keyValue,
    };
  });
  return obj;
};

export const sortByKeyName = (key, string = true) => {
  return (a, b) => {
    const first = string ? a[key].toString().toLowerCase() : a[key];
    const second = string ? b[key].toString().toLowerCase() : b[key];
    if (first < second) {
      return -1;
    }
    if (first > second) {
      return 1;
    }
    return 0;
  };
};

export const sortByExcelLogic = (key = null) => {
  // Sort by numbers first, then special characters, then alphabet.
  // Refer to: https://pouchnation.atlassian.net/wiki/spaces/POUCHNATIO/pages/5570789/Sorting?focusedCommentId=8781924#comment-8781924

  const orderAlpha = "abcdefghijklmnopqrstuvwxyz";
  const orderNumber = "0123456789";
  const ap = Array.prototype;

  let totalNumbers = 0;
  const orderMapNum = {};
  ap.forEach.call(orderNumber, (char, idx) => {
    orderMapNum[char] = idx + 1;
    totalNumbers++;
  });

  const orderMapAlpha = {};
  ap.forEach.call(orderAlpha, (char, idx) => {
    orderMapAlpha[char] = idx + totalNumbers + 2;
  });

  function compareChars(l, r) {
    const lOrder = orderMapNum[l] || orderMapAlpha[l] || totalNumbers + 1;
    const rOrder = orderMapNum[r] || orderMapAlpha[r] || totalNumbers + 1;

    return lOrder - rOrder;
  }

  function compareStrings(l, r) {
    l = key ? l[key].toLowerCase() : l;
    r = key ? r[key].toLowerCase() : r;
    const minLength = Math.min(l.length, r.length);
    const result = ap.reduce.call(
      l.substring(0, minLength),
      (prev, _, i) => {
        return prev || compareChars(l[i], r[i]);
      },
      0
    );

    return result || l.length - r.length;
  }

  return compareStrings;
};

export const mapIntegrationFlag = (name = "", flags = {}) => {
  return flags[name];
};
