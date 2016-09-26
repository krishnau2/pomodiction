import React, { Component } from 'react';
import CountDownTimer from './timer';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.pomodoroTime = '25:00';
    this.pomodoroDuration = 25*60;
    this.shortBreakTime = '05:00';
    this.shortBreak = 5*60;
    this.longBreakTime = '15:00';
    this.longBreak = 15*60;
  }

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
          < CountDownTimer duration={this.longBreak} time={this.longBreakTime}/>
        </div>
      </div>
    );
  }
}

export default App;
