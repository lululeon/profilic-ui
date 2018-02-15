import React, { Component } from "react";
import { withRouter } from 'react-router';


/**
 * HOC for route access / authentication.
 * @param {class} TargetComponent - The target component to render
 * @param {class} authHandler - A singleton class for handling authentication client-side.
 * @param {object} authPaths - Object defining key paths in the authentication lifecycle
 */
export default function (TargetComponent, authHandler, authPaths) {
  //define the wrapper class. note: withRouter allows access to match, location and history via props
  @withRouter
  class PrfAuthChecker extends Component {
    constructor(props) {
      super(props);
      this.state = { isAuthed: false };
      this.prfClient = authHandler;
      this.authPaths = authPaths;
    }

    componentWillMount = () => {
      this.prfClient.authenticate(this.checkAuthResult);
    }

    checkAuthResult = (responseData) => {
      if (!responseData) {
        this.props.history.push(this.authPaths.defaultUnauthedPath);
      } else {
        this.setState({ isAuthed: true });
      }
    }

    render() {
      console.log("##################### checking state.isAuthed:", this.state.isAuthed);
      if (!this.state.isAuthed) return null;
      return <TargetComponent authHandler={authHandler} authPaths={authPaths} {...this.props} />
    }

  }

  return PrfAuthChecker;
}
