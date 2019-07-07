const util = require("../../utils/util.js")
const app = getApp()
//录音管理
var voice = "";
const recorderManager = wx.getRecorderManager()
const innerAudioContext = wx.createInnerAudioContext()

var tempFilePath;


Page({

  /**
   * 页面的初始数据
   */
  data: {
    music: "music",
    img: "img",
    word: "word",
    picture: "picture",
    choose: " ",
    w:"w",

    //日期选择
    showModal: true,
    weekLength: 7,
    week: ["日", "一", "二", "三", "四", "五", "六"],
    dayList: [],
    weekNum: 0,
    tapThis: 0,
    thisMonth: 0,
    thisYear: 0,
    dayIndex: 0,
    chooseDate: "",

    //图片提交
    photos: "",

    flag: "false",
    account: "true",
  },

  //弹窗


  showPopup() {
    this.selectComponent("#popup").showPopup();
  },
  //取消事件
  _error() {
    this.selectComponent("#popup").hidePopup();
  },
  //确认事件
  _success() {
    this.selectComponent("#popup").hidePopup();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;

    var year = util.formatYear(new Date())
    var month = util.formatMonth(new Date())

    that.getWeek(year, month, that.getDayNum(year, month));



  },

  onShow: function () {
    var that = this
    that.setData({
      flag: "false",
      form_info: ""
    })

  },


  //切换任务类型
  job_type_choose: function (e) {
    var that = this
    if (e.detail.value == "music")
      that.setData({
        choose: "music"
      })
    if (e.detail.value == "img")
      that.setData({
        choose: "img"
      })
    if (e.detail.value == "word")
      that.setData({
        choose: "word"
      })

  },

  //表单提交

  formSubmit: function (e) {

    var that = this
    var formData = e.detail.value
    var title = formData.title
    var content = formData.content
    var openid = app.globalData.openid
    var type = formData.job_type
    var reward = formData.reward
    var date = that.data.chooseDate
    var numb = formData.numb



    if (!title || !content || !type || !reward || !date || !numb) {
      that.showPopup();
      return false
    }

    wx.request({
      url: app.globalData.URL + '/user/interface',
      data: {
        openid: app.globalData.openid
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        app.globalData.account = res.data.user_account_numb
        if (numb * reward >= res.data.user_account_numb) {
          that.setData({
            account: "flase",
            form_info: "",
            photos: "",
          })
          return false;
        } else {
          var account = (res.data.user_account_numb - numb * reward)
          wx.request({
            url: app.globalData.URL + '/user/update_account',
            data: {
              account: account,
              openid: app.globalData.openid
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            success: function (res) {



              //图片提交
              if (type == "img") {

                if (!that.data.photos[0]) {
                  that.showPopup();
                  return false
                }

                wx.uploadFile({
                  url: app.globalData.URL + '/job/example_image',
                  filePath: that.data.photos[0],
                  method: 'POST',
                  name: 'file',
                  formData: {
                    job_publisher_openid: openid,
                    job_title: title,
                    job_type: type,
                    job_content: content,
                    job_join_numb: numb,
                    job_reward: reward,
                    job_end: date,
                  },

                  success: function (res) {
                    that.setData({
                      form_info: "",
                      photos: "",
                    })
                  },
                  fail: function (res) {
                    wx.navigateTo({
                      url: '../../pages/error/error'
                    })
                  },
                })
              }

              //音频提交
              if (type == "music") {

                if (!that.tempFilePath) {
                  that.showPopup();
                  return false
                }


                wx.uploadFile({
                  url: app.globalData.URL + '/job/example_music', //演示域名、自行配置
                  filePath: that.tempFilePath,
                  name: 'file',
                  header: {
                    "Content-Type": "multipart/form-data"
                  },
                  method: 'POST',
                  formData: {
                    job_publisher_openid: openid,
                    job_title: title,
                    job_type: type,
                    job_content: content,
                    job_reward: reward,
                    job_end: date,
                    job_join_numb: numb,
                  },
                  success: function (res) {
                    that.setData({
                      form_info: ""
                    })
                  },
                  fail: function (res) {
                    wx.navigateTo({
                      url: '../../pages/error/error'
                    })
                  },
                  complete: function (res) {

                  }
                })
              }

              //文字提交
              if (type == "word") {
                var word = formData.word

                if (!word) {
                  that.showPopup();
                  return false
                }

                wx.request({
                  url: app.globalData.URL + "/job/example_word",
                  method: 'POST',
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  data: {
                    job_publisher_openid: openid,
                    job_title: title,
                    job_type: type,
                    job_content: content,
                    job_reward: reward,
                    job_end: date,
                    job_join_numb: numb,
                    job_example: word
                  },
                  success: function (res) {
                    that.setData({
                      form_info: ""
                    })

                  },
                  fail: function (res) {

                    wx.navigateTo({
                      url: '../../pages/error/error'
                    })
                  },
                })
              }




            },
            fail: function (res) {
              wx.navigateTo({
                url: '../../pages/error/error'
              })
            },
          })

        }
      },
      fail: function (res) {
        wx.navigateTo({
          url: '../../pages/error/error'
        })
      },
    })


  },


  //图片
  chooseImg: function () {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        that.setData({
          photos: tempFilePaths
        })
      },
      fail: function (res) {
        wx.navigateTo({
          url: '../../pages/error/error'
        })
      },
    })
  },

  //日期
  getWeek(year, month, day) {
    var that = this;
    var d = new Date();
    d.setFullYear(year);
    d.setMonth(month - 1);
    d.setDate(1);
    var n = d.getDay();
    var arr = [];
    var Index = 0;
    var dayN = 1;
    for (var i = 0; i < day; i++) {
      arr.push(dayN++);
    }
    var now = new Date();
    var nowYear = now.getFullYear();
    var nowMonth = now.getMonth() + 1;
    var nowDay = now.getDate();
    var val = 1;
    if (year == nowYear) {
      if (month == nowMonth) {
        Index = arr.indexOf(nowDay);
        val = nowDay;
      }
    }
    that.setData({
      weekNum: n,
      dayList: arr,
      dayIndex: Index,
      tapThis: Index,
      thisMonth: month,
      thisYear: year,
      chooseDate: year + "-" + month + "-" + val,
    })
  },
  chooseDate(e) {
    var that = this;
    var n = e.currentTarget.dataset.index;
    var val = e.currentTarget.dataset.value;
    console.log(n);
    if (n >= that.data.dayIndex) {
      that.setData({
        tapThis: n,
        chooseDate: that.data.thisYear + "-" + that.data.thisMonth + "-" + val,
        showModal: true,
      })
    }
  },
  /** 
   * 弹出框蒙层截断touchmove事件 
   */
  preventTouchMove: function () { },
  /** 
   * 隐藏模态对话框 
   */
  hideModal() {
    var that = this;
    that.setData({
      showModal: true,
    })
  },
  showModalBtn() {
    var that = this;
    that.setData({
      showModal: false
    })
  },
  getDayNum(year, month) { //传入参数年份 和 要计算的月份， 可以为字符串，也可以为数字。
    var that = this
    var d = new Date()
    d.setFullYear(year)
    d.setMonth(month)
    d.setDate(0)
    return d.getDate(0) //d.getDate() 即为此月的总天数！
  },

  //音频
  start: function () {
    const options = {
      duration: 10000, //指定录音的时长，单位 ms
      sampleRate: 16000, //采样率
      numberOfChannels: 1, //录音通道数
      encodeBitRate: 96000, //编码码率
      format: 'mp3', //音频格式，有效值 aac/mp3
      frameSize: 50, //指定帧大小，单位 KB
    }
    //开始录音
    recorderManager.start(options);
    recorderManager.onStart(() => {
      console.log('recorder start')
    });
    //错误回调
    recorderManager.onError((res) => {
      console.log(res);
    })
  },
  //暂停录音
  pause: function () {
    recorderManager.onPause();
    console.log('暂停录音')
  },
  //停止录音
  stop: function () {
    recorderManager.stop();
    recorderManager.onStop((res) => {
      this.tempFilePath = res.tempFilePath;
      console.log('停止录音', res.tempFilePath)
      const {
        tempFilePath
      } = res
    })
  },
  //播放声音
  play: function () {
    innerAudioContext.autoplay = true
    innerAudioContext.src = this.tempFilePath,
      innerAudioContext.onPlay(() => {
        console.log('开始播放')
      })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })

  },
  //上传录音

})