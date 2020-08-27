import { css } from "styled-components";
import { DESKTOP, MOBILE } from "../../../theme/constants";

const DashboardStyles = css`
  .header-sticky {
    margin-left: -15px;
    z-index: 2;
    position: fixed;
    top: 0;
    width: 68%;
    background: white;
  }
  .sub-heading {
    box-shadow: 0 8px 6px -6px ${(props) => props.theme.borderLightGrey};
    padding-bottom: 10px;
    font-size: 14px;
  }
  .feed-req-wrapper {
    & table {
      & td,
      & th {
        font-size: 14px;
        text-align: center;
        vertical-align: middle;
      }
    }
  }
  .no-records {
    margin-top: 100px;
    text-align: center;
    & img {
      width: 300px;
    }
    & .no-record-msg {
      display: block;
      font-size: 20px;
      font-weight: 700;
      color: #979797;
    }
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
