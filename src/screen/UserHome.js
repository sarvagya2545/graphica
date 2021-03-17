import React from 'react';

import {Link} from 'react-router-dom'

import designdata from '../designdata'


function First (props) {

    const arts = designdata.designs;
    const val = props.match.params.id

    return (
     
      <div className= "grid-container">

        
        <header className= "header">

            <div className= "brand">
              <Link to="/">Graphica</Link>
            </div>
             

            <div class="wrap">
              <div class="search">
                   <input type="text" className="searchTerm" placeholder="Search"/>
               <button type="submit" className="searchButton">
               <i class="fa fa-search"></i>
                 </button>
            </div>
           </div>


            <div className= "header-links">
                <Link to={'/user/'+val+'/cart'}> Cart </Link>
                  <a href="View.html"> View </a>        
            </div>

        </header>


         
              <ul className= "products">
              {
                arts.map(product =><li key = {product.dId}>
                  <div className= "product">
                  <Link to={'/user/'+val+'/design/'+product.dId}><img className= "product-image" src={product.image} alt="product" /></Link>
                  
                      <div className="product-name">
                        <Link to={'/user/'+val+'/design/'+product.dId}>{product.name}</Link>
                      </div>

                      <div calssName="product-designer">Designer: <b>{product.designer}</b></div>

                      <div className="product-price">{product.price}</div>
                      <div className="product-ratting">{product.rating} Stars {product.numReviews}</div>
                  </div>
                </li>)
              }
              </ul>


              </div>
    
            );
              
}

export default First;