
import './App.css';
import React, { Component } from 'react';
import { BrowserRouter ,Route,Switch } from 'react-router-dom'

import {Link} from 'react-router-dom'

import './App.scss'
import First from './screen/UserHome'

import designerHome from './screen/DesignerHome'

import Login from './screen/login'

import signUp from './screen/signup'

import Details from './screen/details'

import About from './screen/About'

import Cart from './screen/Cart'
import Home from './screen/Home'

class App extends Component {
 


   render(){
return (
<BrowserRouter>
      <div className= "grid-container">
           <div className= "content">
             <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/About" component={About} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/designer" component={Login} />
              <Route exact path="/signUp" component={signUp} />
              <Route exact path="/user/:id" component={First} />
              <Route exact path="/designer/:id" component={designerHome} />
              <Route exact path="/user/:id/cart" component={Cart} />
              <Route exact path="/user/:id/design/:id" component={Details}/>
             </Switch>
            
            </div>

          <Link className= "footer" to="/About">
            About
          </Link>

      </div>
      </BrowserRouter>

  );
}
}

export default App;
