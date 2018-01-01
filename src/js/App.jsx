import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import '../css/style.css';
import micImage from '../assets/Mic_NoMeter.png';
import '../meter/main';
import {loadVolume} from '../meter/volume-meter';

import LoginForm from './LoginForm.jsx';
import NewUserForm from './NewUserForm.jsx';
import SettingsForm from './SettingsForm.jsx';
import throttle from '../../node_modules/lodash.throttle';

// sound files
import shushFile from '../sounds/shush.mp3';  
import pinDropFile from '../sounds/pinDrop.mp3';
import hornHonkFile from '../sounds/hornHonk.mp3';
import radioInterruptFile from '../sounds/radioInterruption.mp3';
import fonzieFile from '../sounds/fonzie.mp3';  
import getOutMyFaceFile from '../sounds/getOutMyFace.mp3';  
import shutTheFUpFile from '../sounds/shutTheFUp.mp3';  
import stopRightThereFile from '../sounds/stopRightThere.mp3';  
import youBestBackOffFile from '../sounds/youBestBackOff.mp3';  

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
      triggers: [],
      currentVol: 0,
    };
    
    this.timeout = 1500;
    this.triggerEvent = throttle(this.triggerEvent, this.timeout, { trailing: false });
    this.sounds = {
      shush: new Audio(shushFile),
      pinDrop: new Audio(pinDropFile),
      hornHonk: new Audio(hornHonkFile),
      radioInterrupt: new Audio(radioInterruptFile),
      stopRightThere: new Audio(stopRightThereFile),
      fonzie: new Audio(fonzieFile),
      youBestBackOff: new Audio(youBestBackOffFile),
      getOutMyFace: new Audio(getOutMyFaceFile),
      shutTheFUp: new Audio(shutTheFUpFile),
    };
    this.gates = {
      0: 0,
      '10 dB - breathing': 0.1,
      '20 dB - whisper': 0.2,
      '50 dB - private conversation': 0.4,
      '60 dB - group conversation': 0.6,
      '80 dB - busy restaurant': 0.8,
      '100 dB - jackhammer': 0.9,
    };
    this.clips = {
      '"shhhhhhh"': 'shush',
      'pin drop': 'pinDrop',
      'horn honk': 'hornHonk',
      'radio interruption': 'radioInterrupt',
      'Sam says "stop right there"': 'stopRightThere',
      'Sam says "be like Fonzie"': 'fonzie',
      'Sam says "back off"': 'youBestBackOff',
      'Sam says "get the F out my face"': 'getOutMyFace',
      'Sam says "shut the F up"': 'shutTheFUp',
    };
  }
  componentWillMount() {
    loadVolume((vol) => {
      let didTrigger = { gate: 0, message: '', clip: '', play: false };
      let play = false;
      this.state.triggers.forEach((trigger, i) => {
        const tGate = this.gates[trigger.gate];
        if (vol >= tGate) {
          if (!play) {
            play = true;
          }
          if (tGate > this.gates[didTrigger.gate]) {
            didTrigger = trigger;
          }
        }
      });
      if (play && this.state.isLoggedIn) {
        this.triggerEvent(didTrigger, vol);
      }
    });
  }
  
  triggerEvent(trigger, vol) {
    console.log('vol', vol);
    this.setState({
      message: trigger.message,
    });
    setTimeout(() => {
      this.setState({
        message: '',
      });
    }, this.timeout);
    console.log(trigger);
    if (this.sounds[this.clips[trigger.clip]]) {
      this.sounds[this.clips[trigger.clip]].play();
    }
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