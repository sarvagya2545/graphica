// import React, { useState, useEffect } from 'react';

// import { Link} from 'react-router-dom';


// function login () 
// {

//         this.state = {
//           id : ''
//         }
        
//         this.updateInput = this.updateInput.bind(this);
        
        
        
//         updateInput(event)
//         {
//           this.setState({id : event.target.value})
//         }
    

//   const submitHandler = e => {
//     e.preventDefault();

//     login(formData);
//   }

//   useEffect(() => {
//     if(isAuthenticated) {
//       history.push('/user/'+this.state.password);
//     }
//   });

//   return (
//     <div className="container container-form">
//       <h1>LOGIN</h1>
//       <form className="form" onSubmit={submitHandler}>
//         <div className="form-group">
//           <input type="email" name="email" className="input" value={formData.email} onChange={onChangeHandler} placeholder="..."/>
//           <label htmlFor="email">Email</label>
//         </div>
//         <div className="form-group">
//           <input type="password" name="password" className="input" value={formData.password} onChange={onChangeHandler} placeholder="..."/>
//           <label htmlFor="password">Password</label>
//         </div>
//         <button type="submit" className="btn btn-submit">Login</button>
//       </form>
//       <Link className="link link-blue underline" to="/signup">Don't have an account? Sign Up!</Link>
//     </div>
//   );
// }


// export default login;