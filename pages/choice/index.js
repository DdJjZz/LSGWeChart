// pages/choice/index.js

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
    body:'none'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var callBack=this.userCallbackInfoCheck;

    wx.getLocation({
      success: function (res) {
        var longitude = res.longitude;
        var latitude = res.latitude;
        util.userData.longitude = longitude;
        util.userData.latitude = latitude;
      },
    });

    wx.login({
      timeout: 10000,
      success(res) {
        if (res.code) {
          wx.request({
            url: util.userData.requestUrl,
            data: {
              action:'ChekOpenid',
              code:res.code
            },
            method: "POST",
            head: {
              'content-type': 'application/json' // 默认值
            },
            success({data}) {
              callBack(data)
            },
            fail() {
              that.setData({
                body: 'block'
              });
              that.show("请检查网络信息")
            }
          });
        }
      },
      fail() {
        that.setData({
          body: 'block'
        });
        that.show("请检查网络信息")
      }
    });
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

  choise(e) {
    util.userData.userType = parseInt(e.currentTarget.dataset.name);
    wx.redirectTo({
      url: '../register/index'
    });
    console.log(e.currentTarget.dataset.name);
  },

  show(msg) {
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 2000
    })
  },

  userCallbackInfoCheck(resp){
    console.log(resp)
    util.userData.singlePosition = setInterval(this.getUserLoaction, 60000);
    if(resp.status=='true'){
      util.userData.userID=resp.uid;
      util.userData.userType = resp.utype;
      util.userData.userStatus = resp.ustatus;
      util.userData.driver = resp.dtype;
      if(resp.utype==1){
        wx.redirectTo({
          url: '../task/index',
        });
      }
      else{
        wx.redirectTo({
          url: '../rele_task/index',
        })
      }
    }
    else{
      this.setData({
        body:'block'
      });
      util.userData.openid=resp.openid
      this.show(resp.message)
    }
  },

  getUserLoaction(){
    var that=this;
    wx.getLocation({
      success: function(res) {
        var longitude=res.longitude;
        var latitude = res.latitude;
        util.userData.longitude = longitude;
        util.userData.latitude = latitude;
        wx.request({
          url: util.userData.requestUrl,
          data: {
            action: 'UploadUserLoaction',
            body:{
              userid: util.userData.userID,
              userStatus:util.userData.userStatus,
              longitude: util.userData.longitude,
              latitude: util.userData.latitude,
            },
            type:'update'
          },
          method: "POST",
          head: {
            'content-type': 'application/json' // 默认值
          },
          success({ data }) {
            if(data.status=='true'){
              util.userData.userStatus = data.userStatus
            }
            else{
              that.show("用户信息获取失败")
            }
            console.log(data)
          },
          fail() {
            that.setData({
              body: 'block'
            });
            that.show("请检查网络信息")
          }
        })
      },
    });
    console.log(util.userData.longitude);
    console.log(util.userData.latitude);
  }
})