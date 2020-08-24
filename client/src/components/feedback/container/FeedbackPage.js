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
  employee,
  className,
  feedbackList,
  getFeedbackList,
  submitFeedback,
  removeFeedback,
  setEmpForFeedback,
}) {
  useEffect(() => {
    const { _id } = employee;
    getFeedbackList(_id);
    return () => setEmpForFeedback("");
  }, []);
  return (
    <div className={`feedback-wrapper ${className}`}>
      {employee && (
        <EmployeeCard employeeData={employee} className="static-card" />
      )}
      {employee && (
        <FeedbackForm
          submitFeedback={submitFeedback}
          removeFeedback={removeFeedback}
          employeeId={employee._id}
        />
      )}
      {feedbackList.map((feedback) => (
        <FeedbackForm
          key={feedback._id}
          storedFeedback={feedback}
          submitFeedback={submitFeedback}
          employeeId={employee._id}
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
  setEmpForFeedback: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  employee: state.employees.feedbackForEmp,
  feedbackList: state.feedbacks.feedbackList,
});

export default connect(mapStateToProps, {
  getFeedbackList,
  submitFeedback,
  removeFeedback,
  setEmpForFeedback,
})(withStyles(FeedbackPage, styles));
