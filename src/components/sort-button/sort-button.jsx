import React, { useCallback } from "react";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import classNames from "classnames";

const SortButton = ({ title, className, sort = "off", onClick, align = "between" }) => {
  const getSortValue = () => {
    if (sort === "off") {
      return "sort-off";
    }
    return sort === "asc" ? "sort-ascending" : "sort-descending";
  };

  const alignToJustify = useCallback((align) => {
    if (align === "center") return "center";
    if (align === "right") return "end";
    return "between";
  }, []);

  return (
    <span
      className={classNames(
        `text-thead text-washed-dark cursor-pointer flex items-center w-full`,
        className,
        {
          [`justify-${alignToJustify(align)}`]: align,
        }
      )}
      onClick={() => {
        onClick(sort === "asc" ? "desc" : "asc");
      }}
    >
      {title}
      {getSortValue() === "sort-ascending" ? <DownOutlined className="ml-md" /> : null}
      {getSortValue() === "sort-descending" || getSortValue() === "sort-off" ? (
        <UpOutlined className="ml-md" />
      ) : null}
    </span>
  );
};

export default SortButton;
