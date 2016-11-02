class Block{
  blockType(blockNumber) {
    let type = '';
    switch (blockNumber){
      case 1:        
      case 3:
      case 5:
      case 7:
      case 9:
      case 11:
      case 13:
      case 15:
      case 17:
      case 19:
        type = 'pomodoro';
        break;
      case 2:
      case 4:
      case 6:
      case 10:
      case 12:
      case 14:
      case 18:
        type = 'break--short';
        break;
      case 8:
      case 16:
        type = 'break--long';
        break;
      default:
        type = type;
        break;
    }
    return type;
  }
}

export default Block;