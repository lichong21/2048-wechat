const Grid = require('./Grid');

const Direction = {
  Up: 'up',
  Right: 'right',
  Down: 'down',
  Left: 'left',
  Unknow: 'unknow'
}

class GameManage {
  size: number;
  startTileNum: number;
  gameOver: boolean;
  gameWon: boolean;
  gridCells: any [] [];
  constructor(size: number) {
    this.size = size;
    this.startTileNum = 2;
    this.gameOver = false;
    this.gameWon = false;
    this.gridCells = [];
  }

  initGame() {
    this.initGrid();
    this.addRandowGrid();
    this.addRandowGrid();
    return this.gridCells;
  }

  initGrid() {
    for (let i = 0; i < this.size; i++) {
      this.gridCells[i] = [];
      for (let j = 0; j < this.size; j++) {
        this.gridCells[i][j] = null as any;
      }
    }
    console.table(this.gridCells);
    return this.gridCells;
  }

  moveGrids(direction: string) {
    switch (direction) {
      case Direction.Up:
        this.moveUp(this.gridCells);
        break;
      case Direction.Right:
        this.moveRight(this.gridCells)
        break;
      case Direction.Down:
        this.moveDown(this.gridCells);
        break;
      case Direction.Left:
        this.moveLeft(this.gridCells);
        break;
    
      default:
        break;
    }
    console.log('xxx', this.gridCells);
    return this.gridCells;
  }

  moveUp(grids: any [] []) {
    for (let i = 0; i < this.size; i++) {
      let arr = [];
      for (let j = 0; j < this.size; j++) {
        const cellData = grids[j][i];
        if (cellData) {
          arr.push(cellData);
        }
        grids[j][i] = null;
      }
      console.log('left', arr);
      if (arr.length === 0) continue;
      let left = 0;
      let right = left + 1;
      
      while (right < arr.length) {
        if (arr[left].value === arr[right].value) {
          arr[left].value = arr[left].value * 2;
          arr[right] = null;
          right++;
          left = right;
          right++;
        } else {
          left++;
          right++;
        }
      }
      arr = arr.filter(arr => arr);
      console.log('up-Arr', arr);
      for (let m = 0; m < arr.length; m++) {
        grids[m][i] = arr[m];
      }
    }
    return grids;
  }

  moveRight(grids: any [] []) {
    for (let i = 0; i < this.size; i++) {
      let arr = [];
      for (let j = 0; j < this.size; j++) {
        const cellData = grids[i][j];
        if (cellData) {
          arr.push(cellData);
        }
        grids[i][j] = null;
      }
      console.log('right', arr);
      let right = arr.length - 1;
      let left = right - 1;
      while (left >= 0) {
        if (arr[left].value === arr[right].value) {
          arr[right].value = arr[right].value * 2;
          arr[left] = null;
          left--;
          right = left;
          left--;
        } else {
          left--;
          right--;
        }
      }
      console.log('right-Arr', arr);
      arr = arr.filter(arr => arr);
      let gridRight = this.size - 1;
      let arrRight = arr.length - 1;
      while (gridRight >= 0 && arrRight >=0) {
        grids[i][gridRight] = arr[arrRight];
        gridRight--;
        arrRight--;
      }
    }
    return grids;
  }

  moveDown(grids: any [] []) {
    for (let i = 0; i < this.size; i++) {
      let arr = [];
      for (let j = 0; j < this.size; j++) {
        const cellData = grids[j][i];
        if (cellData) {
          arr.push(cellData);
        }
        grids[j][i] = null;
      }
      console.log('right', arr);
      let right = arr.length - 1;
      let left = right - 1;
      while (left >= 0) {
        if (arr[left].value === arr[right].value) {
          arr[right].value = arr[right].value * 2;
          arr[left] = null;
          left--;
          right = left;
          left--;
        } else {
          left--;
          right--;
        }
      }
      console.log('right-Arr', arr);
      arr = arr.filter(arr => arr);
      let gridRight = this.size - 1;
      let arrRight = arr.length - 1;
      while (gridRight >= 0 && arrRight >=0) {
        grids[gridRight][i] = arr[arrRight];
        gridRight--;
        arrRight--;
      }
    }
    return grids;
  }

  moveLeft(grids: any [] []) {
    console.log('left', grids)
    for (let i = 0; i < this.size; i++) {
      let arr = [];
      for (let j = 0; j < this.size; j++) {
        const cellData = grids[i][j];
        if (cellData) {
          arr.push(cellData);
        }
        grids[i][j] = null;
      }
      console.log('left', arr);
      if (arr.length === 0) continue;
      let left = 0;
      let right = left + 1;
      while (right < arr.length) {
        if (arr[left].value === arr[right].value) {
          arr[left].value = arr[left].value * 2;
          arr[right] = null;
          right++;
          left = right;
          right++;
        } else {
          left++;
          right++;
        }
      }
      arr = arr.filter(arr => arr);
      console.log('left-Arr', arr);
      for (let m = 0; m < arr.length; m++) {
        grids[i][m] = arr[m];
      }
    }
    return grids;
  }

  availableEmptyGird() {
    const emptyGridArr = [];
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const cellData = this.gridCells[i][j];
        !cellData && emptyGridArr.push({ pointX: i, pointY: j, value: null });
      }
    }
    return emptyGridArr;
  }

  addRandowGrid() {
    const emptyGridArr = this.availableEmptyGird();
    if (!emptyGridArr.length) return;
    const randomIndex = Math.floor(Math.random() * emptyGridArr.length);
    const { pointX, pointY } = emptyGridArr[randomIndex];
    const randomValue = this.createRandomValue();
    const grid = new Grid(pointX, pointY, randomValue);
    this.gridCells[pointX][pointY] = grid;
    emptyGridArr.splice(randomIndex, 1);
    console.log('cellList', this.gridCells);
  }

  createRandomValue() {
    return Math.random() > 0.8 ? 4 : 2;
  }
}

module.exports = GameManage;