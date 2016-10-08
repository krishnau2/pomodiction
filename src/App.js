import React, { Component } from 'react';
import CountDownTimer from './timer';
import logo from './logo.png';
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
                  duration: 1*60,
                  time: '01:00'
                };
    this.handleTimerCompleted = this.handleTimerCompleted.bind(this);
  }

  handleTimerCompleted(){
    console.log('handleTimerCompleted is called.....');
    var duration, time, currentTimer, completedPomodors;
    this.desktopNotification();
    if(this.state.currentTimer === 'pomodoro'){
      completedPomodors = this.state.completedPomodors + 1;
      if(completedPomodors % 4 === 0){
        duration = this.longBreak;
        time = this.longBreakTime;
        currentTimer = 'break'
      }else{
        duration = this.shortBreak;
        time = this.shortBreakTime;
        currentTimer = 'break'
      }
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

  desktopNotification(){
    // // request permission on page load
    // document.addEventListener('DOMContentLoaded', function () {
    //   if (Notification.permission !== "granted")
    //     Notification.requestPermission();
    // });
    if (!Notification) {
      alert('Desktop notifications not available in your browser.');
      return;
    }

    if (Notification.permission !== "granted")
      Notification.requestPermission();
    else {
      var notification = new Notification('Notification title', {
        icon: logo,
        body: "Hey there! You've been notified!",
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
