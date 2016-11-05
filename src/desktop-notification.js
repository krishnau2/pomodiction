import Block from './block';
import logo from './logo.png';

class DesktopNotification{
  constructor(completedBlock) {
    this.completedBlock = completedBlock;

    this.pomodoroMessage = "Break is over! Next Pomodoro started, lets finish one task...";
    this.shortBreakMessage = "Pomodoro completed! Take a 5 min break.";
    this.longBreakMessage = "You are doing exceptionaly well, your brain needs some rest, take a 15 min break."

  }

  blockType() {
    let block = new Block();
    return(block.blockType(this.completedBlock + 1)); // Want to get what is next block
  }

  message() {
    let type = this.blockType();
    if( type === 'pomodoro'){
      return this.pomodoroMessage;
    }else if( type === 'break--short'){
      return this.shortBreakMessage;
    }else if( type === 'break--long'){
      return this.longBreakMessage;
    }
  }

  notify() {
    if (!Notification) {
      alert('Desktop notifications not available in your browser.');
      return;
    }

    if (Notification.permission !== "granted")
      Notification.requestPermission();
    else {
      let notification = new Notification('Pomodiction', {
        icon: logo,
        body: this.message(),
      });
      // notification.onclick = function () {
      //   window.open("http://stackoverflow.com/a/13328397/1269037");
      // };

    }
  }
}

export default DesktopNotification;