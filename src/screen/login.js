import React, { Component } from 'react';


import {Link} from 'react-router-dom'


// import perdata from '../perdata.js'

// import designerdata from  '../designersdata'

class Login extends Component {
    
  constructor(props){
    super(props);


    this.state = {
      id : '',
      type: props.location.aboutProps.type,   // true if he is User
      valid: false   
     }
     this.updateInput = this.updateInput.bind(this);
    }
    
    
    updateInput(event)
    {
      const typo = this.state.type
      this.setState({id : event.target.value,type: typo})


    }

    render() { 
        return (  
        
       
           
      <div className= "grid-container">

        
           <header className= "header">

            <div className= "brand">
              <Link to="/">Graphica</Link>
            </div>

           </header>
        

      
      <div className="container container-form">
      <h1>LOGIN</h1>
      <form className="form" >
         <div className="form-group">
          <input type="email" name="email" className="input" placeholder="..."/>
          <label htmlFor="email">Email</label>
         
        </div>

        <div className="form-group">
          <input type="password" name="password" className="input"  placeholder="..."/>
          <label htmlFor="password">Password</label>
        </div>
        
        <div className="form-group">
          <input type="userId" name="userId" className="input" onChange={this.updateInput} placeholder="..."/>
          <label htmlFor="userId">UserId</label>
        </div>

       <Link to =  {(this.state.valid)? ("/login") :("/"+this.state.type+"/"+this.state.id)} > <button type="submit" className="btn btn-submit">Login</button> </Link>

      </form>
      <Link className="link link-blue underline" to="/signUp">Don't have an account? Sign Up!</Link>
    </div>

      </div>
      );
    }
}
 
export default Login;