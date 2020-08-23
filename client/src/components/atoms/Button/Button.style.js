import { css } from "styled-components";
import { DESKTOP, MOBILE } from "../../../theme/constants";

const ButtonStyles = css`
  border: none;
  border-radius: 0;
  background: ${(props) => props.theme.backgroundColor3};
  color: ${(props) => props.theme.primaryBgColor};
  position: relative;
  padding: 4px 8px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? "0.3" : "1")};
  font-size: ${(props) => props.fontSize || "15px"};
  ${(props) =>
    props.primary
      ? `
    border: 1px solid ${props.theme.secondaryBgColor};
    background: ${props.theme.primaryBgColor} ;
    color: ${props.theme.secondaryBgColor};
  `
      : ""};
  ${(props) =>
    props.secondary
      ? `
    background: ${props.theme.secondaryBgColor} ;
    color: ${props.theme.primaryBgColor};
  `
      : ""};

  &:focus {
    outline: 1px dashed ${(props) => props.theme.primaryColor};
  }

  &:focus:not(.focus-visible) {
    outline: none;
  }
`;

export default {
  [DESKTOP]: css`
    ${ButtonStyles};
    ${(props) => (props.inheritedStyles ? props.inheritedStyles[DESKTOP] : "")};
  `,
  [MOBILE]: css`
    ${ButtonStyles};
    ${(props) => (props.inheritedStyles ? props.inheritedStyles[MOBILE] : "")};
  `,
};
