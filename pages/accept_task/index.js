// pages/accept_task/index.js
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
    height_size: "60px",
    current: 'document',
    contract: false,
    contract_resp:false,
    loadVideo: false,
    unloadVideo: false,
    showVideo: false,
    picType: "1",
    picShow: false,
    actions: [{
        name: '确定',
        color: '#19be6b'
      },
      {
        name: '取消'
      }
    ],

    actions_resp:[
      {
        name: '关闭',
        color: '#19be6b'
      }
    ],

    actionsVideoUpload: [{
        name: '上传',
        color: '#19be6b'
      },
      {
        name: '取消'
      }
    ],

    actionsVideo: [{
      name: '关闭'
    }],

    actionsPicture: [{

    }],


    oldLoadVideoFilePath: [{
        key: "1",
        name: "装货视频1.mp4",
        src: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"
      },
      {
        key: "2",
        name: "装货视频2.mp4",
        src: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"
      }
    ],
    oldUnloadVideoFilePath: [{
        key: "3",
        name: "卸货视频1.mp4",
        src: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"
      },
      {
        key: "4",
        name: "卸货视频2.mp4",
        src: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"
      }
    ],

    company: "XXXXXXXXX公司",
    driver: "李四",
    newVideoSrc: "",

    picLoadPound: "15",
    picLoadDate: '2019-03-19',
    picUnloadPound: "15",
    picUnloadDate: '2019-03-19',
    picPound: "0",
    picDate: '2019-01-01',
    picSrc: "",
    // picLoad:"http://127.0.0.1/pic/9.jpg",
    picLoad: "",
    picUnload: "http://127.0.0.1/pic/12.jpg",
    taskId: '123456'
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
    this.loadVideoContext = wx.createVideoContext('loadVideo');
    this.showVideoContext = wx.createVideoContext('showVideo');
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
          height_size: winHeight * 0.08 + 24 + 'px'
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
  showModal() {
    this.setData({
      contract: true
    });
  },

  showModalResp() {
    this.setData({
      contract_resp: true
    });
  },

  handleClose1() {
    this.setData({
      contract: false,
    });
  },

  handleCloseResp() {
    this.setData({
      contract_resp: false,
    });
  },

  handleChange({detail}) {
    this.setData({
      current: detail.key
    });
  },
  videoLoadModalShow() {
    this.setData({
      loadVideo: true
    });
  },

  videoUploadModalShow() {
    this.setData({
      unloadVideo: true
    });
  },

  videoLoadModalClose({
    detail
  }) {
    this.setData({
      newVideoSrc: "",
      loadVideo: false
    });
    const index = detail.index;
    if (index === 0) {
      console.log("文件上传")
    } else {
      console.log("取消")
    }
  },

  videoUnloadModalClose({
    detail
  }) {
    this.setData({
      newVideoSrc: "",
      unloadVideo: false
    });
    const index = detail.index;
    if (index === 0) {
      console.log("文件上传")
    } else {
      console.log("取消")
    }
  },


  chooseVideo() {
    var that = this;
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success(res) {
        that.setData({
          newVideoSrc: res.tempFilePath
        });
      }
    })
  },

  videoErrorCallback: function() {
    var that = this;
    this.setData({
      loadVideo: false,
      showVideo: false,
      video_name: "",
      video_src: ""
    });
    wx.showModal({
      content: '视频信息获取失败',
      showCancel: false,
      success: function(res) {
        if (res.confirm) {
          console.log("关闭")
        }
      }
    });
  },

  delVideo(e) {
    console.log(e.currentTarget.dataset.key)
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

  showPictureModal(e) {
    var type = e.currentTarget.dataset.type;
    if (type === "load") {
      this.setData({
        picSrc: this.data.picLoad,
        picShow: true,
        picType: type
      });
    } else {
      this.setData({
        picSrc: this.data.picUnload,
        picShow: true,
        picType: type
      });
    }
  },

  picModalClose({detail}) {
    const index = detail.index;
    if (index === 0) {
      console.log(this.data.picType)
    } else {
      console.log("取消")
    }
    this.setData({
      picShow: false,
    });
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
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'taskId': that.data.taskId,
            'type': that.data.picType
          },
          success(res) {
            wx.hideLoading();
            var resData = JSON.parse(res.data);
            console.log(resData);
            if (resData.status === "true") {
              if (resData.type === 'load') {
                that.setData({
                  picLoad: "http://127.0.0.1/upload/" + that.data.taskId + "/" + resData.path,
                  picSrc: "http://127.0.0.1/upload/" + that.data.taskId + "/" + resData.path
                });
              } else {
                that.setData({
                  picUnload: "http://127.0.0.1/upload/" + that.data.taskId + "/" + resData.path,
                  picSrc: "http://127.0.0.1/upload/" + that.data.taskId + "/" + resData.path
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
          }
        })
      }
    })
  },

  poundPictureRecDistinguish(filePath, type) {
    var that=this
    wx.showLoading({
      title: '信息识别中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)

    // this.setData({
    //   picPound: "15",
    //   picDate: '2019-03-20',
    // })

    setTimeout(function () {
      that.setData({
        recoResult: true,
        picPound: "15",
        picDate: '2019-03-20',
      })
    }, 2000)
  },

  picResultModalClose({ detail }){
    const index = detail.index;
    if (index === 0) {
      console.log(this.data.picType)
    } else {
      console.log("取消")
    }
    this.setData({
      recoResult: false,
    });
  },

  bindDateChange: function (e) {
    if(this.data.picType==='load'){
      this.setData({
        picDate: e.detail.value,
        picLoadDate:e.detail.value
      })
    }
    else{
      this.setData({
        picDate: e.detail.value,
        picUnloadDate: e.detail.value
      })
    }
  },
  
})