// pages/info/index.js
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
    driver: "none",
    staff: "none",
    user_type: "2",
    driverTypeList: ["个体司机", "集体司机"],
    driverTypeValue: 0,
    driverType: "个体司机",
    companyList: [],
    companyValue: 0,
    companyDisplay: "none",

    headstock: '', //车头信息
    trailer: '', //挂车信息
    license: '', //驾驶证信息
    operation: '', //汽车营运证号
    name: '', //识别姓名
    company: '', //公司名称
    iDcard: '', //身份证号

    headstockSrc: '', //车头行驶证照片地址
    trailerSrc: '', //挂车行驶证照片地址
    licenseSrc: '', //驾驶证照片地址
    operationSrc: '', //营运证照片地址
    idPositive: '', //身份证国徽面照地址
    idOtherSide: '', //身份证人像面照片地址
    // headPortrait: '', //头像照片地址
    picModalShow: false,
    resultModalShow: false,
    picType: '',
    picSrc: "",
    length: 0,
    modalTitle: '',
    modealName: '',

    actionsPic: [{
        name: '确定',
        color: '#19be6b'
      },
      {
        name: '重选'
      },
      {
        name: '关闭'
      }
    ],

    actionsPicResult: [{
      name: '确定',
      color: '#19be6b'
    }],

    picResult: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    util.userData.userType = options.type;
    util.userData.userID = options.uid
    if (util.userData.userType == "1") {
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
    this.getCompanyList(options.uid)
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

  getCompanyList(uid) {
    var that = this;
    wx.request({
      url: util.userData.requestUrl,
      data: {
        action: 'GetCompanyList',
        body: {
          userid: uid,
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
            companyList: data.notself[0]
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

  previewImage: function(e) {
    wx.previewImage({
      current: e.currentTarget.dataset.src, // 当前显示图片的http链接
      urls: [e.currentTarget.dataset.src] // 需要预览的图片http链接列表
    })
  },

  bindCompanyChange(e) {
    var value = e.detail.value;
    this.setData({
      company: this.data.companyList[value]
    });

  },

  bindDriverChange(e) {
    var value = e.detail.value;
    console.log(value)
    this.setData({
      driverTypeValue:value,
      driverType: this.data.driverTypeList[value]
    });
    if (value == 1) {
      this.setData({
        companyDisplay: 'block'
      });
    }
    else{
      this.setData({
        companyDisplay: 'none'
      });
    }
  },

  picModalShow(e) {
    var type = e.currentTarget.dataset.type;
    switch (type) {
      case "head":
        this.setData({
          modalTitle: "拍摄车牌行驶证",
          modealName: '车牌号',
          picSrc: this.data.headstockSrc,
          picResult: this.data.headstock
        });
        break;
      case "trailer":
        this.setData({
          modalTitle: '拍摄挂车行驶证',
          modealName: '挂车号',
          picSrc: this.data.trailerSrc,
          picResult: this.data.trailer
        });
        break;
      case "license":
        this.setData({
          modalTitle: '拍摄驾驶证照片',
          modealName: '驾驶证号',
          picSrc: this.data.licenseSrc,
          picResult: this.data.license
        });
        break;
      case "operation":
        this.setData({
          modalTitle: '拍摄营运证照片',
          modealName: '营运证号',
          picSrc: this.data.operationSrc,
          picResult: this.data.operation
        });
        break;
      default:
        break;
    }
    this.setData({
      picType: type,
      driver:"none",
      staff:"none",
      picModalShow: true,
    });
  },


  chooseImage() {
    var that = this;
    switch (this.data.picType) {
      case "head": //车头信息
        var data = {
          action: 'newCar',
          userid: util.userData.userID,
          type: this.data.picType,
          length: this.data.length + 1,
        }
        break;
      case "trailer": //挂车信息
        var data = {
          action: 'newCar',
          userid: util.userData.userID,
          type: this.data.picType,
          length: this.data.length + 1,
        }
        break;
      case "license": //驾驶证信息
        var data = {
          action: 'newLicense',
          userid: util.userData.userID,
          type: this.data.picType,
        }
        break;
      case "operation": //营运证信息
        var data = {
          action: 'newOperation',
          userid: util.userData.userID,
          type: this.data.picType,
        }
        break;
      case "idPositive": //身份证国徽面
        var data = {
          action: 'newIdCard',
          userid: util.userData.userID,
          type: this.data.picType,
        }
        break;
      case "idOtherSide": //身份证人像面
        var data = {
          action: 'newIdCard',
          userid: util.userData.userID,
          type: this.data.picType,
        }
        break;
      default: //错误信息
        wx.redirectTo({
          url: '../choice/index',
        })
        clearTimeout(util.userData.singlePosition)
        this.show("页面出现错误")
        break;
    }
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
          url: util.userData.uploadFile,
          // url: 'http://47.101.139.189/DJZTest/xcxUploadFile.php',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: data,
          success(res) {
            console.log(res)
            wx.hideLoading();
            var resData = JSON.parse(res.data);
            if (resData.status === "true") {
              switch (resData.type) {
                case "head": //车头
                  that.setData({
                    headstockSrc: util.userData.filePath + "/CAR/" + util.userData.userID + "/" + resData.path,
                    picSrc: util.userData.filePath + "/CAR/" + util.userData.userID + "/" + resData.path,
                  });
                  that.poundPictureRecDistinguish(util.userData.filePath + "/CAR/" + util.userData.userID + "/" + resData.path, resData.type);
                  break;
                case "trailer": //挂车
                  that.setData({
                    trailerSrc: util.userData.filePath + "/CAR/" + util.userData.userID + "/" + resData.path,
                    picSrc: util.userData.filePath + "/CAR/" + util.userData.userID + "/" + resData.path,
                  });
                  that.poundPictureRecDistinguish(util.userData.filePath + "/CAR/" + util.userData.userID + "/" + resData.path, resData.type);
                  break;
                case "license": //行驶证
                  that.setData({
                    licenseSrc: util.userData.filePath + "/LICENSE/" + util.userData.userID + "/" + resData.path,
                    picSrc: util.userData.filePath + "/LICENSE/" + util.userData.userID + "/" + resData.path,
                  });
                  that.poundPictureRecDistinguish(util.userData.filePath + "/LICENSE/" + util.userData.userID + "/" + resData.path, resData.type);
                  break;
                case "operation": //营运证
                  that.setData({
                    operationSrc: util.userData.filePath + "/OPERATION/" + util.userData.userID + "/" + resData.path,
                    picSrc: util.userData.filePath + "/OPERATION/" + util.userData.userID + "/" + resData.path,
                  });
                  that.poundPictureRecDistinguish(util.userData.filePath + "/OPERATION/" + util.userData.userID + "/" + resData.path, resData.type);
                  break;
                case "idPositive": //身份证国徽面
                  that.setData({
                    idPositive: util.userData.filePath + "/ID/" + util.userData.userID + "/" + resData.path,
                  });
                  that.poundPictureRecDistinguish(util.userData.filePath + "/ID/" + util.userData.userID + "/" + resData.path, resData.type);
                  break;
                case "idOtherSide": //身份证人像面
                  that.setData({
                    idOtherSide: util.userData.filePath + "/ID/" + util.userData.userID + "/" + resData.path,
                  });
                  that.poundPictureRecDistinguish(util.userData.filePath + "/ID/" + util.userData.userID + "/" + resData.path, resData.type);
                  break;
                default:
                  wx.redirectTo({
                    url: '../choice/index',
                  })
                  clearTimeout(util.userData.singlePosition)
                  this.show("页面出现错误")
                  break;
              }

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

  chooseImage_idCard(e) {
    var type = e.currentTarget.dataset.type;
    var that = this;
    switch (type) {
      case "idPositive": //身份证国徽面
        var data = {
          action: 'newIdCard',
          userid: util.userData.userID,
          type: "idPositive",
        }
        break;
      case "idOtherSide": //身份证国徽面
        var data = {
          action: 'newIdCard',
          userid: util.userData.userID,
          type: "idOtherSide",
        }
        break;
      default:
        wx.redirectTo({
          url: '../choice/index',
        })
        clearTimeout(util.userData.singlePosition)
        this.show("页面出现错误")
        break;
    }
    console.log(type)
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
          url: util.userData.uploadFile,
          // url: 'http://47.101.139.189/DJZTest/xcxUploadFile.php',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: data,
          success(res) {
            console.log(res.data)
            wx.hideLoading();
            var resData = JSON.parse(res.data);
            if (resData.status === "true") {
              switch (resData.type) {
                case "idPositive": //身份证国徽面
                  that.setData({
                    idPositive: util.userData.filePath + "/ID/" + util.userData.userID + "/" + resData.path,
                  });
                  that.poundPictureRecDistinguish(util.userData.filePath + "/ID/" + util.userData.userID + "/" + resData.path, resData.type);
                  break;
                case "idOtherSide": //身份证人像面
                  that.setData({
                    idOtherSide: util.userData.filePath + "/ID/" + util.userData.userID + "/" + resData.path,
                  });
                  that.poundPictureRecDistinguish(util.userData.filePath + "/ID/" + util.userData.userID + "/" + resData.path, resData.type);
                  break;
                default:
                  wx.redirectTo({
                    url: '../choice/index',
                  })
                  clearTimeout(util.userData.singlePosition)
                  this.show("页面出现错误")
                  break;
              }
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
    });
  },

  poundPictureRecDistinguish(src, type) {
    var that = this;
    wx.showLoading({
      title: '信息识别中',
    })
    wx.request({
      url: util.userData.requestUrl,
      data: {
        action: 'PicRecognition',
        body: {
          type: type,
          picSrc: src
        },
        type: 'query',
      },
      method: "POST",
      head: {
        'content-type': 'application/json' // 默认值
      },
      success({
        data
      }) {
        wx.hideLoading();
        console.log(data)
        if (data.status == 'true') {
          console.log(data)
          that.pictureResultValue(data);
        } else {
          that.show("信息上传失败！")
        }
      },
      fail() {
        that.show("请检查网络信息")
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

  showResultPictureModal() {
    this.setData({
      picModalShow:false,
      resultModalShow: true,
    });
  },

  pictureResultValue(data) {
    switch (data.type) {
      case "head":
        this.setData({
          resultModalShow: true,
          picResult: data.value
        });
        break;
      case "trailer":
        this.setData({
          resultModalShow: true,
          picResult: data.value
        });
        break;
      case "license":
        this.setData({
          resultModalShow: true,
          picResult: data.value
        });
        break;
      case "operation":
        this.setData({
          resultModalShow: true,
          picResult: data.value
        });
        break;
      case "idPositive":
        break;
      case "idOtherSide":
        this.setData({
          name: data.name,
          iDcard: data.code
        });
        break;
      default:
        break;
    }
  },

  picResultModalClose() {
    this.setData({
      picModalShow:true,
      resultModalShow: false
    });
  },

  picModalClose(e) {
    console.log(e)
    var index = e.detail.index;
    if (index == 0) {
      if (util.userData.userType == "1") {
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
      switch (this.data.picType) {
        case "head":
          this.setData({
            headstock: this.data.picResult,
            picModalShow: !this.data.picModalShow,
          })
          break;
        case "trailer":
          this.setData({
            trailer: this.data.picResult,
            picModalShow: !this.data.picModalShow,
          })
          break;
        case "license":
          this.setData({
            license: this.data.picResult,
            picModalShow: !this.data.picModalShow,
          })
          break;
        case "operation":
          this.setData({
            operation: this.data.picResult,
            picModalShow: !this.data.picModalShow,
          })
          break;
        default:
          break;
      }
    } else if (index == 1) {
      
      this.setData({
        picSrc: "",
        picResult: '',
      })
      switch (this.data.picType) {
        case "head":
          this.setData({
            headstockSrc: ''
          })
          break;
        case "trailer":
          this.setData({
            trailerSrc: ''
          })
          break;
        case "license":
          this.setData({
            licenseSrc: ''
          })
          break;
        case "operation":
          this.setData({
            operationSrc: ''
          })
          break;
        default:
          break;
      }
    } else {
      if (util.userData.userType == "1") {
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
      this.setData({
        picSrc: "",
        picResult: '',
        picModalShow: !this.data.picModalShow
      })
    }
  },

  picResultChange(e) {
    var value = e.detail.value;
    console.log(e)
    this.setData({
      picResult: value
    });
  },

  inputNameChange(e) {
    var value = e.detail.detail.value
    this.setData({
      name: value,
    })
  },

  inputCodeChange(e) {
    var value = e.detail.detail.value
    this.setData({
      iDcard: value,
    })
  },

  // pictureInfoSubmit(){
  //   var that=this;
  //   wx.request({
  //     url: util.userData.requestUrl,
  //     data: {
  //       action: 'PicInfoSub',
  //       body: {
  //         uid:util.userData.userID,
  //         type: that.data.picType,
  //         picSrc: that.data.picSrc,
  //         value:that.data.picResult
  //       },
  //       type: 'query',
  //     },
  //     method: "POST",
  //     head: {
  //       'content-type': 'application/json' // 默认值
  //     },
  //     success({
  //       data
  //     }) {
  //       console.log(data)
  //       if (data.status == 'true') {
  //         console.log(data)
  //       } else {
  //         that.show("信息上传失败！")
  //       }
  //     },
  //     fail() {
  //       that.show("请检查网络信息")
  //     }
  //   })
  // },

  driverInfoSubmit() {
    var that = this;
    console.log(this.data.driverTypeValue)
    if (this.data.driverType != "个体司机" && this.data.company == "") {
        this.show('请选择所属公司')
    } else if (this.data.headstockSrc == "") {
      this.show('请上传车牌行驶证照片')
    } else if (this.data.headstock == "") {
      this.show('请输入车牌号')
    } else if (this.data.trailerSrc == "") {
      this.show('请上传挂车行驶证照片')
    } else if (this.data.trailer == "") {
      this.show('请输入挂车号')
    } else if (this.data.licenseSrc == "") {
      this.show('请上传驾驶证照片')
    } else if (this.data.license == "") {
      this.show('请输入驾驶证号')
    } else if (this.data.operationSrc == "") {
      this.show('请上传营运证照片')
    } else if (this.data.operation == "") {
      this.show('请输入营运证号')
    } else if (this.data.idPositive == "") {
      this.show('请上传身份证国徽面照片')
    } else if (this.data.idOtherSide == "") {
      this.show('请上传身份证人像面照片')
    } else if (this.data.name == "") {
      this.show('请输入姓名')
    } else if (this.data.iDcard == "") {
      this.show('请输入身份证号')
    } else {
      wx.request({
        url: util.userData.requestUrl,
        data: {
          action: 'DriverSubmit',
          body: {
            uid: util.userData.userID,
            driverTypeValue: that.data.driverTypeValue,
            headstock: that.data.headstock,
            trailer: that.data.trailer,
            license: that.data.license,
            operation: that.data.operation,
            name: that.data.name,
            company: that.data.company,
            iDcard: that.data.iDcard,
            headstockSrc: that.data.headstockSrc,
            trailerSrc: that.data.trailerSrc,
            licenseSrc: that.data.licenseSrc,
            operationSrc: that.data.operationSrc,
            idPositive: that.data.idPositive,
            idOtherSide: that.data.idOtherSide,
          },
          type: 'update',
        },
        method: "POST",
        head: {
          'content-type': 'application/json' // 默认值
        },
        success({
          data
        }) {
          console.log(data)
          if (data.status == 'true') {
            that.show("信息已完善，请关闭重新登录")
          } else {
            that.show("信息上传失败！")
          }
        },
        fail() {
          that.show("请检查网络信息")
        }
      })
    }
  },

  manageInfoSubmit() {
    var that = this;
    if (this.data.company == "") {
      this.show('请选择所属公司')
    } else if (this.data.idPositive == "") {
      this.show('请上传身份证国徽面照片')
    } else if (this.data.idOtherSide == "") {
      this.show('请上传身份证人像面照片')
    } else if (this.data.name == "") {
      this.show('请输入姓名')
    } else if (this.data.iDcard == "") {
      this.show('请输入身份证号')
    } else {
      wx.request({
        url: util.userData.requestUrl,
        data: {
          action: 'ManageSubmit',
          body: {
            uid: util.userData.userID,
            name: that.data.name,
            company: that.data.company,
            iDcard: that.data.iDcard,
            idPositive: that.data.idPositive,
            idOtherSide: that.data.idOtherSide,
          },
          type: 'update',
        },
        method: "POST",
        head: {
          'content-type': 'application/json' // 默认值
        },
        success({
          data
        }) {
          console.log(data)
          if (data.status == 'true') {
            that.show("信息已完善，请退出重新登录")
          } else {
            that.show("信息上传失败！")
          }
        },
        fail() {
          that.show("请检查网络信息")
        }
      })
    }
  },

  headStockChange(e){
    var value=e.detail.detail.value
    this.setData({
      headstock:value
    })
  },

  trailerChange(e) {
    var value = e.detail.detail.value
    this.setData({
      trailer: value
    })
  },

  licenseChange(e) {
    var value = e.detail.detail.value
    this.setData({
      license: value
    })
  },

  operationChange(e) {
    var value = e.detail.detail.value
    this.setData({
      operation: value
    })
  },
})