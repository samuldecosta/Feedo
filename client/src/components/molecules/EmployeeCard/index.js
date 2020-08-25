import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { requestFeedBack } from "../../../actions/feedbacks";

function EmployeeCard({
  employeeData,
  className,
  removeEmployee,
  isStaticMode,
  employees,
  loggedInEmployee,
  requestFeedBack,
}) {
  const { _id, name, email, bio, designation, domain, avatar } = employeeData;
  return (
    <Link
      className={`card promoting-card employee-card ${className}`}
      to={`/feedback/${_id}`}
      key={`emp-${_id}`}
    >
      <div className="card-body d-flex flex-row">
        <img
          src={avatar}
          className="rounded-circle mr-3"
          height="50px"
          width="50px"
          alt="avatar"
        />
        <div className="emp-details">
          <h4 className="card-title font-weight-bold mb-2">{name}</h4>
          <p className="card-text">
            <i className="far fa-handshake-o pr-2"></i>
            {designation}
          </p>
          <p className="card-text">
            <i className="far  fa-envelope pr-2"></i>
            {email}
          </p>
          <p className="card-text">
            <i className="far  fa-podcast pr-2"></i>
            {domain}
          </p>
        </div>
        {isStaticMode && (
          <div className="request-review dropdown">
            <button
              className="btn dropdown-toggle"
              type="button"
              onClick={(e) => e.stopPropagation()}
              data-toggle="dropdown"
            >
              Select Employee
            </button>
            <ul className="dropdown-menu">
              {employees.map((emp) => (
                <li
                  className={emp._id === loggedInEmployee ? "disabled" : ""}
                  onClick={(e) => {
                    e.stopPropagation();
                    requestFeedBack({
                      reqby: loggedInEmployee,
                      reqfrom: emp._id,
                      reqfor: _id,
                    });
                  }}
                >
                  <a href="#">
                    {emp.name}({emp.domain})
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="card-body">
        <div className="collapse-content">
          <span>Bio:</span>
          <p className="card-text " id="collapseContent">
            {bio}
          </p>
          <i
            className="fas fa-share-alt text-muted float-right p-1 my-1"
            data-toggle="tooltip"
            data-placement="top"
            title="Share this post"
          ></i>
          {!isStaticMode && (
            <div className="action-buttons">
              <Link className="btn" to={`/feedback/${_id}`}>
                Edit Info
              </Link>
              <button
                className="btn"
                onClick={(e) => {
                  e.stopPropagation();
                  removeEmployee(_id);
                }}
              >
                Remove Employee
              </button>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

EmployeeCard.propTypes = {
  employeeData: PropTypes.object.isRequired,
  removeEmployee: PropTypes.func,
  isStaticMode: PropTypes.bool,
  requestFeedBack: PropTypes.func.isRequired,
  employees: PropTypes.array,
  loggedInEmployee: PropTypes.string.isRequired,
};

EmployeeCard.defaultProps = {
  removeEmployee: () => {},
  isStaticMode: true,
};
const mapStateToProps = (state) => ({
  employees: state.employees.employeesList,
  loggedInEmployee: state.auth.employee._id,
});

export default connect(mapStateToProps, { requestFeedBack })(EmployeeCard);
