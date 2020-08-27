import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";
import logo from "../../img/logo.png";

const Navbar = ({ auth: { isAuthenticated, loading, employee }, logout }) => {
  const authLink = (
    <Fragment>
      {employee && employee.isAdmin && (
        <Fragment>
          <li>
            <Link className="font-weight-bold" to="/dashboard">
              Dashboard
            </Link>
          </li>
          <li>
            <Link className="font-weight-bold" to="/register">
              Add Employee
            </Link>
          </li>
          <li>
            <Link className="font-weight-bold" to={`/update/${employee._id}`}>
              Update Profile
            </Link>
          </li>
        </Fragment>
      )}
      <li>
        <a href="#!" onClick={logout}>
          <i className="fa fa-sign-out-alt"></i>
          <span className="font-weight-bold">Logout</span>
        </a>
      </li>
    </Fragment>
  );
  const guestLink = (
    <Fragment>
      <li>
        <Link className="fa fa-sign-in font-weight-bold" to="/login">
          {` Login`}
        </Link>
      </li>
    </Fragment>
  );
  return (
    <nav className="navbar bg-dark">
      <ul>
        <li className="root">
          <Link to="/">
            <img src={logo} alt="feedo-logo"></img>
          </Link>
        </li>
        {!loading && (
          <Fragment>{isAuthenticated ? authLink : guestLink}</Fragment>
        )}
      </ul>
    </nav>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
  isAuthenticated: false,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
