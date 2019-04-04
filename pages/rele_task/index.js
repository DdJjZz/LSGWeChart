// pages/rele_task/index.js

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
    foot_size:'60px',
    foot_height:"50px",
    height_size:"60px",
    current: 'document',
    padding_bottom:'100px',
    userid:'UID0000002',
    userType:'2',
    licenseArray: [],
    licenseIndex:0,
    licensePlate:"",

    startDate: util.formatTime(new Date()).split(" ")[0],

    goodsArray: [],
    goodsIndex: 0,
    goods: "",

    region: ['贵州省', '贵阳市', '南明区'],
    start:[], //上传时使用的省市区的列表
    end: [], //上传时使用的省市区的列表
    startAddress:'',
    startDetail:'',
    endAddress:'',
    endDetail: '',

    loadAccountArray: [],
    loadAccountIndex: 0,
    loadAccount: "",
    
    unloadAccountArray: [],
    unloadAccountIndex: 0,
    unloadAccount: "",

    pound:0,
    price:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getFreePlateList(util.userData.userID)
    this.getAllGoodsType(util.userData.userID)
    this.getAllAccountList(util.userData.userID)
    console.log(util.formatTime(new Date()))
    console.log(util.userData.userID)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
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
          foot_height: winHeight * 0.09 + 'px',
          height_size: winHeight * 0.08+24+'px',
          padding_bottom:winHeight*0.14+'px'
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
  handleChange({ detail }) {
    var key = detail.key
    console.log(detail)
    switch (key) {
      case "document":
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
        wx.showToast({
          title: "管理员界面开发中",
          icon: 'none',
          duration: 2000
        });
        break;
      default:
        break;
    }
    this.setData({
      current: detail.key
    });
  },

  bindPickerLicense(e){
    var value=e.detail.value;
    this.setData({
      licensePlate:this.data.licenseArray[value]
    });
  },

  bindDateChange(e){
    var value=e.detail.value
    this.setData({
      startDate:value
    });
  },

  bindGoods(e){
    var value = e.detail.value;
    this.setData({
      goods: this.data.goodsArray[value]
    });
  },

  bindRegionChange(e){
    var type=e.currentTarget.dataset.type
    var value=e.detail.value
    if(type=='start'){
      this.setData({
        start:value,
        startAddress: value[0] + " " + value[1] + " " + value[2]
      });
    }
    else{
      this.setData({
        end:value,
        endAddress: value[0] + " " + value[1] + " " + value[2]
      });
    }
  },

  bindLoadAccount(e){
    var value=e.detail.value;
    this.setData({
      loadAccount: this.data.loadAccountArray[value]
    });
  },

  bindUnloadAccount(e){
    var value = e.detail.value;
    this.setData({
      unloadAccount: this.data.loadAccountArray[value]
    })
  },

  inputPoundChange(e){
    var value=e.detail.detail.value;
    this.setData({
      pound:value
    });
  },

  inputPriceChange(e) {
    var value = e.detail.detail.value;
    this.setData({
      price: value
    });
  },


  showToast(message,icon){
    wx.showToast({
      title: message,
      icon:icon,
      duration:2000
    })
  },

  inputStartAddressChange(e){
    var value=e.detail.detail.value;
    this.setData({
      startDetail:value
    })
  },

  inputEndAddressChange(e) {
    var value = e.detail.detail.value;
    this.setData({
      endDetail: value
    })
  },

  getFreePlateList(uid){
    var that=this;
    wx.request({
      url: util.userData.requestUrl,
      data: {
        action: 'GetFreePlateList',
        body: {
          uid: uid,
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
            licenseArray:data.list
          })

        } else {
          that.show("部分信息获取失败，请检查状态");
        }
      },
      fail() {
        that.show("网络请求失败")
      }
    })
  },

  getAllGoodsType(uid){
    var that = this;
    wx.request({
      url: util.userData.requestUrl,
      data: {
        action: 'GetGoodsList',
        body: {
          uid: uid,
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
            goodsArray: data.list
          })

        } else {
          that.show("部分信息获取失败，请检查状态");
        }
      },
      fail() {
        that.show("网络请求失败")
      }
    })
  },

  getAllAccountList(uid) {
    var that = this;
    wx.request({
      url: util.userData.requestUrl,
      data: {
        action: 'GetAccountList',
        body: {
          uid: uid,
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
            loadAccountArray: data.list,
            unloadAccountArray: data.list,
          })

        } else {
          that.show("部分信息获取失败，请检查状态");
        }
      },
      fail() {
        that.show("网络请求失败")
      }
    })
  },

  releaseTask(e) {
    console.log(this.data)
    if (this.data.licensePlate == "") {
      this.showToast('请指定一辆车', 'none');
    }
    else if (this.data.goods == "") {
      this.showToast('请选择货品种类', 'none');
    }
    else if (this.data.startAddress == "") {
      this.showToast('请选择装货地点', 'none');
    }
    else if (this.data.endAddress == "") {
      this.showToast('请选择卸货地点', 'none');
    }
    else if (this.data.loadAccount == "") {
      this.showToast('请选择装货户头', 'none');
    }
    else if (this.data.unloadAccount == "") {
      this.showToast('请选择卸货户头', 'none');
    }
    else {
      var that = this;
      wx.request({
        url: util.userData.requestUrl,
        data: {
          action: 'ReleaseTask',
          body: {
            uid: util.userData.userID,
            plate: that.data.licensePlate,
            startDate: that.data.startDate,
            goods:that.data.goods,
            start:that.data.start,
            end:that.data.end,
            startDetail:that.data.startDetail,
            endDetail:that.data.endDetail,
            loadAccount:that.data.loadAccount,
            unloadAccount:that.data.unloadAccount,
            pound:that.data.pound,
            price:that.data.price
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
            that.showToast('发布成功', 'none');
            that.getFreePlateList(util.userData.userID)
            that.getAllGoodsType(util.userData.userID)
            that.getAllAccountList(util.userData.userID)
            that.setData({
              licensePlate: "",
              goods: "",
              startAddress: "",
              startDetail:"",
              start:[],
              endAddress: "",
              endDetail:"",
              end:[],
              loadAccount: "",
              unloadAccount: "",
              pound: 0,
              price: 0,
              startDate: util.formatTime(new Date()).split(" ")[0],
            });

          } else {
            that.show("部分信息获取失败，请检查状态");
          }
        },
        fail() {
          that.show("网络请求失败")
        }
      });
    }
  },

  refusePage(){
    wx.redirectTo({
      url: '../refuse/index',
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