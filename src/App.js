import React, { Component } from 'react';
import CountDownTime from './time';
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
          <div className="timer">
            <CountDownTime />
            <div className="button-container">
              <button className="button">Start</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
