import React, { useState } from 'react';
import { connect } from 'react-redux';
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
    <form className="form" onSubmit={submitHandler}>
      <label htmlFor="email">Email</label>
      <input type="email" name="email" value={formData.email} onChange={onChangeHandler}/>
      <label htmlFor="password">Password</label>
      <input type="password" name="password" value={formData.password} onChange={onChangeHandler}/>
      <button type="submit">Login</button>
    </form>
  );
}
 
export default connect(null, { login })(Login);