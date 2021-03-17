import React from 'react';
import { Link } from 'react-router-dom';


function Home  ()  {
  return (
    <div className="home">
      <div className="home-box">
           <h3>User</h3>
        <p>
            Buy graphic images, vector art, illustrations and more for your online business. 
            <br/>
            Only at <strong>Graphica&#8482;</strong>
        </p>
            <div className="button-layout">
              <Link to={{pathname:"/login",aboutProps:{type:"user"}}} className="link btn btn-submit">
                LOGIN
              </Link>
              <Link to={{pathname:"/signup",aboutProps:{type:"user"}}} className="link btn btn-submit">
                SIGNUP
              </Link>
            </div>

      </div>
        
        <br></br>
      <div className="home-box">
     <h3>Designer</h3>
  <p>
     Sell graphic images, vector art, illustrations and more for your online business                                  . 
    <br/>
    Only at <strong>Graphica&#8482;</strong>
   </p>
    <div className="button-layout">
      <Link to={{pathname:"/login",aboutProps:{type:"designer"}}} className="link btn btn-submit">
        LOGIN
      </Link>
      <Link to= {{pathname:"/signup",aboutProps:{type:"designer"}}}  className="link btn btn-submit">
        SIGNUP
      </Link>
    </div>

</div>
    </div>
  );
}


export default Home;