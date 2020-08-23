import { css } from "styled-components";
import { DESKTOP, MOBILE } from "../../../theme/constants";

const EmployeeListStyles = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .employee-card {
    padding: 10px;
    width: 45%;
    min-height: 50px;
    margin-bottom: 15px;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.12), 0 4px 4px 0 rgba(0, 0, 0, 0.24);
    -webkit-transition-duration: 0.2s;
    transition-duration: 0.2s;
    &:hover {
      cursor: pointer;
    }
  }
  .emp-name {
    font-weight: bold;
  }
  .emp-image {
    max-width: 100px;
  }
  .emp-desination {
  }
  .domain {
    padding: 0 10px;
    font-style: italic;
  }

  .details {
    width: 30%;
    display: inline-block;
  }
  .emp-bio {
    position: absolute;
    width: 70%;
    display: inline-block;
    margin-top: 20px;
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
