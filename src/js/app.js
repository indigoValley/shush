import React, { Component } from 'react';
import { render } from 'react-dom';

import '../css/style.css';

import micImage from '../assets/microphone.png';

export default class Hello extends Component {
  render() {
    return (
      <div>
        <h1>shush</h1>
        <br/>
        <canvas id="meter" width="500" height="50"></canvas>
        <br/>
        <img src={micImage} alt='microphone' className="displayed" width="400px"/>
      </div>
    );
  }
}

render(<Hello />, document.getElementById('app'));