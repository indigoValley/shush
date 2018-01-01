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
import shushFile from '../sounds/shush.mp3';  
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
      triggers: [
        {
          gate: .15,
          message: 'shhhhhhhhhhhh',
          clip: 'shush'
        },
        {
          gate: .25,
          message: 'quiet down please',
          clip: 'fonzie'
        },
        {
          gate: .4,
          message: 'SHUT UP !!!',
          clip: 'shutTheFUp'
        },
      ],
      currentVol: 0,
    };
    
    this.timeout = 1500;
    this.triggerEvent = throttle(this.triggerEvent, this.timeout, { trailing: false });
    this.sounds = {
      shush: new Audio(shushFile),
      fonzie: new Audio(fonzieFile),
      getOutMyFace: new Audio(getOutMyFaceFile),
      shutTheFUp: new Audio(shutTheFUpFile),
      stopRightThere: new Audio(stopRightThereFile),
      youBestBackOff: new Audio(youBestBackOffFile),
    };
  }
  //use throttle here?
  componentWillMount() {
    loadVolume((vol) => {
      let didTrigger = { gate: 0, message: '', clip: '', play: false };
      let play = false;
      this.state.triggers.forEach((trigger, i) => {
        if (vol >= trigger.gate) {
          if (!play) {
            play = true;
          }
          if (trigger.gate > didTrigger.gate) {
            didTrigger = trigger;
          }
        }
      });
      if (play) {
        this.triggerEvent(didTrigger, vol);
      }
      // this.setState({currentVol: vol});
      // console.log(vol);
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
    if (this.sounds[trigger.clip]) {
      this.sounds[trigger.clip].play();
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
            <button type="button" className="btn btn-lg btn-danger" onClick={this.logout.bind(this)}>logout</button>
            </div>}
        </div>
        <br/>
        <canvas id="meter" width="300" height="50"></canvas>
        <br/>
        {/* main functional conditional rendering */}
        {rendMic && !message && <img src={micImage} alt='microphone' className="displayed" width="300px" />}
        {message && <h1>{message}</h1>}
        {rendLogin && <LoginForm router={this.routeButtonClick.bind(this)} submitLogin={this.submitLogin.bind(this)}/>}
        {rendNewUser && <NewUserForm />}
        {rendSettings && <SettingsForm triggers={triggers} addTrigger={this.addTrigger.bind(this)}/>}
      </div>
    );
  }
}

// {/* CONDITIONAL RENDERING SYNTAX --> {isLoggedIn && <LoggedInUser name={name} />} */}
ReactDOM.render(<App />, document.getElementById('app'));