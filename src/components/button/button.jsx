import React from "react";
import { Button as AntButton } from "antd";
import { StyleType } from "enums";
import { Icon } from "components";
import classnames from "classnames";
import styles from "./button.module.scss";

const Button = ({
  className,
  type = StyleType.Primary,
  loading,
  disabled,
  children,
  iconPrefix,
  iconSuffix,
  onClick,
}) => {
  return (
    <AntButton
      disabled={disabled}
      onClick={onClick}
      className={classnames(
        "h-auto focus:outline-none",
        {
          [`px-md py-sm border rounded border-solid`]: type === StyleType.Primary,
          [`px-md py-sm border rounded border-solid text-pelorous bg-white border-gray-200`]:
            type === StyleType.Secondary,
          [`px-md py-sm border rounded border-solid text-white`]: type === StyleType.Danger,
          [`px-sm py-xs sm:px-md py-sm text-pelorous bg-transparent border-0`]:
            type === StyleType.Link,
          [`px-md py-sm text-pelorous bg-transparent border rounded border-solid`]:
            type === StyleType.Plain || type === StyleType.Ghost,
        },
        {
          [`${styles.primary}`]: type === StyleType.Primary,
          [`${styles.secondary}`]: type === StyleType.Secondary,
          [`${styles.danger}`]: type === StyleType.Danger,
          [`${styles.link}`]: type === StyleType.Link,
          [`${styles.filter}`]: type === StyleType.Filter,
          [`${styles.ghost}`]: type === StyleType.Ghost,
          [`${styles.plain}`]: type === StyleType.Plain,
        },
        styles.button,
        className
      )}
    >
      <div
        className={classnames(
          "flex items-center align-center justify-center text-xs md:text-sm font-bold"
        )}
      >
        {loading && <Icon className="mr-sm" loading fontSize="1px" paddingless={true} />}
        {iconPrefix}
        {children}
        {iconSuffix}
      </div>
    </AntButton>
  );
};

export default Button;
