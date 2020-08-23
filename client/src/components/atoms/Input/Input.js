import React from "react";
import styles from "./Input.style";
import withStyles from "../../../lib/withStyles";

const Input = ({
  className,
  id,
  labelContent,
  isError,
  errorMessage,
  hideLabel,
  inheritedStyles,
  maxLength,
  onKeyUp,
  inputRef,
  type,
  placeholder,
  value,
  onChange,
  required,
  ...others
}) => (
  <div className={`input-wrapper ${className}`}>
    {!hideLabel && <label htmlFor={id}>{labelContent}</label>}
    <input
      id={id}
      className={`${isError ? "error" : ""}`}
      maxLength={maxLength}
      type={type}
      placeholder={placeholder}
      onKeyUp={onKeyUp}
      onChange={onChange}
      ref={inputRef}
      {...others}
    />
    {isError && errorMessage ? (
      <p className="error-message" role="alert">
        {errorMessage}
      </p>
    ) : null}
  </div>
);

Input.defaultProps = {
  type: "text",
  labelContent: null,
  iconClass: "",
  inheritedStyles: "",
  isError: false,
  hideLabel: false,
  maxLength: 100,
  onKeyUp: () => {},
  onChange: () => {},
  iconRole: "icon",
  inputRef: () => {},
  placeholder: "",
  value: null,
  required: null,
};

export default withStyles(Input, styles);
export { Input as InputComponent };
