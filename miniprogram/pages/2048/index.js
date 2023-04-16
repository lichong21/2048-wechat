const gameManage = require('./GameManage');

// pages/2048/index.ts
const Direction = {
  Up: 'up',
  Right: 'right',
  Down: 'down',
  Left: 'left',
  Unknow: 'unknow'
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    forwardDirection: Direction.Unknow,
    gridCells: [],
    gameManage: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    wx.showToast({
      title: '2048启动了'
    });
    this.startGame();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    // wx.showToast({
    //   title: '2048启动了'
    // });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // wx.showToast({
    //   title: '2048启动完成了'
    // });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    wx.stopPullDownRefresh();
    console.log('下拉刷新');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    wx.showToast({
      title: '到达底部了，亲',
      icon: 'error',
      duration: 2000,
      mask: true
    });   
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  startGame() {
    this.gameManage = new gameManage(4);
    const gridCells = this.gameManage.initGame();
    this.setData({
      gridCells
    });
  },
  restartGame() {
    wx.showToast({
      title: '重新开始游戏'
    });
    this.startGame();
  },
  goBackStep() {
    wx.showToast({
      title: '回退一步'
    })
  },
  touchStart(e) {
    // console.log('开始移动', e);
    const { clientX, clientY } = e.changedTouches[0];
    // console.log(clientX, clientY);
    this.setData({
      startX: clientX,
      startY: clientY
    })
  },
  touchEnd(e) {
    // console.log('结束移动', e)
    const { clientX, clientY } = e.changedTouches[0];
    // console.log(clientX, clientY);
    this.setData({
      endX: clientX,
      endY: clientY
    });
    const direction = this.calcForwardDirection();
    const gridCells = this.gameManage.moveGrids(direction);
    this.gameManage.addRandowGrid();
    this.setData({
      gridCells
    });
    
  },
  calcForwardDirection() {
    const {
      startX,
      startY,
      endX,
      endY
    } = this.data || {};
    const gapX = endX - startX;
    const gapY = endY - startY;
    const gapRate = gapX / gapY;
    let forwardDirection = Direction.Unknow;
    if (gapRate > 1) {
      forwardDirection = gapX > 0 ? Direction.Right : Direction.Left;
    } else {
      forwardDirection = gapY > 0 ? Direction.Down : Direction.Up;
    }
    wx.showToast({
      title: forwardDirection
    })
    return forwardDirection;
    // this.setData({
    //   forwardDirection
    // });
    // console.log(`移动方向是:${this.data.forwardDirection}`)
  }
})