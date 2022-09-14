import React from "react";
import classnames from "classnames";

const Text = ({
  description,
  label,
  danger,
  strong,
  italic,
  underline,
  error,
  title,
  size = "text-sm",
  color = "text-black",
  children,
  className,
  uppercase,
  capitalize,
  fontWeight = "font-normal",
  classes = {},
  fontMono,
  breakAll,
}) => {
  const classStyle = classnames(
    {
      ...classes,
      "text-red": danger,
      "font-semibold": strong,
      italic: italic,
      underline: underline,

      uppercase: uppercase,
      capitalize: capitalize,
      "font-mono font-bold": fontMono,
      "break-all": breakAll,
      "break-words": !breakAll,
    },
    className
  );
  if (description) {
    return <p className={classnames("text-sm text-blue-light", classStyle)}>{children}</p>;
  }

  if (label) {
    return (
      <div className={classnames("text-xs text-gray-500 font-semibold", classStyle)}>
        {children}
      </div>
    );
  }


  if (error) {
    return <p className={classnames("text-xs text-red", classStyle)}>{children}</p>;
  }

  if (title) {
    return (
      <p className={classnames("text-black-light font-bold", size, classStyle)}>{children}</p>
    );
  }

  return (
    <p className={classnames(`${strong ? "" : fontWeight} ${size} ${color}`, classStyle)}>
      {children}
    </p>
  );
};

export default Text;
