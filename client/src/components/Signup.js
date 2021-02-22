import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { register } from '../redux/actions/authActions';

const Signup = ({ register, isAuthenticated }) => {
  let history = useHistory();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const onChangeHandler = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }

  const submitHandler = e => {
    e.preventDefault();

    register(formData);
  }

  useEffect(() => {
    if(isAuthenticated) {
      history.push('/dashboard');
    }
  }, []);

  return (
    <div className="container container-form">
      <h1>SIGNUP</h1>
      <form className="form" onSubmit={submitHandler}>
        <div className="form-group">
          <input type="email" name="email" className="input" value={formData.email} onChange={onChangeHandler} placeholder="..."/>
          <label htmlFor="email">Email</label>
        </div>
        <div className="form-group">
          <input type="password" name="password" className="input" value={formData.password} onChange={onChangeHandler} placeholder="..."/>
          <label htmlFor="password">Password</label>
        </div>
        <div className="form-group">
          <input type="password" name="confirmPassword" className="input" value={formData.confirmPassword} onChange={onChangeHandler} placeholder="..."/>
          <label htmlFor="confirmPassword">Confirm Password</label>
        </div>
        <button type="submit" className="btn btn-submit">Signup</button>
      </form>
      <Link className="link link-blue underline" to="/login">Already having an account? Log in!</Link>
    </div>
  );
}
 
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps, { register })(Signup);