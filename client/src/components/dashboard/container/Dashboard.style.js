import { css } from "styled-components";
import { DESKTOP, MOBILE } from "../../../theme/constants";

const DashboardStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
