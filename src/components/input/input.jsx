import React, { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { Input as AntInput } from "antd";
import { Icon } from "components";
import classnames from "classnames";
import styles from "./input.module.scss";

const Input = (
  {
    inputType = "text",
    className,
    name,
    placeholder,
    maxLength,
    minLength,
    loading,
    disabled,
    required,
    hoverClearable,
    readOnly,
    error = false,
    value,
    center,
    iconPrefix,
    iconSuffix,
    onChange,
    onFocus,
    onBlur,
    onPaste,
    onKeyUp,
    onEnter,
    onClear,
    right,
    width,
    uppercase,
    paddingless,
    valueSize = "text-sm",
    inputMode = null,
    altMaxLength = false,
  },
  ref
) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    value: () => {
      return inputRef.current.state?.value;
    },
    clearValue: () => {
      inputRef.current.state.value = "";
    },
  }));

  const onFocusCb = useCallback(() => {
    if (onFocus) {
      onFocus();
    }
  }, [onFocus]);

  const onBlurCb = useCallback(
    (e) => {
      if (onBlur) {
        onBlur(e?.target.value.trim());
      }
    },
    [onBlur]
  );

  const onPasteCb = useCallback(
    (e) => {
      if (onPaste) {
        onPaste(e?.target.value.trim());
      }
    },
    [onPaste]
  );

  const onChangeCb = useCallback(
    (e) => {
      let value = e?.target.value;
      let charCount = e?.target.value.length;
      if (altMaxLength) {
        if (charCount > maxLength) {
          value = e?.target.value.slice(0, maxLength);
        }
      }
      if (onChange) {
        onChange(name, { value: uppercase ? value.toString().toUpperCase() : value });
      }
    },
    [onChange, name, uppercase, altMaxLength, maxLength]
  );

  const onKeyUpCb = useCallback(
    (e) => {
      if (onKeyUp) {
        onKeyUp(e?.target.value.trim(), e?.key);
      }
      if (e.key === "Enter" && onEnter) {
        onEnter(e?.target.value.trim());
      }
    },
    [onKeyUp, onEnter]
  );

  const onClearCb = useCallback(() => {
    if (onChange) {
      onChange(name, { value: "" });
    }
    if (onClear) {
      onClear();
    }
  }, [onChange, onClear, name]);

  return (
    <div
      className={classnames(
        { "px-sm py-xs md:px-md py-xs": !paddingless },
        "pn-input flex items-center bg-white border rounded border-solid relative min-h-field",
        `${width ? `${width}` : `w-full`}`,
        {
          "border-white-darker text-black bg-white": !error,
          "border-red text-red": error,
          "bg-gray-disabled": disabled,
        },
        styles.container,
        className
      )}
    >
      {iconPrefix && typeof iconPrefix === "string" ? (
        <Icon name={iconPrefix} className={classnames("mr-sm")} />
      ) : (
        iconPrefix
      )}
      <AntInput
        ref={inputRef}
        type={inputType}
        inputMode={inputMode}
        disabled={disabled}
        className={classnames(
          `w-full h-8 p-0 border-0 rounded bg-transparent ${valueSize}`,
          { "text-center": center, "text-right": right, "pr-xs md:pr-sm": iconSuffix },
          styles.input
        )}
        readOnly={readOnly}
        placeholder={placeholder}
        maxLength={maxLength}
        minLength={minLength}
        value={value}
        onChange={onChangeCb}
        onFocus={onFocusCb}
        onBlur={onBlurCb}
        onKeyUp={onKeyUpCb}
        onPaste={onPasteCb}
      />
      {loading && (
        <Icon className={classnames("h-4 w-4", { "text-gray-lighter": !error })} loading />
      )}

      {iconSuffix && typeof iconSuffix === "string" ? (
        <Icon name={iconSuffix} className={classnames("ml-sm")} />
      ) : (
        iconSuffix
      )}
      {required && (
        <div className={classnames(styles.required, { [`${styles.error}`]: error })}>
          <Icon
            name="asterisk"
            className={classnames(styles.icon, { [`${styles.error}`]: error })}
          />
        </div>
      )}
      {hoverClearable && (
        <Icon name="remove" className={classnames("mr-sm", styles.clearIcon)} onClick={onClearCb} />
      )}
    </div>
  );
};

export default forwardRef(Input);
