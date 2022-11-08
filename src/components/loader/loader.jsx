import React from "react";
import { Icon } from "components";
import styles from "./loader.module.scss";

const Loader = ({ loading }) => {
  if (!loading) {
    return null;
  }
  return (
    <div className={styles.container}>
      <Icon loading className="m-auto text-white" fontSize="40px" />
    </div>
  );
};

export default Loader;
