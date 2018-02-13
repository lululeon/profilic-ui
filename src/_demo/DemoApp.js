import React, { Component } from 'react';
// *** uncomment the below to test full profilic stack once your profilic server is up and running
// import PrfHttpClient from 'profilic-client';
import PrfNavBar from '../components/PrfNavBar';


//set up a dummy auth handler just to see UI in action. It MUST be a singleton class.
class DummyAuthHandler {
  constructor() {
    if (!DummyAuthHandler.instance) {
      this.getAuthedUsername = () => { return ('Joe Bloggs'); }
      this.getAuthedID = () => { return ('123abc'); }
      this.login = () => { console.log('logging in.'); }
      this.logout = () => { console.log('logging out.'); }
      this.signupNewProfile = () => { console.log('signing up.'); }
      this.authenticate = () => { console.log('authenticating...'); }
      DummyAuthHandler.instance = this;
    }
    return DummyAuthHandler.instance;
  }
}


export default class DemoApp extends Component {
  constructor(props) {
    super(props);
    this.authHandler = new DummyAuthHandler();
    this.authPaths = {
      siteHome: '/home',
      defaultUnauthedPath: '/home',
      successfulLoginPath: '/user', // TODO: support path segments that can include [:username || :userid]
      signupPath: '/welcome/signup',
      loginPath: '/welcome/login'
    };
  }
 
  render() {
    let myCustomNavItems = [];
    myCustomNavItems.push(
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <a className="dropdown-item" href="#">A Special Foo</a>
          <a className="dropdown-item" href="#">A Different Bar</a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="#">Blah Blah</a>
        </div>
      </li>
    );
    myCustomNavItems.push(
      <li className="nav-item">
        <a className="nav-link disabled" href="#">Disabled</a>
      </li>
    );
    let sitelogo = (<img src="./profilic-micrologo.png" alt=""/>);
    return (
      <PrfNavBar authHandler = {this.authHandler} authPaths = {this.authPaths} logo={sitelogo} navItems={myCustomNavItems}/>
    );
  }
}