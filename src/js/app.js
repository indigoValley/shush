import React, { Component } from 'react';
// import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import '../css/style.css';

import micImage from '../assets/Mic_NoMeter.png';
import '../meter/volume-meter';
import '../meter/main';
import LoginControl from './LoginControl.jsx';
export default class App extends Component {
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
        <canvas id="meter" width="300" height="50"></canvas>
        <br/>
        <img src={micImage} alt='microphone' className="displayed" width="300px"/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));