import React from "react";
import classnames from "classnames";
import { Spin } from 'antd';

const Icon = ({ loading, name, className, onClick, fontSize, paddingless = false, color, size = 'small' }) => {
  if (loading) {
    return (
      <Spin
        className={classnames(className, {
          "px-xs py-xs": !paddingless,
        })}
        style={{
          fontSize,
        }}
        size={size}
      />
    );
  }
  return (
    <i
      className={classnames(`icon-${name} `, color, className, {
        "cursor-pointer": onClick,
        "px-xs py-xs": !paddingless,
      })}
      onClick={onClick}
      style={{
        fontSize,
      }}
    />
  );
};

export default Icon;
