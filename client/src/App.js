import React, { useEffect } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import './App.scss';
import { loadUser } from './redux/actions/authActions';
import store from './redux/store';
import ProtectedRoute from './utils/ProtectedRoute';
import DashBoard from './components/Dashboard';

const App = () => { 
  useEffect(() => {
    store.dispatch(loadUser())
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <ProtectedRoute path="/dashboard" component={DashBoard}/>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/" component={Home}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App;
