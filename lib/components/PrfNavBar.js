import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

//TODO: prop search := [null|basic|responsive]
// const SearchForm = () => (
//   <form className="form-inline my-2 my-lg-0">
//     <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
//     <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
//   </form>
// );

@withRouter
export default class PrfNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthed: false,
      id: '',
      username: ''
    };
    this.prfClient = this.props.authHandler;
    this.authPaths = this.props.authPaths;
    this.unlisten = this.props.history.listen((location, action) => { //eslint-disable-line no-unused-vars
      this.prfClient.authenticate(this.checkAuthResult);
    });
  }

  componentWillMount = () => {
    //because the first listen doesn't fire on direct url hit (e.g. loading the page directly):
    this.prfClient.authenticate(this.checkAuthResult);
  }

  componentWillUnmount = () => {
    if (this.unlisten) this.unlisten();
  }

  checkAuthResult = (responseData) => {
    if (!responseData) {
      this.setState({ isAuthed: false });
    } else {
      let uname = this.prfClient.getAuthedUsername(); 
      let uid = this.prfClient.getAuthedID();
      this.setState({ isAuthed: true, username: uname, id:uid });
    }
  }

  doLogout = (e) => {
    e.preventDefault();
    this.prfClient.logout();
    this.setState({ isAuthed: false });
    this.props.history.push(this.authPaths.defaultUnauthedPath);
  }

  render() {
    let navItemsWithKeys = this.props.navItems.map( (n,idx) => ( {...n, key:idx} ) );
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        {(this.props.hasOwnProperty('logo')) ? (
          <Link className="navbar-brand" to={this.authPaths.siteHome}>{this.props.logo}<h1 className="sr-only">Logo</h1></Link>
        ): null}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {navItemsWithKeys}
          </ul>
          {(this.state.isAuthed) ? (
            <ul className="navbar-nav mr-0">
              <li className="nav-item">
                <span className="navbar-text">Logged in as </span>
              </li>
              <li className="nav-item">
                <Link className="nav-link prf-nav-username" to={`${this.authPaths.successfulLoginPath}/${this.state.username}`}>{this.state.username}</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#" onClick={this.doLogout}>Log Out</Link>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav mr-0">
              <li className="nav-item">
                <Link className="nav-link" to={this.authPaths.signupPath}>Sign up</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={this.authPaths.loginPath}>Log in</Link>
              </li>
            </ul>
          )}
          {/* TODO: search form goes here */}
        </div>
      </nav>
    );
  }
}