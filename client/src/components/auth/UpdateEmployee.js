import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
import { updateEmployee as updateEmployeeReducer } from "../../actions/employees";
import { Redirect } from "react-router-dom";

const UpdateEmployee = ({
  employeesList,
  updateEmployeeReducer,
  updateEmpId,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    designation: "",
    bio: "",
    domain: "",
    changeAdminRights: false,
  });

  const { name, email, designation, bio, domain, changeAdminRights } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    updateEmployeeReducer({
      name,
      email,
      designation,
      bio,
      domain,
      giveAdminRight: false,
      revokeAdminRight: false,
    });
  };
  useEffect(() => {
    if (updateEmpId) {
      const selectedEmployee = employeesList.find(
        (employee) => employee._id === updateEmpId
      );
      return setFormData({ ...selectedEmployee });
    } else {
      return <Redirect to="/dashboard" />;
    }
  }, []);
  return (
    <Fragment>
      <h1 className="large text-primary">Update Employee</h1>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={onChange}
            value={name}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            onChange={onChange}
            value={email}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Designation"
            name="designation"
            onChange={onChange}
            value={designation}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Please Fill Bio"
            name="bio"
            onChange={onChange}
            value={bio}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Please Enter Employee Domain"
            name="domain"
            onChange={onChange}
            value={domain}
            required
          />
        </div>
        <div className="form-group">
          <div className="checkbox">
            <label>
              <input type="checkbox" value="" />
              Change Admin Permissions
            </label>
          </div>
          <label htmlFor="revokeAdminRight">Remove Admin Rights</label>
        </div>
        <input type="submit" className="btn btn-primary" value="Update" />
      </form>
    </Fragment>
  );
};

UpdateEmployee.propTypes = {
  setAlert: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  updateEmployeeReducer: PropTypes.func.isRequired,
  updateEmpId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  employeesList: state.employees.employeesList,
  updateEmpId: state.employees.updateEmpId,
});

export default connect(mapStateToProps, { setAlert, updateEmployeeReducer })(
  UpdateEmployee
);
