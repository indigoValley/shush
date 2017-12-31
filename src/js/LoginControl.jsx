import React from 'react';

class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.state = { isLoggedIn: false };
  }

  handleLoginClick(bool = !this.state.isLoggedIn) {
    this.setState({ isLoggedIn: bool });
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;

    let button = null;
    if (isLoggedIn) {
      button = <button type="button" className="btn btn-lg btn-danger" onClick={this.handleLoginClick}>Logout</button>;
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