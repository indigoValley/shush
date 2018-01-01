import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import '../css/style.css';
import micImage from '../assets/Mic_NoMeter.png';
import {loadVolume} from '../meter/volume-meter';

import LoginForm from './LoginForm.jsx';
import NewUserForm from './NewUserForm.jsx';
import SettingsForm from './SettingsForm.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      rendMic: true,
      rendLogin: false,
      rendNewUser: false,
      rendSettings: false,

      username: null,
      triggers: [],
      currentVol: 0,
    };
  }
  //use throttle here?
  componentWillMount() {
    loadVolume((vol) => {
      // this.setState({currentVol: vol});
      // console.log(vol);

    });
  }

  routeButtonClick(route) {
    console.log('routing to ', route)
    this.setState({
      rendMic: route === 'mic',
      rendLogin: route === 'login',
      rendNewUser: route === 'newUser',
      rendSettings: route === 'settings',
    });
  }

  submitLogin(username, password) {
    //THIS IS WHERE oAUTH GOES <-------------------
    this.setState({
      username: username,
      isLoggedIn: true,
    });
    this.routeButtonClick('mic');
  }


  render() {
    const {isLoggedIn, rendMic, rendLogin, rendNewUser, rendSettings, username, triggers} = this.state;
    return (
      <div>
        <h1>shush</h1>
        {/* login/out button conditional rendering */}
        <div align="right">
          {!isLoggedIn && <button type="button" className="btn btn-lg btn-primary" onClick={this.routeButtonClick.bind(this, 'login')}>login</button>}
          {isLoggedIn && 
            <div>
              <button type="button" className="btn btn-lg btn-success">add triggers</button>
              <button type="button" className="btn btn-lg btn-danger" >logout</button>
            </div>}
        </div>
        <br/>
        <canvas id="meter" width="300" height="50"></canvas>
        <br/>
        {/* main functional conditional rendering */}
        {rendMic && <img src={micImage} alt='microphone' className="displayed" width="300px" />}
        {rendLogin && <LoginForm router={this.routeButtonClick.bind(this)} submitLogin={this.submitLogin.bind(this)}/>}
        {rendNewUser && <NewUserForm />}
        {rendSettings && <SettingsForm />}
      </div>
    );
  }
}

// {/* CONDITIONAL RENDERING SYNTAX --> {isLoggedIn && <LoggedInUser name={name} />} */}
ReactDOM.render(<App />, document.getElementById('app'));