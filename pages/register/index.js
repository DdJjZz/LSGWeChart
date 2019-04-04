// pages/register/index.js
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
    user_type: "",
    top: "100px",
    telephone: "",
    code: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    if(!(options['type'])){
      wx.redirectTo({
        url: '../choice/index'
      });
      this.show("参数错误")
    }
    else{
      util.userData.userType = options['type']
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
          top: winHeight * 0.2 + 'px'
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

  registerButtonClick() {
    var that=this;
    console.log(this.data.telephone)
    console.log(this.data.code)
    if (this.data.telephone == "") {
      this.show("手机号不可为空");
    }
    // if (this.data.code == "") {
    //   wx.showToast({
    //     title: '验证码不可为空',
    //     icon: 'none',
    //     duration: 2000
    //   });
    // }
    // if ((this.data.code != "") && (this.data.telephone != "")) {
    //   wx.navigateTo({
    //     url: '../info/index',
    //   })
    // }

    if (this.data.telephone != "") {

      wx.request({
        url: util.userData.requestUrl,
        data: {
          action: 'TelphoneRegi',
          body: {
            openid:util.userData.openid,
            telphone: that.data.telephone,
            utype: util.userData.userType,
            longitude:util.userData.longitude,
            latitude:util.userData.latitude
          },
          type: 'insert'
        },
        method: "POST",
        head: {
          'content-type': 'application/json' // 默认值
        },
        success({data}) {
          console.log(data)
          if (data.status == 'true') {
            wx.redirectTo({
              url: '../info/index?type='+data.utype+"&uid="+data.uid,
            });
          } else {
            clearTimeout(util.userData.singlePosition);
            wx.redirectTo({
              url: '../choice/index',
            });
            that.show("网络请求失败");
          }
        },
        fail() {
          clearTimeout(util.userData.singlePosition);
          wx.redirectTo({
            url: '../choice/index',
          });
          that.show("网络请求失败");
        }
      })
    }
  },

  telephoneChange(e) {
    console.log(e.detail.value)
    this.setData({
      telephone: e.detail.value,
    })
  },

  // verificationCodeChange(e) {
  //   console.log(e.detail.value)
  //   this.setData({
  //     code: e.detail.value,
  //   })
  // }

  show(msg){
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 2000
    });
  }
})