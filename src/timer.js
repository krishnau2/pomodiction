import React, { Component } from 'react';

class CountDownTimer extends Component{
  constructor(props) {
    super(props);
    this.state = {time: '25:00', 
                  status: 'start',
                  timer: 25*60
                };
    this.clickHandler = this.clickHandler.bind(this);
  }

  startTimer(duration) {
    var timer = duration, minutes, seconds, currentTime;
    var Intervald = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      // display.text(minutes + ":" + seconds);
      currentTime = minutes + ":" + seconds;
      this.setState({time: currentTime, status: 'running', timer: timer});

      if (--timer < 0) {
          timer = duration;
      }
    }.bind(this), 1000);
    return Intervald;
  }

  clickHandler() {
    if(this.state.status === 'start' || this.state.status === 'paused'){
      this.intervalId = this.startTimer(this.state.timer);
    }else{
      clearInterval(this.intervalId);
      this.setState({time: this.state.time, status: 'paused', timer: this.state.timer});   
    }
  }

  buttonCaption() {
    if(this.state.status === 'start' || this.state.status === 'paused'){
      return "Start"
    }else{
      return "Pause"
    }
  }

  render(){
    return(
      <div className="timer">
        <div className="time"> {this.state.time} </div>
        <div className="button-container">
          <button className="button" onClick={this.clickHandler}>{this.buttonCaption()}</button>
        </div>
      </div>
    );
  }
}

export default CountDownTimer;