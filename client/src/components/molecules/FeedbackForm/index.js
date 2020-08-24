import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { setAlert } from "../../../actions/alert";

function FeedbackForm({
  className,
  storedFeedback,
  maxLength,
  placeholder,
  submitFeedback,
  removeFeedback,
  employeeId,
}) {
  const {
    summary: storedSummary = "",
    _id = "",
    date,
    reviewerName,
  } = storedFeedback;
  const [formData, setFormData] = useState({
    summary: storedSummary,
    isEditMode: !storedSummary,
  });

  const { summary, isEditMode } = formData;

  const onChange = (e) => setFormData({ ...formData, summary: e.target.value });
  const editFeedback = (e) => setFormData({ ...formData, isEditMode: true });
  const onSubmit = (e) => {
    e.preventDefault();
    if (summary) {
      submitFeedback(summary, employeeId, _id);
      if (_id) {
        setFormData({ ...formData, isEditMode: false });
      } else {
        setFormData({ ...formData, summary: "" });
      }
    } else {
      setAlert("Summary can not be blank", "danger");
    }
  };

  return (
    <div className={`feedback-form ${className}`}>
      <form className="form" onSubmit={onSubmit}>
        {isEditMode ? (
          <Fragment>
            <textarea
              className="feedback-summary-input "
              value={summary}
              onChange={onChange}
              maxLength={maxLength}
              placeholder={placeholder}
            />
            <input type="submit" className="btn pull-right" value="Submit" />
          </Fragment>
        ) : (
          <div className="summary-section">
            <p className="reviewer-name b">
              <span className="name">{reviewerName}</span>
              <span className="user-date">{date}</span>
            </p>
            <p className="message">{summary}</p>
            {summary && (
              <div className="pull-right">
                <button
                  type="button"
                  className="btn"
                  onClick={() => removeFeedback(_id)}
                >
                  remove
                </button>
                <button type="button" className="btn" onClick={editFeedback}>
                  update feedback
                </button>
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
}

FeedbackForm.propTypes = {
  maxLength: PropTypes.string,
  submitFeedback: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  storedFeedback: PropTypes.object,
  removeFeedback: PropTypes.func.isRequired,
  employeeId: PropTypes.string.isRequired,
};

FeedbackForm.defaultProps = {
  placeholder: "Please enter feedback summary",
  maxLength: "10000",
  storedFeedback: {
    summary: "",
  },
};

export default FeedbackForm;
