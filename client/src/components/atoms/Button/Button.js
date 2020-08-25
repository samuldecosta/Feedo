import React from "react";
import styles from "./Button.style";
import withStyles from "../../../lib/withStyles";

const Button = ({
  className,
  children,
  inheritedStyles,
  type,
  primary,
  secondary,
  elementRef,
  disabled,
  ...others
}) => (
  <button
    className={className}
    type={type}
    ref={elementRef}
    disabled={disabled}
    {...others}
  >
    {children}
  </button>
);

Button.defaultProps = {
  inheritedStyles: "",
  type: "button",
  primary: false,
  secondary: false,
  elementRef: undefined,
  disabled: false,
};

export default withStyles(Button, styles);
export { Button as ButtonVanilla };
