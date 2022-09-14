import React from "react";
import styles from "./modal.module.scss";

const FullModal = ({ active, children }) => {
  return (
    <div className={styles.dimmer}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default FullModal;
