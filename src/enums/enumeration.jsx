const enumeration = (enumObj) => {
  const isValid = (enumValue) => {
    for (const [, eo] of Object.entries(enumObj)) {
      if (eo === enumValue) {
        return true;
      }
    }
    return false;
  };

  return { ...enumObj, isValid };
};

export default enumeration;
