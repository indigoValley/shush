import React, { Component } from 'react';
import { render } from 'react-dom';

import '../css/style.css';

import micImage from '../assets/Mic_NoMeter.png';

export default class Hello extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.onLoginClick = () => {
    //   console.log('LETS LOGIN !')
    // };
  }
  onLoginClick() {
    console.log('LETS LOGIN !')
  }

  render() {
    return (
      <div>
        <div align="right">
          <button type="button" className="btn btn-lg btn-primary" onClick={this.onLoginClick}>Login</button>
        </div>
        <h1>shush</h1>
        <br/>
        <canvas id="meter" width="300" height="50"></canvas>
        <br/>
        <img src={micImage} alt='microphone' className="displayed" width="400px"/>
      </div>
    );
  }
}

render(<Hello />, document.getElementById('app'));