import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import '../css/style.css';
import micImage from '../assets/Mic_NoMeter.png';
import '../meter/main';
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

      message: '',
      username: null,
      triggers: [
        {
          gate: .1,
          message: 'shhhhhhhhhhhh',
          clip: '1'
        },
        {
          gate: .2,
          message: 'quiet down please',
          clip: '2'
        },
        {
          gate: .3,
          message: 'BITCH BE COOL !!!',
          clip: '3'
        },

      ],
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
    if (route === 'settings' && this.state.rendSettings) {
      route = 'mic';
    }
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

  logout() {
    this.setState({
      isLoggedIn: false,
      username: null
    });
    this.routeButtonClick('mic');
  }

  addTrigger(trigger) {
    console.log('adding this trigger !\n', trigger)
    let trigs = this.state.triggers.concat(trigger);
    this.setState({
      triggers: trigs
    })
  }


  render() {
    const {isLoggedIn, rendMic, rendLogin, rendNewUser, rendSettings, username, triggers, message} = this.state;
    return (
      <div>
        <h1>{'shush'}</h1>
        {/* login/out button conditional rendering */}
        <div align="right">
          {username}
          <br/>
          {!isLoggedIn && <button type="button" className="btn btn-lg btn-primary" onClick={this.routeButtonClick.bind(this, 'login')}>login</button>}
          {isLoggedIn && 
            <div>
            <button type="button" className="btn btn-lg btn-success" onClick={this.routeButtonClick.bind(this, 'settings')}>
              {this.state.rendSettings ? 'hide triggers' : 'add triggers'}
            </button>
            &nbsp;&nbsp;
            <button type="button" className="btn btn-lg btn-danger" onClick={this.logout.bind(this)}>logout</button>
            </div>}
        </div>
        <br/>
        <canvas id="meter" width="300" height="50"></canvas>
        <br/>
        {/* main functional conditional rendering */}
        {rendMic && !message && <img src={micImage} alt='microphone' className="displayed" width="300px" />}
        {rendMic && message && <h1>{message}</h1>}
        {rendLogin && <LoginForm router={this.routeButtonClick.bind(this)} submitLogin={this.submitLogin.bind(this)}/>}
        {rendNewUser && <NewUserForm />}
        {rendSettings && <SettingsForm triggers={triggers} addTrigger={this.addTrigger.bind(this)}/>}
      </div>
    );
  }
}

// {/* CONDITIONAL RENDERING SYNTAX --> {isLoggedIn && <LoggedInUser name={name} />} */}
ReactDOM.render(<App />, document.getElementById('app'));