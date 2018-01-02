import React from 'react';

class NewUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  newUserSubmit() {
    const { username, password } = this.state;
    this.props.submitNewUser(username, password);
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
    const { username, password } = this.state;
    return (
      <div className="form-horizontal">
        create new account
        <br/>
        <div className="form-group">
          <label htmlFor="inputNewUsername" className="col-sm-2 contol-label">username</label>
          <div className="col-sm-5">
            <input type="username" className="form-control" id="inputNewUsername" onChange={this.onUNChange.bind(this)} />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputNewPassword" className="col-sm-2 contol-label">password</label>
          <div className="col-sm-5">
            <input type="password" className="form-control" id="inputNewPassword" onChange={this.onPWChange.bind(this)} />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            {(!username || !password) && 
              <fieldset disabled="disabled">
                <button type="submit" className="btn btn-default">submit</button>
              </fieldset>
            }
            {username && password && 
              <fieldset>
                <button type="submit" className="btn btn-default" onClick={this.newUserSubmit.bind(this)}>submit</button>
              </fieldset>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default NewUserForm;