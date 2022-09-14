import React from "react";
import { Skeleton as Loader } from "antd";
import styles from "./skeleton.module.scss";

const Skeleton = ({ single, className, avatar, ...props }) => {
  if (single) {
    return (
      <Loader.Button active={true} size={"small"} shape={"square"} className={styles.container} />
    );
  }

  if (avatar) {
    return <Loader.Avatar active={true} size={"small"} shape={"circle"} />;
  }
  return <Loader width="100%" active={true} className={className} {...props} />;
};

export default Skeleton;
