//PrfBaseProfile.js
import React, { Component } from 'react';

export default class PrfBaseProfile extends Component {
  constructor(props) {
    super(props);
  }

  render =() => {
    //TODO: sub-classes to override and fully implement render:
    //return (null);
    return(
      <div className="prf-profile">
        <h1> Profile Page </h1>
        <p>Welcome, {this.props.authHandler.getAuthedUsername()} !</p>
      </div>
    );
  }
}
