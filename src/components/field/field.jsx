import React, { useMemo } from "react";
import classnames from "classnames";
import styles from "./field.module.scss";
import { Text } from "components";
import { Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

const Field = ({
  width,
  children,
  className,
  label,
  filterLabel,
  message,
  customLabel,
  customMessage,
  noLabel = false,
  errorClassName,
  tooltipMsg,
  error,
  labelSuffix,
  required
}) => {
  const labelDisplay = useMemo(() => {
    if (label && !noLabel) {
      return (
        tooltipMsg ? 
            <Text label className="break-all flex items-center">
              {required && <span className='text-red'>* </span>} {label}
              <Tooltip title={tooltipMsg}>
                <InfoCircleOutlined className="ml-xs"/>
              </Tooltip>
            </Text>
         : 
        <Text label className="break-all">
          {required && <span className='text-red'>* </span>} {label}
        </Text>
      );
    } else if (filterLabel) {
      return (
        <Text color="text-black-light" strong>
          {filterLabel}
        </Text>
      );
    } else {
      return customLabel;
    }
  }, [label, filterLabel, customLabel, noLabel, required]);

  return (
    <div className={classnames(`${width ? `${width}` : `w-full`}`, className, styles.field)}>
      {(labelDisplay || labelSuffix) && (
        <div className="mb-xs flex justify-between">
          {labelDisplay} {labelSuffix}
        </div>
      )}
      <div>{children}</div>
      {customMessage || message ? (
        <div className={errorClassName || "pn-error mt-xs"}>
          {customMessage || (
            <Text error={error} color={error ? "text-red" : "text-black"}>
              {message}
            </Text>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Field;
