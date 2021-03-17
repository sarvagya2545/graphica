import React, { Component } from 'react';
import {Link} from  'react-router-dom'
class signUp extends Component {

    render() { 
        return ( 
            <div>
            <p>Add details required to signUp</p> 
            <Link to="/"> <h3>Home</h3></Link>
            </div>
        );
    }
}
 
export default signUp;