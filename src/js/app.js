import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import '../css/style.css';
import '../meter/volume-meter';
import '../meter/main';

import micImage from '../assets/Mic_NoMeter.png';
import LoginControl from './LoginControl.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onLoginClick() {
    console.log('LETS LOGIN !')
  }

  render() {
    return (
      <div>
        <h1>shush</h1>
        <div align="right">
          <LoginControl />
        </div>
        <br/>
        {/* <VolumeMeter component goes here? */}
        <canvas id="meter" width="300" height="50"></canvas>
        <br/>
        <img src={micImage} alt='microphone' className="displayed" width="300px"/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));