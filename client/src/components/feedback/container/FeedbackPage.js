import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import EmployeeCard from "../../molecules/EmployeeCard";
import styles from "./FeedbackPage.style";
import withStyles from "../../../lib/withStyles";
import {
  getFeedbackList,
  submitFeedback,
  removeFeedback,
} from "../../../actions/feedbacks";
import FeedbackForm from "../../molecules/FeedbackForm";
import { setEmpForFeedback } from "../../../actions/employees";

function FeedbackPage({
  employees,
  className,
  feedbackList,
  getFeedbackList,
  submitFeedback,
  removeFeedback,
  match: {
    params: { empId },
  },
}) {
  useEffect(() => {
    getFeedbackList(empId);
  }, []);
  const employee = employees.find((emp) => emp._id === empId);
  return (
    <div className={`feedback-wrapper ${className}`}>
      {employee && (
        <EmployeeCard employeeData={employee} className="static-card" />
      )}
      {employee && (
        <FeedbackForm
          submitFeedback={submitFeedback}
          removeFeedback={removeFeedback}
          employeeId={empId}
        />
      )}
      {feedbackList.map((feedback) => (
        <FeedbackForm
          key={feedback._id}
          storedFeedback={feedback}
          submitFeedback={submitFeedback}
          employeeId={empId}
          removeFeedback={removeFeedback}
        />
      ))}
    </div>
  );
}
FeedbackPage.propTypes = {
  employee: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired,
  getFeedbackList: PropTypes.func.isRequired,
  submitFeedback: PropTypes.func.isRequired,
  removeFeedback: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  employees: state.employees.employeesList,
  feedbackList: state.feedbacks.feedbackList,
});

export default connect(mapStateToProps, {
  getFeedbackList,
  submitFeedback,
  removeFeedback,
})(withStyles(FeedbackPage, styles));
