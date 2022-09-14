import React, { useMemo } from "react";
import classnames from "classnames";
import styles from "./container.module.scss";

const Container = ({ children, className, parent, paddingless = false, mb = "lg", padding }) => {
  const paddingStyle = useMemo(() => {
    if (paddingless) {
      return "";
    }
    if (padding) {
      return padding;
    }
    return "p-lg";
  }, [paddingless, padding]);
  return (
    <div
      className={classnames(styles.container, className, paddingStyle, `mb-${mb}`, {
        [`${styles.parent}`]: parent,
        "last:mb-0": !mb,
      })}
    >
      {children}
    </div>
  );
};

export default Container;
