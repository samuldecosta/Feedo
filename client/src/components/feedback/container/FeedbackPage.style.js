import { css } from "styled-components";
import { DESKTOP, MOBILE } from "../../../theme/constants";

const EmployeeListStyles = css`
  .employee-card {
    width: 100%;
    border-bottom: 2px solid grey;
    position: relative;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
    & .emp-details {
      margin: 0 50px;
      & a {
        font-size: 15px;
      }
    }
    & img {
      max-width: 100px;
    }
    &:hover {
      cursor: pointer;
      text-decoration: none;
    }
  }

  .employee-card:before,
  .employee-card:after {
    content: "";
    position: absolute;
    z-index: -1;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
    top: 0;
    bottom: 0;
    left: 10px;
    right: 10px;
    border-radius: 100px / 10px;
  }
  .employee-card:after {
    right: 10px;
    left: auto;
    transform: skew(8deg) rotate(3deg);
  }

  .feedback-form {
    position: relative;
    min-height: 120px;
    width: 100%;
    margin: 30px 0;
    padding: 10px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
    font-size: 12px;
    & textarea {
      min-height: 100px;
    }
    & .submit-wrapper {
      height: 50px;
      width: 100%;
      padding-top: 10px;
      height: 50px;
      width: 100%;
      padding-top: 10px;
    }
    & .reviewer-name {
      color: #787777;
      font-weight: 700;
      font-size: 10px;
    }
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
