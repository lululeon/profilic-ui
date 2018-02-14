//PrfSignupForm.js
import React, { Component } from "react";
import { Redirect, BrowserRouter, history } from 'react-router-dom';
import PrfBaseAuthForm from './PrfBaseAuthForm';

export default class PrfSignupForm extends PrfBaseAuthForm {
  constructor(props) {
    super(props);
  }

  render() {
    if(this.state.authComplete) {
      //TODO: auto-login should be configurable
      return( <Redirect to={this.authPaths.successfulLoginPath} from={this.authPaths.signupPath} push /> );
    } else {
      return (
        <div className="card prf-authbox">
          <div className="card-body">
            <form>
            {(this.state.alertMessage != '') ? (
              <div className="alert alert-danger" role="alert">
                {this.state.alertMessage}
              </div>
            ) : null}
            <div className="form-group">
                <label htmlFor="email">Your email address</label>
                <input
                  type='text'
                  name='email'
                  className='form-control'
                  value={ this.state.email }
                  onChange={ this.onInputChange } />
              </div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type='text'
                  name='username'
                  className='form-control'
                  value={ this.state.username }
                  onChange={ this.onInputChange } />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type='password'
                  name='password'
                  className='form-control'
                  value={ this.state.password }
                  onChange={ this.onInputChange } />
              </div>
              <div className='btn-toolbar'>
                <button type='button' className='btn btn-outline btn-sm' onClick={this.cancelSubmission} value='cancel'>Cancel</button>
                <button type='button' className='btn btn-primary btn-sm' onClick={this.doSignup} value='submit'>Submit</button>
              </div>
            </form>
          </div>
        </div>
      );
    }
  }
}