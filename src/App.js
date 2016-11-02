import React, { Component } from 'react';
import CountDownTimer from './timer';
import PomodoroBlock from './pomodoro-block';
import Block from './block';
import logo from './logo.png';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    // this.pomodorMessage = "Break is over! Next Pomodoro started, lets finish one task..";
    // this.shortBreakMessage = "Pomodoro completed! Take a 5 min break.";
    // this.longBreakMessage = "You are doing exceptionaly well, your brain needs some rest, take a 15 min break."

    // this.pomodoroTime = '25:00';
    // this.shortBreakTime = '05:00';
    // this.longBreakTime = '15:00';

    this.pomodoroDuration = 25*60;
    this.shortBreakDuration = 5*60;
    this.longBreakDuration = 15*60;

    this.baseLeft = 20;
    this.margin = 5;
    this.pomodoroBlockWidth = 70;
    this.shortBreakBlockWidth = 15;
    this.longBreakBlockWidth = 30;

    this.pomodoroRatio = 0.466;
    this.shortBreakRatio = 0.5;
    this.longBreakRation = 0.333;

    this.state = {completedBlock: 6,
                  timerLeft: this.baseLeft,
                  timerStartingPosition: 0,
                  progressbarLeft: 0
                };
    // this.timerLeft = this.baseLeft + this.timerStartingPosition();
    // this.handleTimerCompleted = this.handleTimerCompleted.bind(this);

    // TODO
    // Need to handle this with the START button click.
    this.intervalId = this.startTimer(this.pomodoroDuration);
    // this.intervalId = this.startTimer(this.shortBreakDuration);
  }

  // This will set the correct postion of Timer before component mount.
  componentWillMount() {
    this.setState({timerStartingPosition: this.timerStartingPosition()})
  }

  blockType(blockNumber) {
    let block = new Block();
    return(block.blockType(blockNumber));
  }

  startTimer(duration) {
    // var timer = duration, minutes, seconds, currentTime;
    let initialDuration = duration;
    let minutes, seconds, displayTime;
    let Intervald = setInterval(function () {
      minutes = parseInt(duration / 60, 10);
      seconds = parseInt(duration % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      displayTime = minutes + ":" + seconds;

      this.updateComponents({displayTime: displayTime,
                        initialDuration: initialDuration,
                        currentDuration: duration});

      if (--duration < 0) {
        this.timerCompleted();
      }

    }.bind(this), 1000);
    return Intervald;
  }

  nextDuration() {
    // let block = new Block();
    let blockType = this.blockType(this.state.completedBlock);
    if( blockType === 'pomodoro'){
      return this.pomodoroDuration;
    }else if( blockType === 'break--short'){
      return this.shortBreakDuration;
    }else if( blockType === 'break--long'){
      return this.longBreakDuration;
    }
  }

  timerCompleted() {
    // Call Desktop Notification here.
    clearInterval(this.intervalId);
    let newDuration = this.nextDuration();
    this.setState({completedBlock: this.state.completedBlock + 1})
    this.intervalId = this.startTimer(newDuration);
  }

  timerStartingPosition() {
    let timerPosition = 0;

    if(this.state.completedBlock === 0){
      timerPosition = 0;
    }else{
      for(let i = 1; i <= this.state.completedBlock; i++){
        // let block = new Block();
        let blockType = this.blockType(i)
        if( blockType === 'pomodoro'){
          timerPosition += this.pomodoroBlockWidth;
        }else if( blockType === 'break--short'){
          timerPosition += this.shortBreakBlockWidth;
        }else if( blockType === 'break--long'){
          timerPosition += this.longBreakBlockWidth;
        }
        timerPosition += this.margin;
      }
    }
    return timerPosition;
  }

  updateComponents(params) {
    let timerLeftValue = this.calculateTimerMovement(params);
    let progressbarWidthValue = this.calculateProgressbarMovement(params);
    let timerPosition = this.timerStartingPosition();

    this.setState({displayTime: params.displayTime,
                  timerLeft: timerLeftValue,
                  progressbarLeft: progressbarWidthValue,
                  timerStartingPosition: timerPosition});
  }

  calculateTimerMovement(params) {
    let timeDiff = params.initialDuration - params.currentDuration;
    // Update on every 10 second
    // Need to consider completed blocks and its padding.
    if(timeDiff%10 === 0){
      return(this.baseLeft + this.state.timerStartingPosition + (this.pomodoroRatio * (timeDiff/10)));
    }else{
      return this.timerLeft;
    }
  }

  calculateProgressbarMovement(params) {
    let timeDiff = params.initialDuration - params.currentDuration;

    // Update on every 10 second
    // Need to consider completed blocks and its padding.
    if(timeDiff%10 === 0){
      return(this.pomodoroRatio * (timeDiff/10));
    }else{
      return this.state.progressbarLeft;
    }
  }



  // updateProgressbar(newLeft) {
  //   console.log(newLeft);
  //   this.setState({progressbarLeft: newLeft});
  // }

  // handleTimerCompleted(){
  //   console.log('handleTimerCompleted is called.....');
  //   var duration, time, currentTimer, completedPomodors, message;
  //   if(this.state.currentTimer === 'pomodoro'){
  //     completedPomodors = this.state.completedPomodors + 1;
  //     if(completedPomodors % 4 === 0){
  //       duration = this.longBreak;
  //       time = this.longBreakTime;
  //       currentTimer = 'longBreak';
  //       message = this.longBreakMessage;
  //     }else{
  //       duration = this.shortBreak;
  //       time = this.shortBreakTime;
  //       currentTimer = 'shortBreak'
  //       message = this.shortBreakMessage;
  //     }
  //   }else{
  //     completedPomodors = this.state.completedPomodors;
  //     duration = this.pomodoroDuration;
  //     time = this.pomodoroTime;
  //     currentTimer = 'pomodoro'
  //     message = this.pomodorMessage;
  //   }

  //   this.desktopNotification(message);
  //   this.setState({completedPomodors: completedPomodors,
  //                   currentTimer: currentTimer,
  //                   duration: duration,
  //                   time: time
  //                 });
  // }

  // desktopNotification(message){
  //   if (!Notification) {
  //     alert('Desktop notifications not available in your browser.');
  //     return;
  //   }

  //   if (Notification.permission !== "granted")
  //     Notification.requestPermission();
  //   else {
  //     var notification = new Notification('Pomodiction', {
  //       icon: logo,
  //       body: message,
  //     });
  //     // notification.onclick = function () {
  //     //   window.open("http://stackoverflow.com/a/13328397/1269037");
  //     // };

  //   }

  // }

  render() {
    return (
      <div className="container">
        <div className="app-title">
          <div className="app-title__name">Pomodiction</div>
          <div className="app-title__description">a simple pomodoro tracking app</div>
        </div>
        <div className="pomodoro-container">
          <CountDownTimer displayTime={this.state.displayTime}
                          timerLeft={this.state.timerLeft}
                          completedBlock={this.state.completedBlock}/>
          <PomodoroBlock completedBlock={this.state.completedBlock}
                          progressbarLeft={this.state.progressbarLeft}/>
        </div>
        <div className="button-container">
          <button className="button-container__button button-container__button--stop">STOP</button>
        </div>
        <div className="explanation">
          <p className="explanation__question">What is Pomodoro Technique?</p>
          <p className="explanation__answer">
            The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. The technique uses a timer to break down work into intervals, traditionally 25 minutes in length, separated by short breaks. These intervals are named pomodoros, the plural in English of the Italian word pomodoro (tomato), after the tomato-shaped kitchen timer that Cirillo used as a university student. The method is based on the idea that frequent breaks can improve mental agility.
          </p>
        </div>
      </div>
    );
  }
}

export default App;
