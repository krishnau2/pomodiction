import React, { Component } from 'react';
import Block from './block';

class PomodoroBlock extends Component{

  blockType(blockNumber) {
    let block = new Block();
    return(block.blockType(blockNumber));
  }

  blockStatus(blockNumber){
    if(blockNumber <= this.props.completedBlock){
      return('completed');
    }else if(blockNumber === (this.props.completedBlock + 1)){
      return('inprogress');
    }else{
      return('emtpy');
    }
  }

  blockCompletedStatusCss(blockNumber, prefix) {
    if(this.blockStatus(blockNumber) === 'completed'){
      return(' '+prefix+'--completed');
    }else{
      return('');
    }
  }

  firstBlock(blockNumber){
    return blockNumber === 1 ? true : false;
  }
  
  lastBlock(blockNumber){
    return blockNumber === 19 ? true : false;
  }

  firstBlockOrLastBlockCss(blockNumber) {
    if(this.firstBlock(blockNumber) === true){
      return(' pomodoro--left');
    }else if(this.lastBlock(blockNumber) === true){
      return(' pomodoro--right');
    }else{
      return '';
    }
  }

  cssClasses(blockNumber) {
    let cssClass = 'pomodoro';
    let type = this.blockType(blockNumber);
    
    if(type === 'pomodoro'){
      cssClass += this.firstBlockOrLastBlockCss(blockNumber);
      cssClass += this.blockCompletedStatusCss(blockNumber, 'pomodoro');
    }else if(type === 'break--short'){
      cssClass += (' '+type);
      cssClass += this.blockCompletedStatusCss(blockNumber, 'break');
    }else if(type === 'break--long'){
      cssClass += (' '+type);
      cssClass += this.blockCompletedStatusCss(blockNumber, 'break');
    }else{
      cssClass += '';
    }
    return cssClass;
  }

  inProgressCssClass(blockNumber) {
    if(this.blockType(blockNumber) === 'pomodoro'){
      return('pomodoro-in-progress');
    }else{
      return('break-in-progress');
    }
  }


  renderWithProgressBlock(blockNumber) {
    if(this.blockStatus(blockNumber) === 'inprogress'){
      return(
        <div className={this.cssClasses(blockNumber)} key={blockNumber}>
          <div className={this.inProgressCssClass(blockNumber)} style={{width: this.props.progressbarLeft + 'px'}}></div>
        </div>
      );
    }else{
      return(<div className={this.cssClasses(blockNumber)} key={blockNumber}></div>);
    }
  }


  render() {
    const blocks = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
    let allBlocks = blocks.map((b) => 
      this.renderWithProgressBlock(b) 
    );

    return (<div> {allBlocks} </div> );
  }
}

export default PomodoroBlock;