import React, { Component } from 'react';
import CountDownTimer from './timer';
import PomodoroBlock from './pomodoro-block';
import Block from './block';
import DesktopNotification from './desktop-notification';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.pomodoroDuration = 25*60;
    this.shortBreakDuration = 5*60;
    this.longBreakDuration = 15*60;

    this.baseLeft = 20;
    this.margin = 5;
    this.pomodoroBlockWidth = 70.2;
    this.shortBreakBlockWidth = 15.2;
    this.longBreakBlockWidth = 30.2;

    this.pomodoroRatio = 0.466;
    this.shortBreakRatio = 0.5;
    this.longBreakRatio = 0.333;

    this.state = {duration: this.pomodoroDuration,
                  status: 'initial',
                  completedBlock: 0,
                  timerLeft: this.baseLeft,
                  timerStartingPosition: 0,
                  progressbarLeft: 0,
                  buttonCaption: 'START'
                };

    this.intervalId = null;
    this.clickHandler = this.clickHandler.bind(this);
  }

  // This will set the correct postion of Timer before component renders.
  componentWillMount() {
    let timerStartingPosition = this.timerStartingPosition();
    let timerLeft = this.baseLeft + timerStartingPosition;
    let currentDuration = this.currentDuration();

    this.setState({timerLeft: timerLeft,
                  timerStartingPosition: timerStartingPosition,
                  duration: currentDuration,
                  displayTime: this.displayTime(currentDuration)
                })
  }

  clickHandler(){
    if(this.state.status === 'initial' || this.state.status === 'paused'){
      this.intervalId = this.startTimer(this.state.duration);
    }else{
      clearInterval(this.intervalId);
      this.setState({status: 'paused', buttonCaption: 'START'});
    }
    console.log(this.intervalId);
  }

  blockType(blockNumber) {
    let block = new Block();
    return(block.blockType(blockNumber));
  }

  displayTime(duration) {
    let minutes, seconds, displayTime;
    minutes = parseInt(duration / 60, 10);
    seconds = parseInt(duration % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    displayTime = minutes + ":" + seconds;
    return displayTime;
  }

  startTimer(duration) {
    let initialDuration = this.currentDuration();
    let Intervald = setInterval(function () {

      this.updateComponents({displayTime: this.displayTime(duration),
                        initialDuration: initialDuration,
                        currentDuration: duration});

      if (--duration < 0) {
        this.timerCompleted();
      }

    }.bind(this), 1000);
    return Intervald;
  }

  currentDuration() {
    let blockType = this.blockType(this.state.completedBlock+1);

    if( blockType === 'pomodoro'){
      return this.pomodoroDuration;
    }else if( blockType === 'break--short'){
      return this.shortBreakDuration;
    }else if( blockType === 'break--long'){
      return this.longBreakDuration;
    }
  }

  currentProgressRatio() {
   let blockType = this.blockType(this.state.completedBlock+1);
    if( blockType === 'pomodoro'){
      return this.pomodoroRatio;
    }else if( blockType === 'break--short'){
      return this.shortBreakRatio;
    }else if( blockType === 'break--long'){
      return this.longBreakRatio;
    } 
  }

  timerCompleted() {
    // Call Desktop Notification here.
    clearInterval(this.intervalId);
    this.setState({completedBlock: this.state.completedBlock + 1})
    this.sendNotification();
    let newDuration = this.currentDuration();
    this.intervalId = this.startTimer(newDuration);
  }

  sendNotification() {
    let notification = new DesktopNotification(this.state.completedBlock);
    notification.notify();
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

    this.setState({duration: params.currentDuration,
                  status: 'running',
                  displayTime: params.displayTime,
                  timerLeft: timerLeftValue,
                  progressbarLeft: progressbarWidthValue,
                  timerStartingPosition: timerPosition,
                  buttonCaption: 'PAUSE'});
  }

  calculateTimerMovement(params) {
    let timeDiff = params.initialDuration - params.currentDuration;
    // Update on every 10 second
    // Need to consider completed blocks and its padding.
    if(timeDiff%10 === 0){
      return(this.baseLeft + this.state.timerStartingPosition + (this.currentProgressRatio() * (timeDiff/10)));
    }else{
      return this.state.timerLeft;
    }
  }

  calculateProgressbarMovement(params) {
    let timeDiff = params.initialDuration - params.currentDuration;

    // Update on every 10 second
    // Need to consider completed blocks and its padding.
    if(timeDiff%10 === 0){
      return(this.currentProgressRatio() * (timeDiff/10));
    }else{
      return this.state.progressbarLeft;
    }
  }

  buttonCssClass() {
    if(this.state.status === 'running'){
      return 'button-container__button button-container__button--red';
    }else{
      return 'button-container__button button-container__button--green'
    }
  }

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
          <button className={this.buttonCssClass()} onClick={this.clickHandler}>{this.state.buttonCaption}</button>
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
