import React from 'react';
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }
  loginSubmit() {
    const { username, password } = this.state;
    this.props.submitLogin(username, password);
  }

  routeSubmit(route) {
    this.props.router(route);
  }
  
  onUNChange(e) {
    this.setState({
      username: e.target.value
    });
  }
  onPWChange(e) {
    this.setState({
      password: e.target.value
    });
  }

  render() {
    return (
        <div className="form-horizontal">
          <div className="form-group">
            <label htmlFor="inputUsername" className="col-sm-2 contol-label">username</label>
            <div className="col-sm-5">
              <input type="username" className="form-control" id="inputUsername" onChange={this.onUNChange.bind(this)} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword" className="col-sm-2 contol-label">password</label>
            <div className="col-sm-5">
              <input type="password" className="form-control" id="inputPassword" onChange={this.onPWChange.bind(this)}/>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-default" onClick={this.loginSubmit.bind(this)}>login</button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <button type="button" className="btn btn-link" onClick={this.routeSubmit.bind(this, 'newUser')}>new user</button>
            </div>
          </div>
        </div>
    );
  }
}

export default LoginForm;

// {/* username<input type="text" />
// password<input type="text" name="" id="" />
// <button>login</button>
// <button>new user</button> */}