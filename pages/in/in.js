// miniprogram/pages/in/in.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
doctor:function(){
  const nowcode = app.globalData.code;
  console.log("incode: " + nowcode);
  var urlpage = null;
  //从服务器获取医生数据，判断医生是否已经注册
  wx.request({
    url: 'http://47.100.248.211:7230/aiya/doctor/get',
    data: nowcode,
    method: 'get',
    dataType: 'json',
    success: function (res) {
      console.log(res);
      if(res.data.data == null){
        urlpage = '../dzhuce/dzhuce';
      }else{
        urlpage = '../Dmy/Dmy';
      }
      wx.redirectTo({
        url: urlpage,
      })
    }
  })
},
  user: function () {
    wx.redirectTo({
      url: '../uzhuce/uzhuce',
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