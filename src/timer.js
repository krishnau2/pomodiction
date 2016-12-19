import React, { Component } from 'react';
import Block from './block';

class CountDownTimer extends Component{
  constructor(props) {
    super(props);
    this.state = {displayTime: this.props.displayTime };
  }

  runningBlock() {
    let block = new Block();
    return(block.blockType(this.props.runningBlockNumber));
  }

  timerCssClass() {
    if(this.runningBlock() === 'pomodoro'){
      return 'timer timer-pomodoro';
    }else{
      return 'timer timer-break';
    }
  }

  progressIndicatorCssClass(){
   if(this.runningBlock() === 'pomodoro'){
      return 'progress-indicator progress-indicator-pomodoro';
    }else{
      return 'progress-indicator progress-indicator-break';
    }
  }


  render(){
    return(
      <div className="timer-container" style={{left: this.props.timerLeft + 'px'}}>
        <div className={this.timerCssClass()}>{this.props.displayTime}</div>
        <div className={this.progressIndicatorCssClass()}></div>
      </div>
    );
  }
}

export default CountDownTimer;