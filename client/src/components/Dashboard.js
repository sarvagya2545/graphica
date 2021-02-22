import React from 'react';
import { connect } from 'react-redux';

const DashBoard = ({ email }) => {
  return (
    <div className="dashboard">
      User email: { email }
    </div>
  );
}

const mapStateToProps = state => {
  return {
    email: state.auth.user.auth.email
  }
}

export default connect(mapStateToProps)(DashBoard);