import React, { Component } from 'react';
import CountDownTimer from './timer';
import logo from './logo.png';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.pomodorMessage = "Break is over! Next Pomodoro started, lets finish one task..";
    this.shortBreakMessage = "Pomodoro completed! Take a 5 min break.";
    this.longBreakMessage = "You are doing exceptionaly well, your brain needs some rest, take a 15 min break."

    this.pomodoroTime = '25:00';
    this.pomodoroDuration = 25*60;
    this.shortBreakTime = '05:00';
    this.shortBreak = 5*60;
    this.longBreakTime = '15:00';
    this.longBreak = 15*60;
    this.state = {completedPomodors: 0,
                  currentTimer: 'pomodoro',
                  duration: 1*60,
                  time: '01:00'
                };
    this.handleTimerCompleted = this.handleTimerCompleted.bind(this);
  }

  handleTimerCompleted(){
    console.log('handleTimerCompleted is called.....');
    var duration, time, currentTimer, completedPomodors, message;
    if(this.state.currentTimer === 'pomodoro'){
      completedPomodors = this.state.completedPomodors + 1;
      if(completedPomodors % 4 === 0){
        duration = this.longBreak;
        time = this.longBreakTime;
        currentTimer = 'longBreak';
        message = this.longBreakMessage;
      }else{
        duration = this.shortBreak;
        time = this.shortBreakTime;
        currentTimer = 'shortBreak'
        message = this.shortBreakMessage;
      }
    }else{
      completedPomodors = this.state.completedPomodors;
      duration = this.pomodoroDuration;
      time = this.pomodoroTime;
      currentTimer = 'pomodoro'
      message = this.pomodorMessage;
    }

    this.desktopNotification(message);
    this.setState({completedPomodors: completedPomodors,
                    currentTimer: currentTimer,
                    duration: duration,
                    time: time
                  });
  }

  desktopNotification(message){
    if (!Notification) {
      alert('Desktop notifications not available in your browser.');
      return;
    }

    if (Notification.permission !== "granted")
      Notification.requestPermission();
    else {
      var notification = new Notification('Pomodiction', {
        icon: logo,
        body: message,
      });
      // notification.onclick = function () {
      //   window.open("http://stackoverflow.com/a/13328397/1269037");
      // };

    }

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
