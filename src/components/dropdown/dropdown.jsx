import React, { useMemo } from "react";
import { Dropdown as AntDropdown, Menu } from "antd";
import classnames from "classnames";

const Dropdown = ({
  options = [],
  className,
  children,
  id,
  trigger = "hover",
  placement = "bottomLeft",
}) => {
  const menu = useMemo(() => {
    const menuArr = options.map((o) => {
      return (
        <Menu.Item
          className={classnames({ "border-b": o.divider })}
          key={o.value}
          onClick={o.onClick}
        >
          {o.text}
        </Menu.Item>
      );
    });
    return <Menu className={id}>{menuArr}</Menu>;
  }, [options, id]);

  return (
    <div className={classnames(className)}>
      <AntDropdown overlay={menu} trigger={trigger} className={id} placement={placement}>
        {children}
      </AntDropdown>
    </div>
  );
};

export default Dropdown;
