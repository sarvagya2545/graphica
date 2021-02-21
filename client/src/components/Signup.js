import React, { useState } from 'react';
import { connect } from 'react-redux';
import { register } from '../redux/actions/authActions';

const Signup = ({ register }) => {
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

  return (
    <form className="form" onSubmit={submitHandler}>
      <label htmlFor="email">Email</label>
      <input type="email" name="email" value={formData.email} onChange={onChangeHandler}/>
      <label htmlFor="password">Password</label>
      <input type="password" name="password" value={formData.password} onChange={onChangeHandler}/>
      <label htmlFor="confirmPassword">Confirm Password</label>
      <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={onChangeHandler}/>
      <button type="submit">Signup</button>
    </form>
  );
}
 
export default connect(null, { register })(Signup);