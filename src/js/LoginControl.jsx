import React from 'react';

class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = { isLoggedIn: false };
  }

  handleLoginClick() {
    this.setState({ isLoggedIn: true });
  }

  handleLogoutClick() {
    this.setState({ isLoggedIn: false });
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;

    let button = null;
    if (isLoggedIn) {
      button = <button type="button" className="btn btn-lg btn-danger" onClick={this.handleLogoutClick}>Logout</button>;
    } else {
      button = <button type="button" className="btn btn-lg btn-primary" onClick={this.handleLoginClick}>Login</button>;
    }

    return (
      <div>
        {button}
      </div>
    );
  }
}

export default LoginControl;