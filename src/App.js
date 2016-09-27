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
    this.state = {completedPomodors: 0,
                  currentTimer: 'pomodoro',
                  duration: 10,
                  time: '00:10'
                };
    this.handleTimerCompleted = this.handleTimerCompleted.bind(this);
  }

  handleTimerCompleted(){
    console.log('handleTimerCompleted is called.....');
    var duration, time, currentTimer, completedPomodors;
    if(this.state.currentTimer === 'pomodoro'){
      completedPomodors = this.state.completedPomodors + 1;
      duration = this.shortBreak;
      time = this.shortBreakTime;
      currentTimer = 'break'
    }else{
      completedPomodors = this.state.completedPomodors;
      duration = this.pomodoroDuration;
      time = this.pomodoroTime;
      currentTimer = 'pomodoro'
    }

    this.setState({completedPomodors: completedPomodors,
                    currentTimer: currentTimer,
                    duration: duration,
                    time: time
                  });
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
          < CountDownTimer duration={this.state.duration} time={this.state.time} action={this.handleTimerCompleted}/>
        </div>
      </div>
    );
  }
}

export default App;
