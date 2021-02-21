import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {

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

    axios.post(`/users/login`, formData, { withCredentials: true })
      .then(res => console.log(res))
      .catch(err => console.log(err?.response));
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
 
export default Login;