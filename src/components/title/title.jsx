import React from "react";
import classnames from "classnames";

const Title = ({
  xxl,
  xl,
  lg,
  sm,
  children,
  className,
  color = "text-pelorous-darker",
  fontWeight = "font-bold",
  onClick,
}) => {
  if (xxl) {
    return (
      <h1 className={classnames(`text-xxl ${fontWeight} ${color}`, className)} onClick={onClick}>
        {children}
      </h1>
    );
  }
  if (xl) {
    return (
      <h1 className={classnames(`text-xl ${fontWeight} ${color}`, className)} onClick={onClick}>
        {children}
      </h1>
    );
  }
  if (lg) {
    return (
      <h2 className={classnames(`text-lg ${fontWeight} ${color}`, className)} onClick={onClick}>
        {children}
      </h2>
    );
  }
  if (sm) {
    return (
      <h4 className={classnames(`text-sm ${fontWeight} ${color}`, className)} onClick={onClick}>
        {children}
      </h4>
    );
  }
  return (
    <h3 className={classnames(`text-md ${fontWeight} ${color}`, className)} onClick={onClick}>
      {children}
    </h3>
  );
};

export default Title;

// type: xl, lg, sm
