import React from 'react';

import designdata from '../designdata'
// import perdata from '../perdata'
import {Link} from 'react-router-dom'

function Details (props) {
    const product = designdata.designs.find(x => x.dId === props.match.params.id)

    // match params url
   const string = props.match.url;

   var temp = '';

   for(var i=6; ;i++)
        {
            if(string[i] === '/')
            break;
            temp = temp+string[i];
        }
       console.log(temp)
    console.log(props)
    return (
        
        <div className= "grid-container">
  
          
          <header className= "header">
              <div className= "brand">
                <Link to="/">Graphica</Link>
              </div>
  
              <div className= "header-links">
                  <a href = "SignUp.html">  Cart  </a>
                    <a href="SginIn.html"> View </a>        
              </div>
          </header>
         <div classNAme = "back-to-result">
             <Link to={'/user/'+temp}>Back</Link>
         </div>
          <div className = 'details'> 
            <div className="details-image">
                <img src={product.image} alt="product"></img>
            </div>
            <div className = "details-info">
                <ul>
                    <li>
                        <h1>{product.name} </h1>
                    </li>
                    <li>
                        <h3>Designer: {product.designer} </h3>
                    </li>
                    <li>
                        <b>product price: {product.price}</b>
                    </li>
                    <li>
                        <b>description:</b>
                        <div>
                             {product.description}
                        </div>
                    </li>

                    <li>
                       <b>{product.rating} Stars </b> 
                    </li>
                    <li>
                       <b>{product.numReviews} Reviews</b>
                    </li>
                    <li>
                         {/* // should add onClick Event */}
                          <button className='button' >Add to Cart</button> 
                          
                      </li>
                </ul>
                
            </div>
         
          </div>

    </div>
    )
}
export default Details;