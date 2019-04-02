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
    companyList: [],
    companyValue: 0,

    headstockList: [],
    headstockValue: 0,

    trailerList: [],
    trailerValue: 0,

    notCompanyList: [],
    notCompanyValue: 0,

    picModalShow: false,
    resultModalShow: false,

    picSrc: '',

    uname:"",
    utelphone: "",
    mPound: "",
    mWages: "",
    yPound: "",
    yWages: "",

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
    this.getUserInfo();
    this.getCompanyList();
    this.getCarList();
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

  handleChange({detail}) {
    var key = detail.key
    switch (key) {
      case "document":
        if (util.userData.userType == '1') {
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
    var value = e.detail.value;
    var that = this;
    wx.request({
      url: util.userData.requestUrl,
      data: {
        action: 'BindingCompany',
        body: {
          userid: util.userData.userID,
          cname:this.data.notCompanyList[value]
        },
        type: 'query'
      },
      method: "POST",
      head: {
        'content-type': 'application/json' // 默认值
      },
      success({
        data
      }) {
        console.log(data);
        if (data.status == 'true') {
          that.getCompanyList();
        } else {
          that.show(data.msg);
        }
      },
      fail() {
        that.show("网络请求失败")
      }
    });
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
            'length': that.data.length+1,
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
                  picSrc: "http://127.0.0.1/upload/CAR/" + that.data.userid + "/" + resData.path
                  // picUnloadSrc: "http://47.101.139.189/DJZTest/" + that.data.taskId + "/" + resData.path,
                  // picSrc: "http://47.101.139.189/DJZTest/" + that.data.taskId + "/" + resData.path
                });
              }
              that.poundPictureRecDistinguish("http://127.0.0.1/upload/CAR/" + that.data.userid + "/" + resData.path, resData.type);
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

    wx.request({
      url: util.userData.requestUrl,
      data: {
        action: 'LicenseDistinguish',
        body: {
          filePath: filePath,
        },
        type: 'query'
      },
      method: "POST",
      head: {
        'content-type': 'application/json' // 默认值
      },
      success({
        data
      }) {
        console.log(data);
        if (data.status == 'true') {
          wx.hideLoading()
          that.setData({
            resultModalShow: true,
            licensePlate: data.plate,
          })
        } else {
          wx.hideLoading()
          that.show(data.msg);
        }
      },
      fail() {
        wx.hideLoading()
        that.show("网络请求失败")
      }
    });

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
    var that=this;
    var index = e.detail.index;
    if (index == 0) {
      var type = this.data.picType;
      // if (type == "head") {
      //   var headstockList = this.data.headstockList;
      //   headstockList.push(this.data.licensePlate)
      //   this.setData({
      //     picSrc: '',
      //     picModalShow: false,
      //     headstockList: headstockList
      //   });
      // } else {
      //   var trailerList = this.data.trailerList;
      //   trailerList.push(this.data.licensePlate)
      //   this.setData({
      //     picSrc: '',
      //     picModalShow: false,
      //     trailerList: trailerList
      //   });
      // }

      wx.request({
        url: util.userData.requestUrl,
        data: {
          action: 'BindingPlate',
          body: {
            uid:util.userData.userID,
            plate:that.data.licensePlate,
            type:type,
            filePath: that.data.picSrc,
          },
          type: 'query'
        },
        method: "POST",
        head: {
          'content-type': 'application/json' // 默认值
        },
        success({
          data
        }) {
          console.log(data);
          if (data.status == 'true') {
            that.getCarList();
            that.setData({
              picSrc: '',
              picModalShow: false,
              licensePlate:''
            })
          } else {
            that.setData({
              picSrc: '',
              picModalShow: false,
              licensePlate: ''
            })
            that.show(data.msg);
          }
        },
        fail() {
          that.setData({
            picSrc: '',
            picModalShow: false,
            licensePlate: ''
          })
          that.show("网络请求失败")
        }
      });
    } else {
      this.setData({
        picModalShow: false,
        licensePlate: "",
        picSrc: '',
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

  show(msg) {
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 2000
    })
  },

  getUserInfo(){
    var that = this;
    wx.request({
      url: util.userData.requestUrl,
      data: {
        action: 'GetUserInfo',
        body: {
          userid: util.userData.userID,
        },
        type: 'query'
      },
      method: "POST",
      head: {
        'content-type': 'application/json' // 默认值
      },
      success({
        data
      }) {
        console.log(data);
        if (data.status == 'true') {
          that.setData({
            uname: data.uname,
            utelphone: data.utelphone,
            mPound: data.mPound,
            mWages: data.mWages,
            yPound: data.yPound,
            yWages: data.yWages
          });
        } else {
          that.show(data.msg);
        }
      },
      fail() {
        that.show("网络请求失败")
      }
    });
  },

  getCompanyList(){
    var that = this;
    wx.request({
      url: util.userData.requestUrl,
      data: {
        action: 'GetCompanyList',
        body: {
          userid: util.userData.userID,
        },
        type: 'query'
      },
      method: "POST",
      head: {
        'content-type': 'application/json' // 默认值
      },
      success({
        data
      }) {
        console.log(data);
        if (data.status == 'true') {
          that.setData({
            companyList: data.self,
            notCompanyList: data.notself
          });
        } else {
          that.show(data.msg);
        }
      },
      fail() {
        that.show("网络请求失败")
      }
    });
  },

  getCarList() {
    var that = this;
    wx.request({
      url: util.userData.requestUrl,
      data: {
        action: 'GetCarList',
        body: {
          userid: util.userData.userID,
        },
        type: 'query'
      },
      method: "POST",
      head: {
        'content-type': 'application/json' // 默认值
      },
      success({
        data
      }) {
        console.log(data);
        if (data.status == 'true') {
          that.setData({
            headstockList: data.head,
            trailerList: data.trailer,
            length:data.length,
          });
        } else {
          that.show(data.msg);
        }
      },
      fail() {
        that.show("网络请求失败")
      }
    });
  },
})