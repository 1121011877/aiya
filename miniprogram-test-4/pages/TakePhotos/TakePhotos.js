// pages/TakePhotos/TakePhotos.js
var app = getApp();
Page({
  onReady() {

  },
  data: {
    list: [0, 0, 0, 0, 1, 0, 0, 0, 0],
    imagepath: '',
    hidden: true,
    hiddenC: false

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
      url: 'https://www.fourmbkf.xyz/photo/fileUpload?openid=' + app.globalData.openId,
      filePath: app.globalData.img,
      name: 'file',
      success(res) {
        console.log(app.globalData.openId);
      }
    }),
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000
      }),
    this.setData({
      hidden:true,
      hiddenC:false
    })
  },
  next: function () {
    wx.redirectTo({
      url: '../TakePhotos/TakePhotos'
    })
  },
  back: function () {
    wx.redirectTo({
      url: '../index/index'
    })
  }
})