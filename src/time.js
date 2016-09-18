import React, { Component } from 'react';

class CountDownTime extends Component{
  constructor(props) {
    super(props);
    this.state = {Ktime: '25:00'};
    // this.startTimer = this.startTimer.bind(this);
    this.startTimer(25*60);
  }

  startTimer(duration) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
      minutes = parseInt(timer / 60, 10)
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      // display.text(minutes + ":" + seconds);
      this.setState({Ktime: minutes + ":" + seconds});

      if (--timer < 0) {
          timer = duration;
      }
    }.bind(this), 1000);
  }

  render(){
    return(
      <div className="time"> {this.state.Ktime} </div>
    );
  }
}

export default CountDownTime;