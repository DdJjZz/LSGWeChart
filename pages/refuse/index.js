// pages/refuse/index.js
// pages/rele_task/index.js
const util = require('../../utils/util.js')
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
    name: 'name1',
    refuseList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAllRefuseTaskList()
    console.log(util.formatTime(new Date()))
    console.log(util.userData.userID)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
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
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  getAllRefuseTaskList(){
    var that = this;
    wx.request({
      url: util.userData.requestUrl,
      data: {
        action: 'GetRefuseList',
        body: {
          uid: util.userData.userID,
        },
        type: 'query'
      },
      method: "POST",
      head: {
        'content-type': 'application/json' // 默认值
      },
      success({data}) {
        console.log(data);
        if (data.status == 'true') {
          that.setData({
            refuseList: data.refuseList,
          })
        } else {
          that.show("部分信息获取失败，请检查状态");
        }
      },
      fail() {
        that.show("网络请求失败")
      }
    })
  },

  show(msg) {
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 2000
    })
  },
})