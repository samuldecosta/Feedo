import React, { useState } from "react";
import PropTypes from "prop-types";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import { Redirect } from "react-router-dom";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { password, email } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  //redirect if authenticated
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <form className="form" onSubmit={onSubmit}>
      <h1 className="display-4">Hi welcome to Feedo.</h1>
      <p className="blockquote h5">
        Please enter your credentials to access the portal
      </p>
      <div className="form-group">
        <input
          type="email"
          placeholder="Email Address"
          name="email"
          onChange={onChange}
          value={email}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={onChange}
          value={password}
          required
        />
      </div>
      <input type="submit" className="btn form-group" value="Login" />
    </form>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
