// pages/list_task/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text_size: '20px',
    head_size: '40px',
    icon_size: '43px',
    margin_left: '70px',
    padding_top: '5px',
    modal_height: '500px',
    modal_width: '200px',
    foot_height: "50px",
    height_size: "60px",
    current: 'document',
    taskId: '123456',
    drawerPage: false,
    startDate: '2019-03-01',
    endDate: '2019-03-01',


    taskList: [
      {
      taskId: "T2019033100001",
      start: '上海XXXXX',
      end: '北京XXXXX',
      type: '固体磷石膏',
      date: '2019-03-05'
      }, 
      {
        taskId: "T2019033100002",
        start: '上海XXXXX',
        end: '北京XXXXX',
        type: '固体磷石膏',
        date: '2019-03-05'
      }, 
      {
        taskId: "T2019033100003",
        start: '上海XXXXX',
        end: '北京XXXXX',
        type: '固体磷石膏',
        date: '2019-03-05'
      }, 
      {
        taskId: "T2019033100004",
        start: '上海XXXXX',
        end: '北京XXXXX',
        type: '固体磷石膏',
        date: '2019-03-05'
      }, 
      {
        taskId: "T2019033100005",
        start: '上海XXXXX',
        end: '北京XXXXX',
        type: '固体磷石膏',
        date: '2019-03-05'
      }, 
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that = this;
    wx.getSystemInfo({
      success(res) {
        var winHeight = res.windowHeight;
        var winWidth = res.windowWidth;
        that.setData({
          head_size: winHeight * 0.08 + 'px',
          icon_size: winWidth * 0.14 + 'px',
          text_size: winWidth * 0.07 + 'px',
          margin_left: winWidth * 0.24 + 'px',
          padding_top: winHeight * 0.01 + 'px',
          modal_width: winWidth * 0.9 + 'px',
          modal_height: winHeight * 0.7 + 'px',
          foot_height: winHeight * 0.08 + 'px',
          height_size: winHeight * 0.08 + 24 + 'px',
        });
      },
      fail() {
        console.log("Get telephone info fail");
      }
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  handleChange({
    detail
  }) {
    this.setData({
      current: detail.key,
      drawerPage: false
    });
  },

  drawerPageRight() {
    this.setData({
      drawerPage: !this.data.drawerPage
    });
  },

  startDateChange(e) {
    this.setData({
      startDate: e.detail.value,
    });
  },

  endDateChange(e) {
    this.setData({
      endDate: e.detail.value,
    });
  },

  getTaskList() {
    this.setData({
      drawerPage: !this.data.drawerPage
    });
    console.log(this.data.startDate);
    console.log(this.data.endDate)
  },

  taskDetail(e){
    // console.log(e.currentTarget.dataset.taskid)
    wx.navigateTo({
      url: '../detail_task/index?taskid=' + e.currentTarget.dataset.taskid
    })
  }
})