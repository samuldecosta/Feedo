import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getEmployeesList } from "../../../actions/employees";
import { getFeedbackRequests } from "../../../actions/feedbacks";
import EmployeeList from "../presentation/EmployeeList";
import withStyles from "../../../lib/withStyles";
import styles from "./Dashboard.style";

const Dashboard = ({
  getEmployeesList,
  getFeedbackRequests,
  employeesList,
  auth: {
    employee: { isAdmin },
  },
}) => {
  useEffect(() => {
    if (isAdmin) {
      getEmployeesList();
    }
    getFeedbackRequests();
  }, []);
  return (
    <div className="dashboard-wrapper">
      {employeesList && employeesList.length > 0 && (
        <EmployeeList employees={employeesList} />
      )}
    </div>
  );
};

Dashboard.propTypes = {
  getEmployeesList: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  employeesList: PropTypes.array.isRequired,
  getFeedbackRequests: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  employeesList: state.employees.employeesList,
  feedbackRequests: state.feedbacks.feedbackRequests,
});
export default connect(mapStateToProps, {
  getEmployeesList,
  getFeedbackRequests,
})(withStyles(Dashboard, styles));
