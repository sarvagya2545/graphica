import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Home = ({ isAuthenticated, user }) => {
  return (
    <div className="home">
      <div className="home-box">
        <h1>Welcome to Graphica, {user}!</h1>

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio nesciunt consequatur nihil unde libero suscipit maxime, asperiores repudiandae odit aliquid!</p>

        {
          isAuthenticated ? (
            <div className="button-layout">
              <Link to="/dashboard" className="link btn btn-submit">
                DASHBOARD
              </Link>
          </div>
          ) : (
            <div className="button-layout">
              <Link to="/login" className="link btn btn-submit">
                LOGIN
              </Link>
              <Link to="/signup" className="link btn btn-submit">
                SIGNUP
              </Link>
            </div>
          )
        }
      </div>
    </div>
  );
}
 
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user?.auth.email
  }
}

export default connect(mapStateToProps)(Home);