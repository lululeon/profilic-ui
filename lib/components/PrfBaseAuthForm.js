import { Component } from 'react';
import JSClientUtils from '../utils/utils';

export default class PrfBaseAuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      alertMessage: '',
      authComplete: false
    };
    this.prfClient = this.props.authHandler;
    this.authPaths = this.props.authPaths;
    this.lastSignupAttempt = null;
  }

  resetForm = () => {
    this.setState({
      email: '',
      username: '',
      password: '',
      alertMessage: ''
    });
  }

  onInputChange = (e) => {
    let tmpState = { alertMessage: '' };
    let fieldName = e.target.name;

    //since the user cannot see what they are typing in the pwd box, we leave it as-is
    //as there's no visual feedback for the user to know that we're trimming their input:
    tmpState[fieldName] = (fieldName != 'password') ? e.target.value.trim() : e.target.value;
    this.setState(tmpState);
  }

  cancelSubmission = (e) => {
    e.preventDefault();
    this.resetForm();
    this.props.history.push(this.authPaths.defaultUnauthedPath);
  }

  doSignup = (e) => {
    e.preventDefault();
    let email = this.state.email;
    let username = this.state.username;
    let password = this.state.password;

    if (email == '' || username == '' || password == '') {
      this.setState({ alertMessage: 'Please do not leave any fields blank' });
      return;
    }
    //TODO: block spaces, and any of # < > [ ] | { } / @, block anything that looks like an ip adress(x.x.x.x)
    if (password.indexOf(' ') != -1) {
      this.setState({ alertMessage: 'You cannot have spaces in your password' });
      return;
    }
    if (!JSClientUtils.validateEmail(email)) {
      this.setState({ alertMessage: 'The email provided is not valid' });
      return;
    }

    //TODO: other validation
    //...

    //checks ok
    let newUser = { username: username, password: password, email: email };
    this.lastSignupAttempt = newUser;
    this.prfClient.signupNewProfile(newUser, this.onSignupComplete);
  }

  onSignupComplete = (responseData) => {
    if (!responseData) {
      this.setState({ alertMessage: 'Could not complete the signup process. Please try again' });
    } else {
      if (responseData.insertedCount == 1) {
        this.resetForm();
      } else {
        //TODO: friendly alert or logging
        //console.error("PrfBaseAuthForm::onSignupComplete : signup request failed");
      }
    }
    //log them in:
    this.prfClient.login(this.lastSignupAttempt, this.onLoginComplete);
  }

  doLogin = (e) => {
    e.preventDefault();
    let username = this.state.username;
    let password = this.state.password;

    if (username == '' || password == '') {
      this.setState({ alertMessage: 'Please do not leave any fields blank' });
      return;
    }

    let theUser = { username: username, password: password };
    this.prfClient.login(theUser, this.onLoginComplete);
  }

  onLoginComplete = (responseData) => {
    if (!responseData) {
      this.setState({ alertMessage: 'Could not validate your credentials... Please try again' });
    } else {
      const token = responseData.prf_authtoken;
      localStorage.setItem('prf_authtoken', token);
      this.prfClient.setAuthHeader(token);
      this.setState({ authComplete: true });
    }
  }

  render() {
    return null; //child classes to reimplement
  }
}