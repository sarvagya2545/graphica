import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <div className="home-box">
        <h1>Welcome to Graphica!</h1>

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio nesciunt consequatur nihil unde libero suscipit maxime, asperiores repudiandae odit aliquid!</p>

        <div className="button-layout">
            <Link to="/login" className="link btn btn-submit">
              LOGIN
            </Link>
            <Link to="/signup" className="link btn btn-submit">
              SIGNUP
            </Link>
        </div>
      </div>
    </div>
  );
}
 
export default Home;