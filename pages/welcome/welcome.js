var app=getApp();
Page({
  onReady() {

  },
  data:{
    list: [0,0,0,0,1,0,0,0,0],
    imagepath:'',
    hidden: true,
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
      hidden:false
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


  start: function() {
    var that = this;
    console.log()
    for (var i = 0; i < 10; i++) {
    this.takePhoto();
    }  
  },

  up:function(){
    var date=Date();
    wx.uploadFile({
      url: 'https://www.fourmbkf.xyz/photo/fileUpload?openid=' + app.globalData.openId,
      filePath: app.globalData.img,
      name: 'file',
      success(res){
        console.log(app.globalData.openId);

      }
    })
  },
  next: function () {
    var that = this;
    wx.redirectTo({
      url: '../TakePhotos/TakePhotos?jobid='+that.data.jobid,
    })
  }
})