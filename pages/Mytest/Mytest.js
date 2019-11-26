// pages/Mytest/Mytest.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ready:false,
    // userid
    //userid:null,
    // userjob列表
    userjob:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //   userid:options.userid
    // })
    //console.log("userid: "+this.data.userid);
    //var code = this.data.userid;
    var code = app.globalData.userId;
    var that = this;
    wx.request({
      url: app.globalData.localpath+'/aiya/user/getUserJobList',
      method: 'get',
      header: {
        'content-type': 'application/json'
      },
      data:{
        code
      },
      success: function(res){
        console.log(res);
        that.setData({
          userjob:res.data.data
        })
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
  jump:function(e){
    var jobid = e.currentTarget.id;
    wx.navigateTo({
      url: '../../pages/welcome/welcome?jobid='+jobid
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