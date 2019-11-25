// pages/TakePhotos/TakePhotos.js
var app = getApp();
Page({
  onReady() {

  },
  data: {
    list: [0, 0, 0, 0, 1, 0, 0, 0, 0],
    imagepath: '',
    hidden: true,
    hiddenC: false,
    // jobid
    jobid:null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      jobid: options.jobid
    })
  },
  takePhoto() {
    this.setData({
      hidden: false,
    })
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        app.globalData.img = res.tempImagePath;
        this.setData({
          src: app.globalData.img,
        })
      }
    })
  },
  error(e) {
    console.log(e.detail)
  },


  start: function () {
    var that = this;
    console.log()
    for (var i = 0; i < 10; i++) {
      this.takePhoto();
    }
    this.setData({
      hiddenC: true
    })
  },

  up: function () {
    var date = Date();
    var that=this;
    wx.uploadFile({
      //url: 'https://www.fourmbkf.xyz/photo/fileUpload?openid=' + app.globalData.code,
     // url: 'http://47.100.248.211:7230/photo/fileUpload',
      url: app.globalData.localpath +'/photo/fileUpload',
      filePath: app.globalData.img,
      name: 'file',
      formData: {
        // x: JSON.stringify(e.detail.value)
        jobid: that.data.jobid,
        openid: app.globalData.code,
        pid: 1,
        type: 1,
      },
      // data:{
      //   jobid:that.data.jobid,
      //   openid: app.globalData.code,
      //   pid:1,
      //   type:1,
      // },
      success(res) {
        console.log(res);
      }
    }),
      wx.navigateBack({
        url: "../Mytest/Mytest"
      }),
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000,
      }),
      
    this.setData({
      hidden:true,
      hiddenC:false
    })
  },
  next: function () {
    var that = this;
    wx.redirectTo({
      url: '../TakePhotos/TakePhotos?jobid='+that.data.jobid
    })
  },
  back: function () {
    wx.redirectTo({
      url: '../index/index'
    })
  }
})