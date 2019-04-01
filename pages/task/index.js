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
    modal_height: '500px',
    modal_width: '200px',
    foot_size: '60px',
    foot_height: "50px",
    height_size: "60px",
    current: 'document',
    current_block: 'accept',
    accept: 'none',
    accepted: 'none',
    task_list: 'none',
    accept_contract: false,
    selectDatePage: false,
    accept_actions: [{
        name: '确定',
        color: '#19be6b'
      },
      {
        name: '取消'
      }
    ],


    accepted_contract: false,
    accepted_actions: [{
      name: '关闭',
      color: '#19be6b'
    }],

    actionsPicResult: [{
        name: '确定',
        color: '#19be6b'
      },
      {
        name: '取消'
      }
    ],

    taskList: [],

    wayBillId: "",
    wayBill: [],
    wayBillAccept: [],

    oldLoadVideoFilePath: [],

    picSrc: "",
    picType: 'load',
    picLoadSrc: '',
    picUnloadSrc: '',
    picModalShow: false,
    resultModalShow: false,
    loadPound: "",
    loadDate: '',
    unloadPound: "",
    unloadDate: '',
    picPound: "",
    picDate: '',

    videosrc: '',
    videoModalShow: false,
    videoType: 'load',
    video_name: '',
    showVideo: false,
    actionsVideo: [{
      name: '关闭',
      color: '#19be6b'
    }],
    actionsVideoUpload: [{
        name: '上传',
        color: '#19be6b'
      },
      {
        name: '取消'
      }
    ],
    video_src: "",
    newVideoSrc: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.loadVideoContext = wx.createVideoContext('loadVideo');
    console.log(Date.parse(new Date()))
    this.showVideoContext = wx.createVideoContext('showVideo');
    switch (util.userData.userStatus) {
      case 1:
        this.getAcceptTaskInfo(util.userData.userID)
        break;
      case 2:
        this.getAcceptedTaskInfo(util.userData.userID)
        break;
      case 3:
        this.getUserTaskList(util.formatTime(new Date()), util.formatTime(Date.parse(new Date())-3600*24*7*1000))
        break;
      default:
        break;
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that = this;
    //根据机型调整界面的显示效果
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
          foot_height: winHeight * 0.09 + 'px',
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

  handleChange({
    detail
  }) {
    var key = detail.key
    switch (key) {
      case "document":
        wx.redirectTo({
          url: '../task/index',
        })
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

  handleChangeBlock({
    detail
  }) {
    this.setData({
      current_block: detail.key
    });
    switch (detail.key) {
      case "accept":
        if (util.userData.userStatus == 1) {
          this.getAcceptTaskInfo(util.userData.userID);
          this.setData({
            accept: "block",
            accepted: "none",
            task_list: "none"
          });
        } else {
          this.setData({
            accept: "none",
            accepted: "none",
            task_list: "none"
          });
        }
        break;
      case "accepted":
        if (util.userData.userStatus == 2) {
          this.getAcceptedTaskInfo(util.userData.userID)
          this.setData({
            accept: "none",
            accepted: "block",
            task_list: "none"
          });
        } else {
          this.setData({
            accept: "none",
            accepted: "none",
            task_list: "none"
          });
        }
        break;
      case "task_list":
        this.getUserTaskList(util.formatTime(new Date()), util.formatTime(new Date(Date.parse(new Date()) - 3600 * 24 * 7 * 1000)))
        this.setData({
          accept: "none",
          accepted: "none",
          task_list: "block"
        });
        break;
      default:
        break;
    }
  },

  getTaskDetail(e) {
    wx.navigateTo({
      url: '../detail_task/index?taskid=' + e.currentTarget.dataset.taskid
    })
  },

  userAcceptTask() {
    var that = this;
    if (util.userData.driver == 1) {
      wx.request({
        url: util.userData.requestUrl,
        data: {
          action: 'AcceptTask',
          body: {
            taskid: this.data.wayBillId,
          },
          type: 'update'
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
            that.getAcceptedTaskInfo(util.userData.userID)
          } else {
            that.setData({
              accept: "none",
              accepted: "none",
              task_list: "block",
              current_block: "task_list"
            });
            that.show("网络请求失败")
          }
        },
        fail() {
          that.setData({
            accept: "none",
            accepted: "none",
            task_list: "none",
          });
          that.show("网络请求失败")
        }
      })
    } else {
      this.setData({
        accept_contract: true
      });
    }
  },

  acceptContractClose(detail) {
    var index = detail.detail.index;
    console.log(detail);
    this.setData({
      accept_contract: false,
    });
    if (index === 0) {
      this.getAcceptedTaskInfo(util.userData.userID)
    }
  },

  userRefuseTask() {
    var that = this;
    wx.request({
      url: util.userData.requestUrl,
      data: {
        action: 'RefuseTask',
        body: {
          taskid: that.data.wayBillId
        },
        type: 'update'
      },
      method: "POST",
      head: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        var data = res.data
        if (data.status == 'true') {
          that.setData({
            accept: "none",
            accepted: "none",
            task_list: "block",
            current_block: "task_list"
          });
          that.getUserTaskList(util.formatTime(new Date()), util.formatTime(new Date(Date.parse(new Date()) - 3600 * 24 * 7 * 1000)))
        } else {
          that.show('网络请求失败')
        }
      }
    })
  },

  showSelectDatePage() {
    this.setData({
      selectDatePage: !this.data.selectDatePage
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
      selectDatePage: !this.data.selectDatePage
    });
    this.getUserTaskList(this.data.startDate, this.data.endDate)
  },

  showContractModalResp() {
    this.setData({
      accepted_contract: !this.data.accepted_contract
    });
  },

  acceptedContractClose() {
    this.setData({
      accepted_contract: !this.data.accepted_contract
    });
  },

  showPictureModal(e) {
    console.log(e)
    var type = e.currentTarget.dataset.type;
    if (type == 'load') {
      this.setData({
        picModalShow: true,
        picType: 'load',
        picSrc: this.data.picLoadSrc
      });
    } else {
      this.setData({
        picModalShow: true,
        picType: 'unload',
        picSrc: this.data.picUnloadSrc
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
            'taskId': that.data.taskId,
            'type': that.data.picType
          },
          success(res) {
            console.log(res)
            wx.hideLoading();
            var resData = JSON.parse(res.data);
            if (resData.status === "true") {
              if (resData.type === 'load') {
                that.setData({
                  picLoadSrc: "http://127.0.0.1/upload/" + that.data.taskId + "/" + resData.path,
                  picSrc: "http://127.0.0.1/upload/" + that.data.taskId + "/" + resData.path
                  // picLoadSrc: "http://47.101.139.189/DJZTest/" + that.data.taskId + "/" + resData.path,
                  // picSrc: "http://47.101.139.189/DJZTest/" + that.data.taskId + "/" + resData.path
                });
              } else {
                that.setData({
                  picUnloadSrc: "http://127.0.0.1/upload/" + that.data.taskId + "/" + resData.path,
                  picSrc: "http://127.0.0.1/upload/" + that.data.taskId + "/" + resData.path
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
        picDate: '2019-03-20',
      })
    }, 2000)
  },

  picResultModalClose({
    detail
  }) {
    var index = detail.index
    if (index == 0) {
      if (this.data.picType == "load") {
        this.setData({
          resultModalShow: false,
          loadPound: this.data.picPound,
          picLoadSrc: this.data.picSrc,
          loadDate: this.data.picDate
        });
      } else {
        this.setData({
          resultModalShow: false,
          unloadPound: this.data.picPound,
          picLoadSrc: this.data.picSrc,
          unloadDate: this.data.picDate
        });
      }
    } else {
      this.setData({
        resultModalShow: false,
      });
    }
  },

  bindDateChange: function(e) {
    this.setData({
      picDate: e.detail.value,
    })
  },

  picPoundChange(e) {
    this.setData({
      picPound: e.detail.value,
    })
  },

  picModalClose({
    detail
  }) {
    var index = detail.index
    if (index == 0) {
      this.updatePicturePoundAndDate(this.data.picType);
      this.setData({
        picModalShow: false,
      });
    } else {
      this.getPicturePoundAndDate(this.data.picType);
      this.setData({
        picModalShow: false,
      });
    }
  },

  updatePicturePoundAndDate(type) {
    if (type == "load") {
      this.setData({
        picModalShow: false,
        loadPound: this.data.picPound,
        picLoadSrc: this.data.picSrc,
        loadDate: this.data.picDate
      });
    } else {
      this.setData({
        picModalShow: false,
        unloadPound: this.data.picPound,
        picLoadSrc: this.data.picSrc,
        unloadDate: this.data.picDate
      });
    }
  },

  getPicturePoundAndDate(type) {
    if (type == "load") {
      this.setData({
        picModalShow: false,
        loadPound: "",
        picLoadSrc: '',
        loadDate: ''
      });
    } else {
      this.setData({
        picModalShow: false,
        unloadPound: "",
        picUnloadSrc: "",
        unloadDate: ""
      });
    }
  },

  showResultPictureModal() {
    this.setData({
      resultModalShow: true,
      picPound: "0",
      picDate: '2019-01-01',
    })
  },

  playVideo(e) {
    this.setData({
      showVideo: true,
      video_name: e.currentTarget.dataset.title,
      video_src: e.currentTarget.dataset.src
    });
  },

  videoPlayModalClose() {
    this.showVideoContext.stop();
    this.setData({
      showVideo: false,
      video_name: "",
      video_src: ""
    });
  },

  delVideo(e) {
    console.log(e.currentTarget.dataset.key)
  },

  videoLoadModalShow(e) {
    var type = e.currentTarget.dataset.type
    if (type == "load") {
      this.setData({
        uploadVideo: true,
        video_name: '装货视频上传',
        videoType: 'load'
      });
    } else {
      this.setData({
        uploadVideo: true,
        video_name: '卸货视频上传',
        videoType: 'unload'
      });
    }
  },


  chooseVideo() {
    var that = this;
    console.log(this.data.videoType);
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success(res) {
        console.log(that.showVideoContext)
        const tempFilePaths = res.tempFilePath
        wx.showLoading({
          title: '文件上传中',
        });
        wx.uploadFile({
          url: 'http://127.0.0.1/upload/xcxUploadFile.php',
          // url: 'http://47.101.139.189/DJZTest/xcxUploadFile.php',
          filePath: tempFilePaths,
          name: 'file',
          formData: {
            'taskId': that.data.taskId,
            'type': that.data.videoType
          },
          success(res) {
            wx.hideLoading();
            console.log(res)
          },
          fail(res) {
            wx.hideLoading();
            console.log(res)
          }
        })
        that.setData({
          newVideoSrc: res.tempFilePath
        });
      }
    })
  },

  videoUploadModalClose({
    detail
  }) {
    console.log(detail)
    var that = this
    if (detail.index == 0) {
      this.showVideoContext.stop();
      wx.showLoading({
        title: '文件上传中',
      });
      setTimeout(function() {
        wx.hideLoading()
      }, 2000);
    } else {
      this.showVideoContext.stop();
      this.setData({
        newVideoSrc: "",
        uploadVideo: false,
      });
    }
  },

  previewImage: function(e) {
    wx.previewImage({
      current: e.currentTarget.src, // 当前显示图片的http链接
      urls: [this.data.picSrc] // 需要预览的图片http链接列表
    })
  },

  taskReadyDone() {
    this.setData({
      userState: 3,
      accept: "none",
      accepted: "none",
      task_list: "block",
      current_block: "task_list"
    });
  },

  show(msg) {
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 2000
    })
  },


  //当用户的状态处于待接受任务的状态的时候
  getAcceptTaskInfo(userId) {
    var that = this;
    wx.request({
      url: util.userData.requestUrl,
      data: {
        action: 'GetAcceptInfo',
        userid: userId
      },
      method: "POST",
      head: {
        'content-type': 'application/json' // 默认值
      },
      success({data}) {
        console.log(data)
        if (data.status == 'true') {
          that.setData({
            wayBillId: data.wayBillId,
            wayBill: data.wayBill,
            accept: "block",
            accepted: "none",
            task_list: "none",
            current_block: "accept"
          });
        } else {
          that.setData({
            accept: "none",
            accepted: "none",
            task_list: "block",
            current_block: "task_list"
          });
          that.show("请重启以查看待接受任务")
        }
      },
      fail() {
        that.setData({
          accept: "none",
          accepted: "none",
          task_list: "none",
        });
        that.show("请检查网络信息")
      }
    });
  },


  //当用户的状态处于任务中的状态的时候
  getAcceptedTaskInfo(userId) {
    var that = this;
    wx.request({
      url: util.userData.requestUrl,
      data: {
        action: 'GetAcceptedInfo',
        body: {
          userid: userId
        },
        type: 'query'
      },
      method: "POST",
      head: {
        'content-type': 'application/json' // 默认值
      },
      success({data}) {
        console.log(data)
        if (data.status == 'true') {
          that.setData({
            wayBillAccept: data.wayBillAccept,
            oldLoadVideoFilePath: data.oldLoadVideoFilePath,
            oldUnloadVideoFilePath: data.oldUnloadVideoFilePath,
            picLoadSrc: data.picLoadSrc,
            picUnloadSrc: data.picUnloadSrc,
            loadPound: data.loadPound,
            loadDate: data.loadDate,
            unloadPound: data.unloadPound,
            unloadDate: data.unloadDate,
            accept: "none",
            accepted: "block",
            task_list: "none",
            current_block: "accepted"
          });
        } else {
          that.setData({
            accept: "none",
            accepted: "none",
            task_list: "block",
            current_block: "task_list"
          });
          that.show("请重启以查看待接受任务")
        }
      },
      fail() {
        that.setData({
          accept: 'none',
          accepted: "none",
          task_list: "none",
        });
        that.show("请检查网络信息")
      }
    });
  },

  getUserTaskList(startTime, endTime) {
    console.log(startTime)
    console.log(endTime)
    var that=this;
    wx.request({
      url: util.userData.requestUrl,
      data: {
        action: 'GetTaskList',
        body: {
          userid: util.userData.userID,
          start: startTime,
          end: endTime
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
        console.log(data)
        if (data.status == 'true') {
          that.setData({
            taskList:data.taskList,
          });
        } else {
          that.show("请重启以查看待接受任务")
        }
      },
      fail() {
        that.setData({
          accept: 'none',
          accepted: "none",
          task_list: "none",
        });
        that.show("请检查网络信息")
      }
    });
  }
})