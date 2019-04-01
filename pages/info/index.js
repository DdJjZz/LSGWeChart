// pages/info/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid:'UID0000001',
    text_size: '20px',
    head_size: '40px',
    icon_size: '43px',
    margin_left: '70px',
    padding_top: '5px',
    driver: "none",
    staff: "none",
    user_type: "2",
    companyList: ["公司一", "公司二", "公司三", "公司四", "公司五", "公司六", "公司七", "公司八", "公司九", "公司十", "公司十一"],
    companyValue: 0,

    companyList: ["公司一", "公司二", "公司三", "公司四", "公司五", "公司六", "公司七", "公司八", "公司九", "公司十", "公司十一"],
    companyValue: 0,

    headstock: '',
    trailer: '',
    license: '',
    name: '',
    company: '',
    iDcard: '',
    // idPositive: 'http://127.0.0.1/pic/1234.png',
    idPositive: '',
    idOtherSide: '',
    headPortrait: '',
    picModalShow:false,
    resultModalShow:false,
    picType:'headstock',
    picSrc:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (this.data.user_type == "1") {
      this.setData({
        driver: "block",
        staff: "none"
      });
    } else {
      this.setData({
        staff: "block",
        driver: "none",
      })
    }
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

  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.dataset.src, // 当前显示图片的http链接
      urls: [e.currentTarget.dataset.src] // 需要预览的图片http链接列表
    })
  },

  bindCompanyChange(e){
    var value=e.detail.value;
    this.setData({
      company:this.data.companyList[value]
    });
  },

  picModalShow(e){
    this.setData({
      picType:e.currentTarget.dataset.type,
      picModalShow:true,
    });
  }
})