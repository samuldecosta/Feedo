import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading, employee }, logout }) => {
  const authLink = (
    <Fragment>
      {employee && employee.isAdmin && (
        <Fragment>
          <li>
            <Link to="/register">Add Employee</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </Fragment>
      )}
      <li>
        <a href="#!" onClick={logout}>
          <i className="fa fa-sign-out-alt"></i>
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </Fragment>
  );
  const guestLink = (
    <Fragment>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </Fragment>
  );
  return (
    <nav className="navbar bg-dark">
      <ul>
        <li className="root">
          <Link to="/">Feedo</Link>
        </li>
        {!loading && (
          <Fragment>{isAuthenticated ? authLink : guestLink}</Fragment>
        )}
      </ul>
    </nav>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
