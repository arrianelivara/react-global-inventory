import React, { useCallback } from "react";
import { Checkbox as AntCheckbox } from "antd";
import classnames from "classnames";
import styles from "./checkbox.module.scss";

const Checkbox = ({ value, onChange, name, disabled, loading, className }) => {
  const onChangeCb = useCallback(
    (e) => {
      if (onChange) {
        onChange(name, {
          value: !value,
        });
      }
    },
    [name, value, onChange]
  );
  return (
    <AntCheckbox
      loading={loading}
      className={classnames(className, styles.container)}
      disabled={disabled}
      checked={value}
      onClick={(e) => {
        e.stopPropagation();
      }}
      onChange={onChangeCb}
    />
  );
};

export default Checkbox;
