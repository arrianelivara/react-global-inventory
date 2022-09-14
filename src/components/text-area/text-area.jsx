import React, { useCallback } from "react";
import classnames from "classnames";
import styles from "./text-area.module.scss";
const TextArea = ({ name, error, maxLength, value, placeholder, className, onChange }) => {
  const onChangeCb = useCallback(
    (e) => {
      if (onChange) {
        onChange(name, { value: e?.target.value });
      }
    },
    [onChange, name]
  );

  return (
    <textarea
      value={value}
      maxLength={maxLength}
      onChange={onChangeCb}
      placeholder={placeholder}
      className={classnames(
        "w-full px-md py-md border rounded border-solid focus:outline-none text-sm text-black",
        {
          "border-white-darker": !error,
          "border-red text-red": error,
        },
        className,
        styles.container
      )}
    ></textarea>
  );
};

export default TextArea;
