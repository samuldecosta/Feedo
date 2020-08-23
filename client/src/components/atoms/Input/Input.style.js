import { css } from "styled-components";
import { DESKTOP, MOBILE } from "../../../theme/constants";

const InputStyles = css`
  .error {
    border: 1px solid ${(props) => props.theme.errorColor};
  }
  .error-message {
    color: ${(props) => props.theme.errorColor};
  }
  input {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  label {
    width: 100%;
    display: flex;
    position: relative;
  }
`;

export default {
  [DESKTOP]: css`
    ${InputStyles};
    ${(props) => (props.inheritedStyles ? props.inheritedStyles[DESKTOP] : "")};
  `,
  [MOBILE]: css`
    ${InputStyles};
    ${(props) => (props.inheritedStyles ? props.inheritedStyles[MOBILE] : "")};
  `,
};
