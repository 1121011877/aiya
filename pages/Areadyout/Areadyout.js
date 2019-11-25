// pages/Areadyout/Areadyout.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 从Dmy传过来的did
    doctorId:null,
    // 获取到的job列表
    arrJob:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取从Dmy传过来的dId
    this.setData({
      doctorId: options.docId
    })
    console.log("out:doctorId: " + this.data.doctorId);
    var dId = this.data.doctorId;
    var that = this;
    // 发起请求获取did对应的job
    wx.request({
      url: app.globalData.localpath +'/aiya/job/get',
      method:'post',
      data:{
        dId
      },
      header:{
        'content-type': 'application/json'
      },
      success: function(res){
        console.log(res);
        that.setData({
          arrJob:res.data.data
        })
        console.log("arrJob: "+that.data.arrJob[0]);
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  jump: function (e) {
    var item = {
      "jobId": e.currentTarget.id, 
      "jobTitle": e.currentTarget.dataset.title, 
      "jodDescribe": e.currentTarget.dataset.describe, 
      "jobType": e.currentTarget.dataset.type,
      "createTime": e.currentTarget.dataset.createTime
    };
    var itemstr = JSON.stringify(item);
    console.log("item: ",itemstr);
    wx.navigateTo({
      url: '../../pages/detail/detail?jobDetail=' + itemstr
    })
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

  }
})