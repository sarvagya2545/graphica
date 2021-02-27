import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../redux/actions/authActions';

const DashBoard = ({ email, logout }) => {

  const onClickHandler = e => {
    e.preventDefault();

    logout();
  }

  return (
    <div className="dashboard">
      User email: { email }
      <button className="btn btn-submit" onClick={onClickHandler}>LOGOUT</button>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    email: state.auth.user?.auth.email
  }
}

export default connect(mapStateToProps, { logout })(DashBoard);