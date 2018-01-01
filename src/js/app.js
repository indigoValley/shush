import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import '../css/style.css';
import '../meter/volume-meter';
import '../meter/main';

import micImage from '../assets/Mic_NoMeter.png';
import LoginControl from './LoginControl.jsx';
import {loadVolume} from '../meter/volume-meter';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: null,
      vol: 0

    };
  }
  onLoginClick() {
    console.log('LETS LOGIN !')
  }

  //use throttle here?
  componentWillMount() {
    loadVolume((vol) => {
      // this.setState({currentVol: vol});
      console.log(vol);

    });
  }

  render() {
    const {isLoggedIn, name} = this.state;
    return (
      <div>
        <h1>shush</h1>
        {/* CONDITIONAL RENDERING SYNTAX --> {isLoggedIn && <LoggedInUser name={name} />} */}
        <div align="right">
          <button type="button" className="btn btn-lg btn-primary" onClick={this.onLoginClick}>Login</button>
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