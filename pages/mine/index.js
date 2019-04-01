// pages/mine/index.js
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
    value1: '12131321321',
    modal_height: '500px',
    modal_width: '200px',
    foot_size: '60px',
    foot_height: "50px",
    portrait_height: "65px",
    current: 'mine',
    personal: true,
    mounth: false,
    year: false,
    userid: "UID0000001",
    userType: '1',
    length: 1,
    picType: 'head',
    portrait_src: 'http://127.0.0.1/pic/1234.png',
    companyList: ["公司一", "公司二", "公司三", "公司四", "公司五", "公司六", "公司七", "公司八", "公司九", "公司十"],
    companyValue: 0,

    headstockList: ["沪A123456", "沪A234567", "沪A345678", "沪A456789", "沪A567891", "沪A678912", "沪A789123", "沪A891234"],
    headstockValue: 0,

    trailerList: ["沪A12345挂", "沪A23456挂", "沪A34567挂", "沪A45678挂", "沪A56789挂", "沪A67891挂", "沪A78912挂", "沪A89123挂"],
    trailerValue: 0,

    notCompanyList: ["公司十一", "公司十二", "公司十三", "公司十四", "公司十五", "公司十六", "公司十七", "公司十八", "公司十九", "公司二十"],
    notCompanyValue: 0,

    picModalShow: false,
    resultModalShow: false,

    picSrc: '',

    actionsPicResult: [{
        name: '确定',
        color: '#19be6b'
      },
      {
        name: '取消'
      }
    ],

    licensePlate: "",

    modal_title: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      userid: options.userid,
      userType: options.usertype,
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
          modal_width: winWidth * 0.9 + 'px',
          modal_height: winHeight * 0.7 + 'px',
          foot_height: winHeight * 0.08 + 'px',
          portrait_height: winHeight * 0.08 + 5 + 'px',
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
    var key = detail.key
    switch (key) {
      case "document":
        if (this.data.userType == '1') {
          wx.redirectTo({
            url: '../task/index',
          })
        } else {
          wx.redirectTo({
            url: '../rele_task/index',
          })
        }
        break;
      case "prompt_1":
        wx.showToast({
          title: "界面开发中",
          icon: 'none',
          duration: 2000
        });
        break;
      case "prompt_2":
        wx.showToast({
          title: "界面开发中",
          icon: 'none',
          duration: 2000
        });
        break;
      case "mine":
        wx.redirectTo({
          url: '../mine/index',
        })
        break;
      default:
        break;
    }
    this.setData({
      current: detail.key
    });
  },

  kindToggle(e) {
    var id = e.currentTarget.id;
    switch (id) {
      case "personal":
        this.setData({
          personal: !this.data.personal
        });
        break;
      case "mounth":
        this.setData({
          mounth: !this.data.mounth
        });
        break;
      case "year":
        this.setData({
          year: !this.data.year
        });
        break;
      default:
        break;

    }
    // this.setData({
    //   personal: !this.data.personal
    // });
  },

  bindCompanyChange(e) {
    var value = e.detail.value;
    this.setData({
      companyValue: value
    });
  },
  bindHeadstockChange(e) {
    var value = e.detail.value;
    this.setData({
      headstockValue: value
    });
  },
  bindTrailerChange(e) {
    var value = e.detail.value;
    this.setData({
      trailerValue: value
    });
  },
  bindNotCompanyChange(e) {
    var companyList = this.data.companyList
    var notCompanyList = this.data.notCompanyList
    var value = e.detail.value;
    this.onLoad;
    companyList.push(this.data.notCompanyList[value]);
    notCompanyList.splice(value, 1)
    this.setData({
      companyList: companyList,
      notCompanyList: notCompanyList
    });
    // console.log(this.data.notCompanyList);
    // console.log(this.data.companyList)
  },

  newCarInfo(e) {
    var type = e.currentTarget.dataset.type
    if (type == 'head') {
      this.setData({
        modal_title: '车牌行驶证添加',
        picModalShow: true,
        picType: type,
        length: this.data.length + 1
      });
    } else {
      this.setData({
        modal_title: '挂车行驶证添加',
        picModalShow: true,
        picType: type,
        length: this.data.length + 1
      });
    }
  },



  chooseImage() {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        wx.showLoading({
          title: '文件上传中',
        });
        wx.uploadFile({
          url: 'http://127.0.0.1/upload/xcxUploadFile.php',
          // url: 'http://47.101.139.189/DJZTest/xcxUploadFile.php',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'action': 'newCar',
            'userid': that.data.userid,
            'type': that.data.picType,
            'length': that.data.length,
          },
          success(res) {
            console.log(res)
            wx.hideLoading();
            var resData = JSON.parse(res.data);
            if (resData.status === "true") {
              if (resData.type === 'head') {
                that.setData({
                  picSrc: "http://127.0.0.1/upload/CAR/" + that.data.userid + "/" + resData.path
                  // picLoadSrc: "http://47.101.139.189/DJZTest/" + that.data.taskId + "/" + resData.path,
                  // picSrc: "http://47.101.139.189/DJZTest/" + that.data.taskId + "/" + resData.path
                });
              } else {
                that.setData({
                  picSrc: "http://127.0.0.1/upload/" + that.data.userid + "/" + resData.path
                  // picUnloadSrc: "http://47.101.139.189/DJZTest/" + that.data.taskId + "/" + resData.path,
                  // picSrc: "http://47.101.139.189/DJZTest/" + that.data.taskId + "/" + resData.path
                });
              }
              that.poundPictureRecDistinguish("http://127.0.0.1/upload/" + that.data.taskId + "/" + resData.path, resData.type);
            } else {
              wx.showToast({
                title: resData.message,
                icon: 'none',
                duration: 1000
              });
            }
          },
          fail() {
            wx.hideLoading();
            wx.showToast({
              title: '请重试',
              icon: 'none',
              duration: 2000
            })
          }
        })
      }
    })
  },

  poundPictureRecDistinguish(filePath, type) {
    var that = this
    wx.showLoading({
      title: '信息识别中',
    })

    setTimeout(function() {
      wx.hideLoading()
    }, 2000)

    setTimeout(function() {
      that.setData({
        resultModalShow: true,
        picPound: "15",
      })
    }, 2000)
  },

  picPlateChange(e) {
    this.setData({
      licensePlate: e.detail.value,
    })
  },

  picResultModalClose(e) {
    var index = e.detail.index;
    if (index == 0) {
      this.setData({
        resultModalShow: false,
      });
    } else {
      this.setData({
        resultModalShow: false,
        licensePlate: ""
      });
    }

  },

  picModalClose(e) {
    var index = e.detail.index;
    if (index == 0) {
      var type = this.data.picType;
      if (type == "head") {
        var headstockList = this.data.headstockList;
        headstockList.push(this.data.licensePlate)
        this.setData({
          picSrc: '',
          picModalShow: false,
          headstockList: headstockList
        });
      } else {
        var trailerList = this.data.trailerList;
        trailerList.push(this.data.licensePlate)
        this.setData({
          picSrc: '',
          picModalShow: false,
          trailerList: trailerList
        });
      }
    } else {
      this.setData({
        picModalShow: false,
        licensePlate: ""
      });
    }
  },

  showResultPictureModal() {
    this.setData({
      resultModalShow: true
    });
  },

  previewImage: function(e) {
    wx.previewImage({
      current: e.currentTarget.src, // 当前显示图片的http链接
      urls: [this.data.picSrc] // 需要预览的图片http链接列表
    })
  },
})