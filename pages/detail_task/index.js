// pages/detail_task/index.js
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
    height_size: "60px",
    current: 'document',
    contract_resp: false,
    showVideo: false,
    picShow: false,


    wayBillId: "",
    wayBillAccept: [],

    actions_resp: [{
      name: '关闭',
      color: '#19be6b'
    }],


    actionsVideo: [{name: '关闭'}],

    oldLoadVideoFilePath: [],
    oldUnloadVideoFilePath: [],

    company: "XXXXXXXXX公司",
    driver: "李四",
    newVideoSrc: "",

    picLoadPound: "",
    picLoadDate: '',
    picUnloadPound: "",
    picUnloadDate: '',
    picLoad:"",
    picUnload: "",
    text_1: "",
    type: "",
    text_2: "",
    price: "",
    text_3: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.taskid);
    var that=this;
    this.setData({
      wayBillId: options.taskid
    });
    wx.request({
      url: util.userData.requestUrl,
      data: {
        action: 'GetTaskDetail',
        body: {
          taskid: options.taskid
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
            wayBillId: data.wayBillId,
            wayBillAccept: data.wayBillAccept,
            oldLoadVideoFilePath: data.oldLoadVideoFilePath,
            oldUnloadVideoFilePath: data.oldUnloadVideoFilePath,
            picLoad: data.picLoadSrc,
            picUnload: data.picUnloadSrc,
            picLoadPound: data.loadPound,
            picLoadDate: data.loadDate,
            picUnloadPound: data.unloadPound,
            picUnloadDate: data.unloadDate,
            company: data.company,
            driver: data.driver,
          });
        } else {
          that.show(data.msg)
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
    switch (detail.key) {
      case "document":
        wx.navigateBack({
          delta: 1
        });
        break;
      case "prompt_1":
        this.show("页面开发中")
        break;
      case "prompt_2":
        this.show("页面开发中")
        break;
      case "mine":
        wx.redirectTo({
          url: '../mine/index',
        })
        break;
      default:
        break;
    }
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
      if (this.data.picLoad === "") {
        wx.showToast({
          title: '图片加载出错',
          icon: 'none',
          duration: 2000
        })
      } else {
        this.setData({
          picSrc: this.data.picLoad,
          picShow: true,
          picType: type
        });
      }
    } else {
      if (this.data.picUnload === "") {
        wx.showToast({
          title: '图片加载出错',
          icon: 'none',
          duration: 2000
        })
      } else {
        this.setData({
          picSrc: this.data.picUnload,
          picShow: true,
          picType: type
        });
      }
    }
  },

  picModalClose({
    detail
  }) {
    this.setData({
      picShow: false,
    });
  },

  picLoadError(e) {
    wx.showToast({
      title: '图片加载出错',
      icon: 'none',
      duration: 2000
    })
  },

  callBackToList() {
    wx.navigateBack({
      delta: 1
    })
  },

  showContractModalResp() {
    this.setData({
      contract_resp: !this.data.contract_resp
    });
    var that=this;
    wx.request({
      url: util.userData.requestUrl,
      data: {
        action: 'GetContractInfo',
        body: {
          taskid: that.data.wayBillId
        },
        type: 'query'
      },
      method: "POST",
      head: {
        'content-type': 'application/json' // 默认值
      },
      success({data}){
        console.log(data)
        that.setData({
          text_1: data.text_1,
          type: data.type,
          text_2: data.text_2,
          price: data.price,
          text_3: data.text_3
        });
      },
      fail(){
        that.show("网络请求错误")
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