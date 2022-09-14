import React from "react";
import { Checkbox, Text } from "..";
import classnames from "classnames";
import styles from "./field.module.scss";

const CheckboxField = ({ children, className, textSize = "text-sm", ...props }) => {
  return (
    <div className={classnames("flex items-center", className, styles.field)}>
      <Checkbox {...props} />
      <Text className="ml-sm mt-xs" size={textSize}>
        {children}
      </Text>
    </div>
  );
};

export default CheckboxField;
