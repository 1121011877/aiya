const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {


    items: [
      /*{
        icon: '../../img/icon_job_publish.png',
        text: '我的任务',
        path: 'post'
      },*/
      {
        icon: '../../img/icon_job_continue.png',
        text: '我的任务',
        path: 'continue'
      },
      /*{
        icon: '../../img/icon_job_complete.png',
        text: '完成情况',
        path: 'complete',
      },*/
    ],
  
    message: [{
      icon: '../../img/icon_message.png',
      text: '消息通知',
      path: 'message'
    }],
    // userid
    userId:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) { }
          })
        }
      }
    }),
    console.log("");
    const code = app.globalData.code;
    console.log("incode: " + code);
    var that = this;
    //从服务器获取病人数据，获取病人的id
    wx.request({
      url: app.globalData.localpath +'/aiya/user/get',
      data: {code},
      method: 'get',
      dataType: 'json',
      success: function (res) {
        console.log(res);
        that.setData({
          // 先这么写，后面会修改id的名称
          userId:res.data.data.userId
          //userId: 2
        })
      }
    })

  },
  onShow: function () {
    var that = this
    wx.request({
      url: app.globalData.URL + "/user/interface",
      method: 'POST',
      header: {
        'content-type': "application/x-www-form-urlencoded"
      },
      data: {
        openid: app.globalData.openid,
      },
      success: function (res) {
        that.setData({
          user_job_publish_numb: res.data.user_job_publish_numb,
          user_job_receive_numb: res.data.user_job_receive_numb,
          user_job_complete_numb: res.data.user_job_complete_numb,
          avatarUrl: res.data.user_avatarUrl,
          nickName: res.data.user_name,
          user_account_numb: res.data.user_account_numb,
          user_message_numb: res.data.user_message_numb,
        })
      },
      /*fail: function(res) {
        wx.navigateTo({
          url: '../../pages/error/error'
        })
      },*/
    })
  },


  jump: function (e) {
    var type = e.currentTarget.dataset.text
    var urldata = '../../pages/out/out'
    console.log(type)
    if(type=="post"){
      var urldata ='../../pages/out/out'
    }
    else if(type=="continue"){
      var urldata ='../../pages/Mytest/Mytest?userid='+this.data.userId
    }
    else if(type=="complete"){
      var urldata = '../../pages/Complete/Complete'
    }
    wx.navigateTo({
      url: urldata,
    })
  },

  jump1: function (e) {
    wx.navigateTo({
      url: '../../pages/message/message',
    })
  },

  jump2: function (e) {
    wx.navigateTo({
      url: '../../pages/account/account',
    })
  },

})