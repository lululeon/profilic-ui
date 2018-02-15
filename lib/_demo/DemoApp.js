import React, { Component } from 'react';
import { Switch, Route, Link} from 'react-router-dom';
// *** uncomment the below to test full profilic stack once your profilic server is up and running
// import PrfHttpClient from 'profilic-client';
import PrfNavBar from '../components/PrfNavBar';
import isAuthed from '../components/PrfAuthCheck';
import PrfBaseProfile from '../components/PrfBaseProfile';
import PrfSignupForm from '../components/PrfSignupForm';
import PrfLoginForm from '../components/PrfLoginForm';


//set up a dummy auth handler just to see UI visual look and feel. This is a stub for profilic-client:
class DummyAuthHandler {
  constructor() {
    if (!DummyAuthHandler.instance) {
      this.__auth = false;
      this.__stubUser = {id: '1', username: 'Jane Bloggs', email: 'jane@bloggs.com', bio:'I am not a real person' };
      this.__stubResponse = {profileList:[this.__stubUser], insertedcount:1, modifiedcount:1};
      this.getAuthedUsername = () => { return (this.__stubUser.username); }
      this.getAuthedID = () => { return ('123abc'); }
      this.login = (loginInfo, callback) => { 
        console.log('logging in with:', loginInfo);
        this.__stubUser = {...this.__stubUser, username: loginInfo.username};
        this.__auth = true;
        callback( {...this.__stubResponse, profileList: [this.__stubUser]} );
      }
      this.logout = () => { 
        console.log('logging out.');
        this.__auth = false;
      }
      this.signupNewProfile = (signupInfo, callback) => { 
        console.log('signing up with:', signupInfo);
        this.__stubUser =  {...this.__stubUser, username: signupInfo.username, email: signupInfo.email};
        this.__auth = true;
        callback( {...this.__stubResponse, profileList: [this.__stubUser]} );
      }
      this.authenticate = (callback) => { console.log('authenticating...'); callback(this.__auth); }
      this.setAuthHeader = () => {  console.log('setting auth header.'); }
      DummyAuthHandler.instance = this;
    }
    return DummyAuthHandler.instance;
  }
}

const HomePage = () => (
  <div>
    <h1>Home page</h1>
  </div>
)

export default class DemoApp extends Component {
  constructor(props) {
    super(props);
    this.authHandler = new DummyAuthHandler(); //TODO: reduxify and handle auth state in global store.
    this.authPaths = {
      siteHome: '/',
      defaultUnauthedPath: '/',
      successfulLoginPath: '/user', // TODO: support path segments that can include [:username || :userid]
      signupPath: '/signup',
      loginPath: '/login'
    };
  }
 
  render() {
    // ######### HOW TO ADD ITEMS TO THE NAVBAR ############ 
    let myCustomNavItems = [];
    myCustomNavItems.push(
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link className="dropdown-item" to="#">A Special Foo</Link>
          <Link className="dropdown-item" to="#">A Different Bar</Link>
          <div className="dropdown-divider"></div>
          <Link className="dropdown-item" to="#">Blah Blah</Link>
        </div>
      </li>
    );
    myCustomNavItems.push(
      <li className="nav-item">
        <a className="nav-link disabled" href="#">Disabled</a>
      </li>
    );

    // ######### HOW TO CHANGE THE IMAGE FOR THE LOGO IN THE NAVBAR ############ 
    let sitelogo = (<img src="./profilic-micrologo.png" alt=""/>);

    // ######### EXAMPLE SKELETON SITE THAT DOES NOTHING EXCEPT HANDLE SIGNUP, LOGIN, NAVIGATION AND LOGOUT ############ 
    return (
      <div>
        <PrfNavBar authHandler = {this.authHandler} authPaths = {this.authPaths} logo={sitelogo} navItems={myCustomNavItems}/>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path={this.authPaths.signupPath} render={ (props) => (<PrfSignupForm authHandler = {this.authHandler} authPaths = {this.authPaths} {...props} />) } />,
          <Route path={this.authPaths.loginPath} render={ (props) => (<PrfLoginForm authHandler = {this.authHandler} authPaths = {this.authPaths} {...props} />) } />,
          <Route path={this.authPaths.successfulLoginPath} component={isAuthed(PrfBaseProfile, this.authHandler, this.authPaths)} />
        </Switch>
      </div>
    );
  }
}