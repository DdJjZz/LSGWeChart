// pages/detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // messageSrc: 'http://127.0.0.1/message.php', //本地访问
    messageSrc: 'https://ngrok2.hkrob.com/message.php', //小慧Test
    messageTitle:'',
    messageBody: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (!(options['title'])) {
      wx.redirectTo({
        url: '../entry/index'
      });
      that.show("参数错误")
    }
    else{
      wx.request({
        url: that.data.messageSrc,
        data: {
          action: 'GetMessageDetail',
          title: options['title'],
          type: 'query'
        },
        method: "POST",
        head: {
          'content-type': 'application/json' // 默认值
        },
        success({ data }) {
          that.setData({
            messageTitle:data.title,
            messageBody:data.detail,
          })
        },
        fail(res) {
          console.log(res)
        }
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  show(msg) {
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 2000
    })
  },
})