import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../redux/actions/authActions';

const Login = ({ login }) => {
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
      <Link to="/signup">Don't have an account? Sign Up!</Link>
    </div>
  );
}
 
export default connect(null, { login })(Login);