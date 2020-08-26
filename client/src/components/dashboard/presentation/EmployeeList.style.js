import { css } from "styled-components";
import { DESKTOP, MOBILE } from "../../../theme/constants";

const EmployeeListStyles = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .employee-card {
    padding: 10px;
    width: 32%;
    min-height: 50px;
    margin-bottom: 15px;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.12), 0 4px 4px 0 rgba(0, 0, 0, 0.24);
    -webkit-transition-duration: 0.2s;
    transition-duration: 0.2s;
    &:hover {
      cursor: pointer;
      text-decoration: none;
    }
    & .emp-details {
      margin: 0 35px;
      & a {
        font-size: 15px;
      }
      & p {
        font-size: 12px;
      }
    }
  }
  .employee-card:last-child {
    margin-right: auto;
    margin-left: 2%;
  }
  img {
    width: auto;
  }
  .details {
    width: 30%;
    display: inline-block;
  }
`;

export default {
  [DESKTOP]: css`
    ${EmployeeListStyles};
    ${(props) => (props.inheritedStyles ? props.inheritedStyles[DESKTOP] : "")};
  `,
  [MOBILE]: css`
    ${EmployeeListStyles};
    ${(props) => (props.inheritedStyles ? props.inheritedStyles[MOBILE] : "")};
  `,
};
