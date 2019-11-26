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
    this.getopenid()
  },
  getopenid:function(){
    const code = app.globalData.code;
    console.log("getopenid: "+code);
    wx.request({
      url: app.globalData.localpath+'/Test_OpenId/getopenid',
      method: 'GET',
      // header:{
      //   'content-type': "application/x-www-form-urlencoded"
      // },
      data:{
        code
      },
      success:function(res){
        console.log(res);
        app.globalData.openid = res.data
        console.log("openid: " + app.globalData.openid);
      }
    })
  },
doctor:function(){
  const code = app.globalData.openid;
  //console.log("incode: " + code);
  var urlpage = null;
  //从服务器获取医生数据，判断医生是否已经注册
  wx.request({

    //url: 'http://47.100.248.211:7230/aiya/doctor/get',
    url: app.globalData.localpath+'/aiya/doctor/getDoctorByOpenid',
    data: {code},
    method: 'get',
    dataType: 'json',
    success: function (res) {
      console.log(res);
      if(res.data.data == null){
        urlpage = '../dzhuce/dzhuce';
      }else{
        urlpage = '../Dmy/Dmy';
        app.globalData.doctorId = res.data.data.dId;
      }
      wx.redirectTo({
        url: urlpage,
      })
    }
  })
},
  user: function () {
    this.getopenid
    const code = app.globalData.openid;
    console.log("incode: " + code);
    var urlpage = null;
    //从服务器获取病人数据，判断病人是否已经注册
    wx.request({
      //url: 'http://47.100.248.211:7230/aiya/user/get',
      url: app.globalData.localpath +'/aiya/user/get',
      data: {code},
      method: 'get',
      dataType: 'json',
      success: function (res) {
        console.log(res);
        if (res.data.data == null) {
          urlpage = '../uzhuce/uzhuce';
        } else {
          urlpage = '../Ucenter/Ucenter';
          app.globalData.userId = res.data.data.userId;
        }
        wx.redirectTo({
          url: urlpage,
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