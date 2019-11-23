// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ishidden:true,
    user:{},
    mark:false,
    isadd:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.user);
  },
  // 添加病人按钮
  addpeople: function(){
    // 弹出搜索部分
    this.setData({
      ishidden: !this.data.ishidden
    })
  },
  // 输入手机号搜索
  submit: function(e){
    var that = this;
    var phone_number = e.detail.value.phone;
    // phone_number=123;
    console.log("phone: "+phone_number);
    wx.request({
      url: 'http://47.100.248.211:7230/aiya/user',
      method: 'get',
      data: {phone_number},
      header:{
        'content-type': 'application/json'
      },
      success: function(res){
        console.log(res);
        if(res.data!=""){
          that.setData({
            user: res.data,
            mark: true
          })
        }else{
          that.setData({
            mark: false
          })
        }
        console.log(that.data.user);
      }
    })
  },
  // 点击病人信息添加病人
  adduser: function(){
    this.setData({
      isadd:true
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