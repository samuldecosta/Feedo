import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { rejectReview } from "../../../actions/feedbacks";
import FeedbackForm from "../../molecules/FeedbackForm";

function FeedbackRequests({ feedbackRequests, rejectReview, maxLength }) {
  return (
    <div className="feed-req-wrapper container">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Requested By</th>
            <th scope="col">Employee Name</th>
            <th scope="col">Reject Review</th>
            <th scope="col">Review Employee</th>
          </tr>
        </thead>
        <tbody>
          {feedbackRequests.map((req) => (
            <tr key={req._id}>
              <th scope="row">{req.requester}</th>
              <td>{req.candidate}</td>
              <td>
                <FeedbackForm
                  submitFeedback={rejectReview}
                  employeeId={req._id}
                  maxLength={maxLength}
                  submitButtonText="Reject Request"
                />
              </td>
              <td>
                <Link to={`/feedback/${req.reqfor}/${req._id}`}>
                  <i className="far fa-hand-point-right"></i>
                  <span className="hide-sm">Go Review</span>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

FeedbackRequests.propTypes = {
  feedbackRequests: PropTypes.array,
  rejectReview: PropTypes.func.isRequired,
  maxLength: PropTypes.string,
};

FeedbackRequests.defaultProps = {
  feedbackRequests: [],
  maxLength: "1000",
};

const mapStateToProps = (state) => ({
  feedbackRequests: state.feedbacks.feedbackRequests,
});

export default connect(mapStateToProps, { rejectReview })(FeedbackRequests);
