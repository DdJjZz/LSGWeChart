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
    current: 'homepage',
    padding_bottom:'100px',
    userid:'UID0000002',
    userType:'2',
    licenseArray: ["浙A123456", "浙A234567", "浙A345678", "浙A456789", "浙A567890", "浙A678901", "浙789012", "浙A890123", "浙A901234"],
    licenseIndex:0,
    licensePlate:"",

    startDate: util.formatTime(new Date()).split(" ")[0],

    goodsArray: ["磷石膏1", "磷石膏2", "磷石膏3", "磷石膏4", "磷石膏5", "磷石膏6", "磷石膏7", "磷石膏8", "磷石膏9"],
    goodsIndex: 0,
    goods: "",

    region: ['贵州省', '贵阳市', '南明区'],
    
    startAddress:'',
    endAddress:'',

    loadAccountArray: ["装货户头1", "装货户头2", "装货户头3", "装货户头4", "装货户头5", "装货户头6", "装货户头7", "装货户头8", "装货户头9"],
    loadAccountIndex: 0,
    loadAccount: "",
    
    unloadAccountArray: ["卸货户头1", "卸货户头2", "卸货户头3", "卸货户头4", "卸货户头5", "卸货户头6", "卸货户头7", "卸货户头8", "卸货户头9"],
    unloadAccountIndex: 0,
    unloadAccount: "",

    pound:0,
    price:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
          url: '../mine/index?userid='+this.data.userid+'&usertype='+this.data.userType,
        })
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
        startAddress: value[0] + " " + value[1] + " " + value[2]
      });
    }
    else{
      this.setData({
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

  releaseTask(e){
    console.log(this.data)
    if(this.data.licensePlate==""){
      this.showToast('请指定一辆车','none');
    }
    else if(this.data.goods==""){
      this.showToast('请选择货品种类', 'none');
    }
    else if (this.data.goods == "") {
      this.showToast('请选择装货地点', 'none');
    }
    else if (this.data.goods == "") {
      this.showToast('请选择卸货地点', 'none');
    }
    else if (this.data.goods == "") {
      this.showToast('请选择装货户头', 'none');
    }
    else if (this.data.goods == "") {
      this.showToast('请选择卸货户头', 'none');
    }
    else{
      this.showToast('发布成功', 'none');
      this.setData({
        licensePlate: "",
        goods: "",
        startAddress: "",
        endAddress: "",
        loadAccount: "",
        unloadAccount: "",
        pound: 0,
        price: 0,
        startDate: util.formatTime(new Date()).split(" ")[0],
      });
    }
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
})