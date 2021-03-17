import React from 'react';

import perdata from '../perdata.js'

import {Link} from 'react-router-dom'

function Cart (props) {
    

    const user = perdata.persons.find(x => x.id === props.match.params.id);

    const usercart = user.cart;
  const val = props.match.params.id;

    return (
     
        <div className= "grid-container">
  
          
          <header className= "header">
  
              <div className= "brand">
                <Link to="/">Graphica</Link>
              </div>
        
              <div className= "header-links">
                    <a href="View.html"> View </a>        
              </div>
  
          </header>
  
                <ul className= "products">
                {
                  usercart.map(product =><li key = {product.dId}>
                    <div className= "product">
                    <Link to={'/user/'+val+'/design/'+product.dId}><img className= "product-image" src={product.image} alt="product" /></Link>
                    
                        <div className="product-name">
                          <Link to={'/user/'+val+'/design/'+product.dId}>{product.name}</Link>
                        </div>
  
                        <div calssName="product-designer">Designer: <b>{product.designer}</b></div>
  
                        <div className="product-price">{product.price}</div>
                        <div className="product-ratting">{product.rating} Stars {product.numReviews}</div>
                        <li>
                           <button className='button1' >Buy Now</button>  {/*// should add onClick Event */}
                          
                      </li>

                    </div>
                  </li>)
                }
                </ul>
  
  
                </div>
      
              );

}

export default Cart