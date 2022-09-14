import React from "react";
import { Dropdown } from "components";
import styles from "./simple-dropdown.module.scss";
// import { DownOutlined } from "@ant-design/icons";
import classnames from "classnames";
import { Icon } from "components";

const SimpleDropdown = ({
  text,
  classname,
  color,
  trigger,
  iconName = "caret-down",
  iconStyle = "text-xxs",
  container = styles.container,
  ...dropdownProps
}) => {
  return (
    <Dropdown trigger={trigger} {...dropdownProps}>
      <div className={classname ? classname : classnames(container)}>
        <div className={classnames(styles.text)}>{text}</div>
        <div>
          <Icon name={iconName} className={iconStyle} color={color} />
        </div>
      </div>
    </Dropdown>
  );
};

export default SimpleDropdown;
