import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Image from "../../atoms/Image";
import withStyles from "../../../lib/withStyles";
import styles from "./EmployeeList.style";
import Button from "../../atoms/Button";
import {
  removeEmployee,
  setUserForUpdate,
  setEmpForFeedback,
} from "../../../actions/employees";
import EmployeeCard from "../../molecules/EmployeeCard";

function EmployeeList({
  employees,
  className,
  removeEmployee,
  setUserForUpdate,
  updateEmpId,
  setEmpForFeedback,
  feedbackForEmp,
}) {
  //redirect if have updateEmpId
  if (updateEmpId) {
    return <Redirect to="/update" />;
  }
  //redirect if have updateEmpId
  if (feedbackForEmp && feedbackForEmp._id) {
    return <Redirect to="/feedback" />;
  }
  return (
    <div className={className}>
      {employees.map((employee) => {
        return (
          <EmployeeCard
            key={employee._id}
            employeeData={employee}
            isStaticMode={false}
            setEmpForFeedback={setEmpForFeedback}
            setUserForUpdate={setUserForUpdate}
            removeEmployee={removeEmployee}
          />
        );
      })}
    </div>
  );
}

EmployeeList.propTypes = {
  employees: PropTypes.array.isRequired,
  className: PropTypes.string,
  removeEmployee: PropTypes.func.isRequired,
  setUserForUpdate: PropTypes.func.isRequired,
  updateEmpId: PropTypes.string,
  feedbackForEmp: PropTypes.object,
  setEmpForFeedback: PropTypes.func.isRequired,
};

const mapStateToprops = (state) => ({
  updateEmpId: state.employees.updateEmpId,
  feedbackForEmp: state.employees.feedbackForEmp,
});
export default connect(mapStateToprops, {
  removeEmployee,
  setUserForUpdate,
  setEmpForFeedback,
})(withStyles(EmployeeList, styles));
