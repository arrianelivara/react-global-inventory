import React, { useState, useMemo } from "react";
import styles from "./select.module.scss";
import classnames from "classnames";
import { Select as AntSelect } from "antd";
import { Icon } from "components";
import { DownOutlined } from "@ant-design/icons";
import { sortByKeyName } from "services";

const { Option, OptGroup } = AntSelect;

const Select = ({
  required,
  error,
  className,
  placeholder,
  options = [],
  value,
  onChange,
  onSearch = null,
  name,
  loading = false,
  searchable,
  disabled,
  pagination,
  height = "h-field",
  customRenderContent,
  optionClassName = "py-sm",
  fetchingOptions,
  footer,
  // searchValue,
  onScroll,
  groupedOptions,
  customNotFoundContent,
  sortOptions = true,
  dynamicOptions = false,
  ...props
}) => {
  const [open, setOpen] = useState(false);

  const isValueIncludedInOption = useMemo(() => {
    let isIncluded = options.some((option) => option.value === value);
    return isIncluded;
  }, [value, options]);

  return (
    <div
      className={classnames(
        "flex items-center border rounded border-solid relative cursor-pointer text-sm",
        {
          "border-white-darker text-black": !error,
          "border-red text-red": error,
          "bg-gray-disabled": disabled,
          "bg-white": !pagination,
        },
        className,
        styles.select,
        height
      )}
    >
      <AntSelect
        bordered={false}
        className={classnames(styles.container, "text-sm w-full h-full", {
          "text-gray-500": pagination || disabled,
        })}
        showSearch={searchable}
        dropdownRender={!customRenderContent ? null : customRenderContent}
        placeholder={loading ? "Loading..." : placeholder}
        value={isValueIncludedInOption ? value : dynamicOptions ? value : null}
        onChange={(v, option) => {
          onChange(name, {
            value: v,
            option,
          });
        }}
        onSearch={onSearch}
        onPopupScroll={onScroll}
        filterOption={(input, option) => {
          const title = typeof option.title === "string" ? option.title : option.title?.toString();
          return title?.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        }}
        onClick={() => {
          setOpen(!open);
        }}
        suffixIcon={
          fetchingOptions ? null : (
            <div
              className="bg-white"
              onClick={() => {
                setOpen(!open);
              }}
            >
              <DownOutlined />
            </div>
          )
        }
        loading={loading}
        notFoundContent={
          <div>{fetchingOptions ? " Loading..." : customNotFoundContent || "No Data."}</div>
        }
        disabled={disabled || (loading && !options.length)}
        {...props}
      >
        {groupedOptions &&
          groupedOptions.map((groupedOption, groupIndex) => {
            return (
              <OptGroup
                label={groupedOption.label}
                key={groupIndex}
                className={classnames("text-sm", optionClassName)}
              >
                {groupedOption.options?.sort(sortByKeyName("text")).map((option, i) => {
                  return (
                    <Option
                      key={`${groupIndex}${i}`}
                      text={option.text}
                      subvalue={option.subvalue}
                      title={option.text}
                      value={option.value}
                      className={classnames("text-sm", optionClassName, {
                        "text-gray-light": option.disabled,
                        "text-gray-darker": !option.disabled,
                      })}
                    >
                      {option.text}
                    </Option>
                  );
                })}
              </OptGroup>
            );
          })}
        {!groupedOptions &&
          sortOptions &&
          options.sort(sortByKeyName("text")).map((option, i) => {
            return (
              <Option
                key={i}
                subvalue={option.subvalue}
                value={option.value}
                disabled={option.disabled}
                title={option.text}
                className={classnames("text-sm", optionClassName, {
                  "text-gray-light": option.disabled,
                  "text-gray-darker": !option.disabled,
                })}
              >
                {option.custom || option.text}
              </Option>
            );
          })}
        {!groupedOptions &&
          !sortOptions &&
          options.map((option, i) => {
            return (
              <Option
                key={i}
                subvalue={option.subvalue}
                value={option.value}
                disabled={option.disabled}
                title={option.text}
                className={classnames("text-sm", optionClassName, {
                  "text-gray-light": option.disabled,
                  "text-gray-darker": !option.disabled,
                })}
                onClick={() => {
                  setOpen(!open);
                }}
              >
                {option.custom || option.text}
              </Option>
            );
          })}
      </AntSelect>
      {fetchingOptions && <Icon loading className="mr-sm text-gray" paddingless fontSize="10px" />}

      {required && (
        <div className={classnames(styles.required, { [`${styles.error}`]: error })}>
          <Icon
            name="asterisk"
            className={classnames(styles.icon, { [`${styles.error}`]: error })}
          />
        </div>
      )}
    </div>
  );
};

export default Select;
