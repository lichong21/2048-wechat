
class Grid {
  pointX: number;
  pointY: number;
  value: number;
  constructor(pointX: number, pointY: number, value: number) {
    this.pointX = pointX;
    this.pointY = pointY;
    this.value = value;
  }
}

module.exports = Grid;