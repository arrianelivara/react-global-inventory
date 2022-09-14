import React, { useCallback } from "react";
import { Pagination as AntPagination } from "antd";
import { Select } from "..";
import classnames from "classnames";

const Pagination = ({
  className,
  page = 1,
  pageSize = 20,
  total = 50,
  onChangePage,
  onChangePageSize,
  optionClassnames,
  size = "default",
}) => {
  const onChangePageCb = useCallback(
    (page) => {
      if (onChangePage) {
        onChangePage(page);
      }
    },
    [onChangePage]
  );

  const onChangePageSizeCb = useCallback(
    (name, obj) => {
      if (onChangePageSize) {
        onChangePageSize(obj.value);
      }
    },
    [onChangePageSize]
  );

  const placeholder = "20 per page";
  const pageSizeOptions = [
    { text: "10 per page", value: 10 },
    { text: "20 per page", value: 20 },
    { text: "30 per page", value: 30 },
  ];

  return (
    <div className={classnames(className)}>
      <div className="block md:flex items-center justify-end">
        {total >= pageSize && (
          <AntPagination
            className="text-right bg-none flex justify-center mt-md md:mt-0"
            current={page}
            pageSize={pageSize}
            total={total}
            onChange={onChangePageCb}
            showSizeChanger={false}
            size={size}
          />
        )}

        {total > 10 ? (
          <Select
            className={classnames(
              "w-36 max-h-8 my-md md:flex ml-sm ml-auto bg-none",
              optionClassnames
            )}
            name="pagination"
            placeholder={placeholder}
            options={pageSizeOptions}
            value={pageSize}
            onChange={onChangePageSizeCb}
            pagination={true}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Pagination;
