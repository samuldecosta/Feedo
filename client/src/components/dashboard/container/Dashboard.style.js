import { css } from "styled-components";
import { DESKTOP, MOBILE } from "../../../theme/constants";

const DashboardStyles = css`
  .header-sticky {
    margin-left: -15px;
    z-index: 2;
    position: fixed;
    top: 0;
    width: 65%;
    background: white;
  }
  .sub-heading {
    border-bottom: 2px solid ${(props) => props.theme.borderLightGrey};
    padding-bottom: 10px;
    font-size: 14px;
  }
`;

export default {
  [DESKTOP]: css`
    ${DashboardStyles};
    ${(props) => (props.inheritedStyles ? props.inheritedStyles[DESKTOP] : "")};
  `,
  [MOBILE]: css`
    ${DashboardStyles};
    ${(props) => (props.inheritedStyles ? props.inheritedStyles[MOBILE] : "")};
  `,
};
