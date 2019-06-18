// pages/company/index.js
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
    region: ['贵州省', '贵阳市', '南明区'],
    address: "", 
    startDate:'',
    companyID:'',
    files:[],
    companyName:'',
    companyCode:'',
    addressDetail:'',
    corporateRepresentative:'',
    companyDelete:'true',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if(options['company']){
      this.setData({
        companyID:options['company']
      })
    }
    else{
      wx.redirectTo({
        url: '../choice/index',
      })
    }
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
    var that=this;
    wx.showLoading({
      title: '信息更新中',
    });
    if(this.data.companyDelete=='true'){
      wx.request({
        url: util.userData.requestUrl,
        data: {
          action: 'CompanyDelete',
          body: {
            companyID: that.data.companyID,
          },
          type: 'query',
        },
        method: "POST",
        head: {
          'content-type': 'application/json' // 默认值
        },
        success({ data }) {
          wx.hideLoading();
        }
      })
    }
    else{
      console.log('页面未存在')
    }
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


  bindDateChange(e) {
    var value = e.detail.value
    this.setData({
      startDate: value
    });
  },

  companyRegister(){
    wx.redirectTo({
      url: '../entry/index',
    })
  },

  bindRegionChange(e) {
    var value = e.detail.value
    this.setData({
      region:value,
      address: value[0] + value[1] + value[2]
    });
  },
  inputCompanyName(e){
    var value = e.detail.detail.value;
    this.setData({
      companyName: value
    })
  },

  inputCompanyCode(e) {
    var value = e.detail.detail.value;
    this.setData({
      companyCode: value
    })
  },

  inputStartAddressChange(e) {
    var value = e.detail.detail.value;
    this.setData({
      addressDetail: value
    })
  },

  inputCorporateRepresentative(e){
    var value = e.detail.detail.value;
    this.setData({
      corporateRepresentative: value
    })
  },

  chooseImage: function (e) {
    var that = this;
    var data = {
      action: 'comPicture',
      company: this.data.companyID,
      length: this.data.files.length+1,
    }
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths=res.tempFilePaths
        wx.showLoading({
          title: '文件上传中',
        });
        wx.uploadFile({
          url: util.userData.uploadFile,
          filePath: tempFilePaths[0],
          name: 'file',
          formData: data,
          success(res) {
            wx.hideLoading();
            var resData = JSON.parse(res.data);
            if (resData.status === "true") {
              var filePath = util.userData.filePath + "/COMPANY/" + that.data.companyID + "/" + resData.path
              var filesArray=that.data.files;
              filesArray.push(filePath)
              that.setData({
                files: filesArray
              });
              
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

  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },

  show(msg) {
    wx.showToast({
      title: msg,
      icon: 'none',
      duration: 2000
    })
  },

  companyRegister(){
    var that=this;
    if(this.data.companyName==""){
      this.show('请输入公司名称');
      return;
    }
    if (this.data.companyCode == "") {
      this.show('请输入公司注册号');
      return;
    }
    if (this.data.startDate == "") {
      this.show('请选择注册时间');
      return;
    }
    if (this.data.address == "") {
      this.show('请选择公司地址');
      return;
    }
    if (this.data.addressDetail == "") {
      this.show('请输入公司详细地址');
      return;
    }
    if (this.data.corporateRepresentative == "") {
      this.show('请输入公司法人姓名');
      return;
    }
    console.log(this.data.companyName);
    console.log(this.data.companyCode);
    console.log(this.data.startDate);
    console.log(this.data.address);
    console.log(this.data.addressDetail);
    console.log(this.data.corporateRepresentative);
    console.log(this.data.companyID);
    var that = this;
    wx.showLoading({
      title: '信息上传中',
    })
    wx.request({
      url: util.userData.requestUrl,
      data: {
        action: 'CompanyInfoSub',
        body: {
          companyID: that.data.companyID,
          companyName: that.data.companyName,
          companyCode: that.data.companyCode,
          startDate: that.data.startDate,
          address: that.data.address + that.data.addressDetail,
          corporate: that.data.corporateRepresentative,
          imageFile: that.data.files,
        },
        type: 'query',
      },
      method: "POST",
      head: {
        'content-type': 'application/json' // 默认值
      },
      success({data}) {
        wx.hideLoading();
        console.log(data)
        if (data.state == 'true') {
          that.setData({
            companyDelete:'false'
          })
          wx.redirectTo({
            url: '../entry/index',
          })
        } else {
          that.show("信息上传失败！")
        }
      },
      fail() {
        that.show("请检查网络信息")
      }
    })
  }
})