import React, { Component } from 'react';
import CountDownTimer from './timer';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="page-container">
        <div className="content-container">
          <div className="status">
            <div className="left">
              <div className="pomodoros"></div>
              <div className="pomodoros"></div>
              <div className="pomodoros"></div>
              <div className="pomodoros"></div>
              <div className="pomodoros"></div>
            </div>
            <div className="right">
              <div className="pomodoros"></div>
              <div className="pomodoros"></div>
              <div className="pomodoros"></div>
              <div className="pomodoros"></div>
              <div className="pomodoros"></div>
            </div>
          </div>
          < CountDownTimer />
        </div>
      </div>
    );
  }
}

export default App;
