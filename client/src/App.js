import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';

const App = () => { 
 
  // const getCookies = async () => {
  //   try {
  //     //  { email: 'sarvagya@newtesting4.com', password: '12345678' },

  //     const res = await axios.post(`/users/login`,  { email: `sarvagya@newtesting4.com`, password: '12345678' }, {
  //       withCredentials: true
  //     })

  //     console.log(res);
  //   } catch (error) {
  //     console.log(error?.response);
  //   }
  // }

  // const getData = () => {
  //   axios.get('/users/secret', { withCredentials: true })
  //     .then(res => console.log(res))
  //     .catch(err => console.log(err));
  // }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/" component={Home}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App;
