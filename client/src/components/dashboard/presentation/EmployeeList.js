import React from "react";
import PropTypes from "prop-types";
import Image from "../../atoms/Image";
import withStyles from "../../../lib/withStyles";
import styles from "./EmployeeList.style";
import Button from "../../atoms/Button";
import { connect } from "react-redux";
import { removeEmployee } from "../../../actions/employees";

function EmployeeList({ employees, className, onClick, removeEmployee }) {
  return (
    <div className={className}>
      {employees.map((employee) => {
        const { name, avatar, designation, domain, bio, _id } = employee;
        return (
          <div className={`employee-card`} onClick={onClick} key={`emp-${_id}`}>
            <div className="details">
              <Image
                src={avatar}
                placeholderSrc={avatar}
                alt={`employee-${name}`}
                className="emp-image"
              />
              <div className="emp-name">{name}</div>
              <div className="emp-desination">
                {designation}
                <span className="domain">{domain}</span>
              </div>
            </div>
            <div className="emp-bio">
              <label>Bio:</label>
              <p>{bio}</p>
              <div className="action-buttons">
                <Button className="btn btn-primary">Edit Info</Button>
                <Button
                  className="btn btn-primary"
                  onClick={() => removeEmployee(_id)}
                >
                  Remove Employee
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

EmployeeList.propTypes = {
  employees: PropTypes.array.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  removeEmployee: PropTypes.func.isRequired,
};

export default connect(null, { removeEmployee })(
  withStyles(EmployeeList, styles)
);
