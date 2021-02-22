import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { login } from '../redux/actions/authActions';

const Login = ({ login, isAuthenticated }) => {
  const history = useHistory();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const onChangeHandler = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }

  const submitHandler = e => {
    e.preventDefault();

    login(formData);
  }

  useEffect(() => {
    if(isAuthenticated) {
      history.push('/dashboard');
    }
  });

  return (
    <div className="container container-form">
      <h1>LOGIN</h1>
      <form className="form" onSubmit={submitHandler}>
        <div className="form-group">
          <input type="email" name="email" className="input" value={formData.email} onChange={onChangeHandler} placeholder="..."/>
          <label htmlFor="email">Email</label>
        </div>
        <div className="form-group">
          <input type="password" name="password" className="input" value={formData.password} onChange={onChangeHandler} placeholder="..."/>
          <label htmlFor="password">Password</label>
        </div>
        <button type="submit" className="btn btn-submit">Login</button>
      </form>
      <Link className="link link-blue underline" to="/signup">Don't have an account? Sign Up!</Link>
    </div>
  );
}
 
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps, { login })(Login);