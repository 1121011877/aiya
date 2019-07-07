const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {


    items: [
      {
        icon: '../../img/icon_job_publish.png',
        text: '发布任务',
        path: 'post'
      },
      {
        icon: '../../img/icon_job_continue.png',
        text: '已发布任务',
        path: 'continue'
      },
      {
        icon: '../../img/icon_job_complete.png',
        text: '完成情况',
        path: 'complete',
      },
    ],
  
    message: [{
      icon: '../../img/icon_message.png',
      text: '消息通知',
      path: 'message'
    }],


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


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
    wx.navigateTo({
      url: '../../pages/out/out',
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